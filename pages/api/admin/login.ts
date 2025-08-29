// pages/api/admin/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { ADMIN_COOKIE, sign } from '../../../lib/authCookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { email, password } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email y contraseña son requeridos.' });
  }

  // Login con Supabase (lado servidor)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });

  // Sólo admins (user_metadata.is_admin === true)
  if (data.user?.user_metadata?.is_admin !== true) {
    await supabase.auth.signOut();
    return res.status(403).json({ ok: false, message: 'Acceso denegado.' });
  }

  const maxAge = 60 * 60 * 8; // 8 horas
  const token = sign(
    { uid: data.user.id, role: 'admin', exp: Math.floor(Date.now() / 1000) + maxAge },
    process.env.ADMIN_COOKIE_SECRET!
  );

  res.setHeader('Set-Cookie', [
    `${ADMIN_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`
  ]);

  return res.status(200).json({ ok: true, message: 'Inicio de sesión exitoso.' });
}
