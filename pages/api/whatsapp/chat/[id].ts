// pages/api/whatsapp/chat/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getIsReady } from '../../../../utils/whatsapp';
import { client } from '../../../../utils/whatsapp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chatId = req.query.id as string;

  if (!getIsReady()) {
    return res.status(503).json({ error: 'Client not ready' });
  }

  try {
    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: 50 });

    const parsed = messages.map(msg => ({
      id: msg.id.id,
      from: msg.from,
      to: msg.to,
      body: msg.body,
      timestamp: msg.timestamp,
      type: msg.type,
    }));

    res.status(200).json({ chatId, messages: parsed });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load chat messages', details: (error as Error).message });
  }
}
