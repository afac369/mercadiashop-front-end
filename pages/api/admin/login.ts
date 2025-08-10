
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')
  const pass = process.env.ADMIN_PASS; if (!pass) return res.status(500).end('ADMIN_PASS not set')
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  if ((body?.password) !== pass) return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' })
  const maxAge = 60 * 60 * 24
  res.setHeader('Set-Cookie', [`admin_auth=1; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`])
  return res.status(200).json({ ok: true })
}
