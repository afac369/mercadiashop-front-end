
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; if (!id || typeof id !== 'string') return res.status(400).json({ ok:false, message: 'Missing id' })
  if (req.method === 'PUT') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const updates:any = {}; for (const k of ['name','description','image_url','category']) if (k in body) updates[k] = body[k]
    if ('price' in body) updates.price = Number(body.price); if ('stock' in body) updates.stock = Number(body.stock); if ('is_active' in body) updates.is_active = Boolean(body.is_active)
    const { data, error } = await supabaseAdmin.from('productos').update(updates).eq('id', id).select('*').single()
    if (error) return res.status(500).json({ ok:false, message: error.message })
    return res.status(200).json({ ok:true, data })
  }
  if (req.method === 'DELETE') {
    const { error } = await supabaseAdmin.from('productos').delete().eq('id', id)
    if (error) return res.status(500).json({ ok:false, message: error.message })
    return res.status(200).json({ ok:true })
  }
  return res.status(405).end('Method Not Allowed')
}
