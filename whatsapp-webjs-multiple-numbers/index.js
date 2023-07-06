const express = require("express")
const app = express()
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

let clients = []

function createClient(client_id, data_path) {
    let client = new Client({ authStrategy: new LocalAuth({
         client_id: client_id,
         dataPath:`./${data_path}`
         }) });
    clients.push(client)
    console.log("getting session")
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', message => {
        message.reply('pinging');
    });
    client.initialize();
}
app.get("/:client_id", async (req, res, next) => {
    await createClient("c1","c1_path")
    await createClient("c2","c2_path")
    res.send("done")
})

app.listen(5000, () => console.log("server running at 5000"))