// pages/api/health/dialogflow.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function health(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ ok: true, time: new Date().toISOString() });
}
