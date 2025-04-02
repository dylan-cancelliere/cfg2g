require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const process = require("process");
const { google } = require("googleapis");
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1329520448282689698";
const GENERAL_CHANNEL_ID = "1241149456989028374";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const app = express();
const port = process.env.PORT || 8007;
const corsOptions = {
    origin: ["https://sjprit.com", "http://localhost:8007"],
    optionsSuccessStatus: 200,
};

const SHEETS_CACHE_STALE_TIME = 1_800_000; // 30 mins

const COLUMN_DEF = ["status", "name", "severity", "reason", "sources", "notes", "tags"];

const PRIVACY_AND_SECURITY_MESSAGE =
    "This is an automated reminder to avoid discussing sensitive " +
    "information (such as personal info, time and place of non-public events, or discussion about " +
    "planning or strategy) in public channels as they may be monitored by RIT Public Safety. To " +
    "access private channels, join the conversation, and get involved, keep an eye on #announcements " +
    "to attend an in-person meeting!";

let lastSheetsFetch = Date.now();

let sheetData;

let tags = new Set();

function parsePaginationParams(query) {
    const { limit: queryLimit, offset: queryOffset } = query;
    if (!!queryLimit && !isNaN(queryLimit) && !!queryOffset && !isNaN(queryOffset)) {
        const limit = parseInt(queryLimit);
        const offset = parseInt(queryOffset);
        if (limit < 0 || limit > 10 || offset < 0) return false;
        return { limit, offset };
    }
    return false;
}

async function refreshSheetsData() {
    console.log("Refetching sheet data...");
    const spreadsheetId = process.env.VITE_SHEET_ID;
    const range = "Career Fair Fall 2024!A2:G";
    const sheets = google.sheets({ version: "v4", auth: process.env.VITE_API_KEY });
    await sheets.spreadsheets
        .get({ ranges: range, spreadsheetId, includeGridData: true })
        .then((data) => {
            sheetData = data.data.sheets[0].data[0].rowData;
            tags = new Set();
            sheetData.forEach((row) => row.values[6].formattedValue.split(", ").forEach((tag) => tags.add(tag)));
            lastSheetsFetch = Date.now();
            console.log("Successfully fetched sheet data!");
        })
        .catch((e) => {
            console.error("Error fetching sheet data:", e);
        });
}

async function fetchSheetsData() {
    if (!sheetData || Date.now() - lastSheetsFetch > SHEETS_CACHE_STALE_TIME) {
        await refreshSheetsData();
    }
    return sheetData;
}

app.use(cors());
app.use(express.json());

app.get("/", cors(corsOptions), (req, res) => {
    res.send({ status: "ok" });
});

app.get("/data", cors(corsOptions), async (req, res) => {
    const queryParams = parsePaginationParams(req.query);
    if (!queryParams) {
        res.status(400).send({ message: "Bad request" });
        return;
    }
    await fetchSheetsData()
        .then((data) => {
            const { offset, limit, filters, filterModes, sorting, globalFilter } = req.query;

            const parsedFilterModes = JSON.parse(filterModes ?? "{}");

            let returnData = [...data];

            const parsedColumnFilters = JSON.parse(filters ?? "{}");
            if (parsedColumnFilters?.length) {
                parsedColumnFilters.map((filter) => {
                    const { id: columnId, value: filterValue } = filter;
                    const filterMode = parsedFilterModes?.[COLUMN_DEF.indexOf(columnId)] ?? "contains";

                    if (columnId?.toLowerCase() == "severity") {
                        returnData = returnData.filter(({ values }) => {
                            const rowValue = values[COLUMN_DEF.indexOf(columnId)].formattedValue?.toLowerCase();
                            return filterValue.map((f) => f.toLowerCase()).includes(rowValue);
                        });
                    } else if (columnId?.toLowerCase() == "tags") {
                        returnData = returnData.filter(({ values }) => {
                            const rowValue = values[COLUMN_DEF.indexOf(columnId)].formattedValue?.toLowerCase();
                            return filterValue.map((f) => f.toLowerCase()).some((f) => rowValue.includes(f));
                        });
                    } else {
                        returnData = returnData.filter(({ values }) => {
                            const rowValue = values[COLUMN_DEF.indexOf(columnId)].formattedValue?.toLowerCase();
                            if (filterMode === "contains") {
                                return rowValue?.includes?.(filterValue.toLowerCase());
                            } else if (filterMode === "startsWith") {
                                return rowValue?.startsWith?.(filterValue.toLowerCase());
                            } else if (filterMode === "endsWith") {
                                return rowValue?.endsWith?.(filterValue.toLowerCase());
                            }
                        });
                    }
                });
            }

            if (globalFilter)
                returnData = returnData.filter(({ values }) =>
                    Object.keys(values).some((_, idx) =>
                        values[idx]?.formattedValue?.toLowerCase()?.includes?.(globalFilter.toLowerCase()),
                    ),
                );

            const parsedSorting = JSON.parse(sorting ?? "{}");
            if (parsedSorting?.length) {
                const sort = parsedSorting[0];
                const { id, desc } = sort;
                returnData.sort(({ values: a }, { values: b }) => {
                    const left = a[COLUMN_DEF.indexOf(id)].formattedValue?.toLowerCase();
                    const right = b[COLUMN_DEF.indexOf(id)].formattedValue?.toLowerCase();
                    if (id == "severity") return sortSeverity(left, right) < 0 ? (desc ? 1 : -1) : desc ? -1 : 1;
                    else return left < right ? (desc ? 1 : -1) : desc ? -1 : 1;
                });
            }

            res.status(200).json({
                data: returnData?.slice(parseInt(offset), parseInt(offset) + parseInt(limit)) ?? [],
                meta: { totalRowCount: returnData.length },
            });
        })
        .catch((e) => {
            console.error(e);
            return res.status(500).send({ message: "Internal service error" });
        });
});

app.get("/tags", cors(corsOptions), async (req, res) => {
    await fetchSheetsData();
    res.status(200).json({ tags: Array.from(tags) });
});

app.post("/contact", cors(corsOptions), (req, res) => {
    const embed = new EmbedBuilder()
        .setTitle("New Submission")
        .addFields({ name: "From", value: req.body.from }, { name: "Message", value: req.body.message })
        .setTimestamp()
        .setThumbnail("https://sjprit.com/logo.png")
        .setColor(0x225923);

    const channel = client.channels.cache.get(CHANNEL_ID);
    try {
        channel.send({ embeds: [embed] });
    } catch (e) {
        console.error("ERROR", e, "CHANNEL INFO", channel);
        return res.status(503).send(e);
    }
    res.sendStatus(201);
});

let counter = 0;

client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag} is online`);

    // cron job to send a message once a day at least
    cron.schedule("00 17 * * *", () => {
        // This runs every day at 5:00:00pm
        const channel = client.channels.cache.get(GENERAL_CHANNEL_ID);
        // if there has been more than 10 messages since last we sent one, send it
        // restart the counter as well
        if (counter >= 10) {
            channel.send(PRIVACY_AND_SECURITY_MESSAGE);
            counter = 0;
        }
    });
});

client.on("messageCreate", () => {
    counter++;
});

!!process.env.VITE_DISCORD_BOT_TOKEN && client.login(process.env.VITE_DISCORD_BOT_TOKEN);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

function sortSeverity(a, b) {
    function rankSeverity(severity) {
        switch (severity.toLowerCase()) {
            case "no significant involvement":
                return 0;
            case "minimal involvement":
                return 1;
            case "moderate":
                return 2;
            case "severe":
                return 3;
        }
    }
    return rankSeverity(a) - rankSeverity(b);
}
