
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { email, password } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email y contraseña son requeridos.' })
  }

  // Iniciar sesión en Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    return res.status(401).json({ ok: false, message: 'Credenciales incorrectas.' })
  }

  // Verificar si el usuario es administrador
  if (data.user?.user_metadata?.is_admin !== true) {
    // Si no es admin, cerramos la sesión por seguridad y denegamos el acceso.
    await supabase.auth.signOut()
    return res.status(403).json({ ok: false, message: 'Acceso denegado.' })
  }

  // Si es admin, establecer la cookie de sesión
  const maxAge = 60 * 60 * 8 // 8 horas
  res.setHeader('Set-Cookie', [`admin_auth=1; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`])
  
  return res.status(200).json({ ok: true, message: 'Inicio de sesión exitoso.' })
}
