import { WAConnection, MessageType } from '@adiwajshing/baileys';
import ytdl from 'ytdl-core';
import ytsr from 'ytsr';

const conn = new WAConnection();
const botName = 'BotDiCesco';
const ownerName = 'Cesco';
const ownerNumber = 'wa.me/393293262584';

conn.on('connecting', () => {
    console.log(`${botName} sta connettendosi...`);
});

conn.on('open', () => {
    console.log(`${botName} è connesso!`);
});

await conn.connect();

console.log(`${botName} avviato...`);

conn.on('chat-update', async (chatUpdate) => {
    if (!chatUpdate.hasNewMessage) return;
    const message = chatUpdate.messages.all()[0];
    const sender = message.key.remoteJid;

    if (message.message.audio) {
        const audioResponse = {
            audio: { url: 'link_dell_audio' }, // Sostituisci con il link dell'audio
            caption: `BotDiCesco`
        };
        conn.sendMessage(sender, audioResponse, MessageType.audio);
    }

    if (message.message.conversation.startsWith('!settings')) {
        const settingsMessage = `Owner: ${ownerName}\nNumero: ${ownerNumber}`;
        conn.sendMessage(sender, settingsMessage, MessageType.text);
    }

    if (message.message.conversation.startsWith('!antilink')) {
        conn.sendMessage(sender, `🔒 Funzione antilink attivata da ${ownerName}!`, MessageType.text);
    }

    if (message.message.conversation.startsWith('!play')) {
        const query = message.message.conversation.split(' ')[1];
        const searchResults = await ytsr(query, { limit: 1 });
        const videoUrl = searchResults.items[0].link;

        conn.sendMessage(sender, '🔊 Caricamento audio...', MessageType.text);
        const stream = ytdl(videoUrl, { filter: 'audioonly' });
        conn.sendMessage(sender, { url: stream }, MessageType.audio);
    }
});
