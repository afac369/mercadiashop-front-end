// pages/api/dialogflow-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Cuerpo del webhook de Dialogflow
  const body = req.body as any;
  const text = body?.queryResult?.queryText ?? 'Hola';

  return res.status(200).json({
    fulfillmentText: `Recibí: ${text}`,
  });
}

// (opcional) límite del body
export const config = {
  api: {
    bodyParser: { sizeLimit: '1mb' },
  },
};
