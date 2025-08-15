export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const pass = req.headers['x-admin-pass'];
  if (pass !== process.env.ADMIN_PASS) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ...tu lógica del webhook
  return res.status(200).json({ fulfillmentText: 'Hola desde el webhook' });
}
