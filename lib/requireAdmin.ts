// lib/requireAdmin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ADMIN_COOKIE, verify } from './authCookie';

export function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  if (!secret) {
    res.status(500).json({ ok: false, message: 'Missing ADMIN_COOKIE_SECRET' });
    return null;
  }
  const token = req.cookies[ADMIN_COOKIE];
  const payload = verify(token, secret);
  if (!payload || payload.role !== 'admin') {
    res.status(401).json({ ok: false, message: 'Unauthorized' });
    return null;
  }
  return payload; // { uid, role, exp }
}
