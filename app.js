import qrterminal from "qrcode-terminal";
import pkg from 'whatsapp-web.js';
import express from 'express';

const app = express();
const port = 3000;

const { Client, LocalAuth } = pkg;
const client = new Client({
    authStrategy: new LocalAuth(),
});
var response = null;

client.on("qr", async (qr) => {
    if (qr) {
        qrterminal.generate(qr, { small: true });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Salam Dünya!' });
});

client.on('ready', async () => {
    console.log('Müştəri hazırdır!');
});

// Add route for /favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

app.get('/:number', async (req, res) => {
    const { number } = req.params;
    console.log(number);
    client.isRegisteredUser(`994${number}@c.us`)
        .then((req) => {
            response = req;
            res.json({ message: response });
        })
        .catch(err => console.log(err));
});

app.listen(port, () => {
    console.log(`Nümunə tətbiq http://localhost:${port} portunda dinləyir`);
});

client.initialize();
