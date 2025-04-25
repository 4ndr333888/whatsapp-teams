import type { NextApiRequest, NextApiResponse } from 'next';
import { getQR, getIsReady } from '../../../utils/whatsapp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (getIsReady()) {
    res.status(200).json({ status: 'authenticated' });
  } else {
    const qr = getQR();
    if (qr) {
      res.status(200).json({ qr });
    } else {
      res.status(202).json({ status: 'waiting_for_qr' });
    }
  }
}
