const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

async function getAllData(auth) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const sheet_id = JSON.parse(content).installed.sheet_id;
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheet_id,
        range: "Career Fair Fall 2024!A2:C",
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log("No data found.");
        return;
    }
    return rows;
}

const app = express();
const port = process.env.PORT || 8007;
const corsOptions = {
    origin: "https://sjprit.com",
    optionsSuccessStatus: 200,
};

app.use(cors);

app.get("/data", cors(corsOptions), (req, res) => {
    authorize()
        .then(getAllData)
        .then((v) => res.send(v))
        .catch(console.error);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
