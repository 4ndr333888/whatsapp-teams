// pages/api/whatsapp/chats.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChats, getIsReady } from '../../../utils/whatsapp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!getIsReady()) {
    res.status(503).json({ error: 'WhatsApp client not ready' });
    return;
  }

  try {
    const chats = await getChats();
    const result = chats.map(chat => ({
      id: chat.id._serialized,
      name: chat.name || chat.id.user || chat.id._serialized,
      isGroup: chat.isGroup,
    }));

    res.status(200).json({ chats: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chats', details: (error as Error).message });
  }
}
