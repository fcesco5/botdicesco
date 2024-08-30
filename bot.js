import { WAConnection, MessageType } from '@adiwajshing/baileys';
import ytdl from 'ytdl-core';
import ytsr from 'ytsr';

const conn = new WAConnection();

conn.on('connecting', () => {
    console.log('Connessione in corso...');
});

conn.on('open', () => {
    console.log('Connesso!');
});

await conn.connect();

console.log('Bot avviato...');

// Funzione per gestire i messaggi
conn.on('chat-update', async (chatUpdate) => {
    if (!chatUpdate.hasNewMessage) return;
    const message = chatUpdate.messages.all()[0];
    const sender = message.key.remoteJid;

    if (message.message.conversation.startsWith('!antilink')) {
        // Attiva l'antilink
        conn.sendMessage(sender, '🔒 Funzione antilink attivata!', MessageType.text);
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
