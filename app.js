import qrterminal from "qrcode-terminal";
import pkg from 'whatsapp-web.js';
import puppeteer from 'puppeteer';
import express from 'express';

const app = express();
const port = 3000;

const { Client, LocalAuth } = pkg;
const client = new Client({
    authStrategy: new LocalAuth(),
});

// QR kodunu alma ve hazır olduğunda bildirim alma işlemleri için event'leri tanımlayın
// QR kodunun alınması ve küçük olarak görüntülenmesi
client.on("qr", async (qr) => {
    if (qr) {
        qrterminal.generate(qr, { small: true });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Salam Dünya!' }); // Kök URL'ye yapılan isteğe Salam Dünya! mesajıyla yanıt verir
});

client.on('ready', async () => {
    console.log('Müştəri hazırdır!'); // Müşteri hazır olduğunda konsola bir mesaj yazdırır
    app.get('/:number', async (req, res) => {
        const { number } = req.params;
        const isRegisteredUser = await client.isRegisteredUser(`994${number}@c.us`); // Girilen numaranın kayıtlı olup olmadığını kontrol eder
        res.json({ message: isRegisteredUser }); // Sonuç olarak kayıtlı olup olmadığını yanıt olarak döner
    });
});

app.listen(port, () => {
    console.log(`Nümunə tətbiq localhost:${port} portunda dinləyir`); // Uygulama belirtilen portta dinlemeye başladığında bir mesaj yazdırır
});

// WhatsApp Web bağlantısını başlatır
client.initialize();
