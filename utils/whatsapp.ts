// utils/whatsapp.ts
import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import axios from 'axios';

let qrCode: string | null = null;
let isClientReady = false;
export const lastMessages: Record<string, Message[]> = {};

export const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: false },
});

client.on('qr', (qr: string) => {
  qrCode = qr;
});

client.on('ready', () => {
  console.log('✅ WhatsApp is ready');
  isClientReady = true;
});

client.on('message', async (message: Message) => {
  console.log('📩 New message from', message.from, message.body);

  // Guardar en memoria local
  if (!lastMessages[message.from]) lastMessages[message.from] = [];
  lastMessages[message.from].unshift(message);
  if (lastMessages[message.from].length > 20) lastMessages[message.from].pop();

  // Enviar a webhook de n8n
/*
  try {
    await axios.post('https://gudecapital.app.n8n.cloud/webhook-test/81cdc6dc-afa3-43da-9a75-65b908dccca5', {
      from: message.from,
      body: message.body,
      timestamp: message.timestamp,
      id: message.id.id,
    });
  } catch (err) {
    console.error('❌ Webhook failed', err);
  }
  */
});

client.initialize();

export const getQR = () => qrCode;
export const getIsReady = () => isClientReady;
export const getChats = () => client.getChats();
export const getLastMessages = () => lastMessages;
