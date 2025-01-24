require("dotenv").config();

const express = require("express");
const cors = require("cors");
const process = require("process");
const { google } = require("googleapis");
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1329520448282689698";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const app = express();
const port = process.env.PORT || 8007;
const corsOptions = {
    origin: ["https://sjprit.com", "http://localhost:8007"],
    optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());

app.get("/", cors(corsOptions), (req, res) => {
    res.send({ status: "ok" });
});

app.get("/data", cors(corsOptions), async (req, res) => {
    const spreadsheetId = process.env.VITE_SHEET_ID;
    const range = "Career Fair Fall 2024!A2:C";
    const sheets = google.sheets({ version: "v4", auth: process.env.VITE_API_KEY });
    await sheets.spreadsheets
        .get({ ranges: range, spreadsheetId, includeGridData: true })
        .then((data) => {
            res.send({ data });
        })
        .catch((e) => {
            console.warn("ERROR WITH SHEETS", e);
        });
});

app.post("/contact", cors(corsOptions), (req, res) => {
    const embed = new EmbedBuilder()
        .setTitle("New Submission")
        .addFields({ name: "From", value: req.body.from }, { name: "Message", value: req.body.message })
        .setTimestamp()
        .setThumbnail("https://sjprit.com/logo.png")
        .setColor(0x225923);

    const channel = client.channels.cache.get(CHANNEL_ID);
    channel.send({ embeds: [embed] });
    res.sendStatus(201);
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag} is online`);
});

!!process.env.VITE_DISCORD_BOT_TOKEN && client.login(process.env.VITE_DISCORD_BOT_TOKEN);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
