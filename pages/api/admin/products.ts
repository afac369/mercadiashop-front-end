
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import type { Product } from '../../../lib/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const q = String(req.query.q || '').trim()
    const category = String(req.query.category || '').trim()
    const p = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1)
    const per = Math.min(Math.max(parseInt(String(req.query.perPage || '9'), 10) || 9, 1), 50)
    let query = supabaseAdmin.from('productos').select('*', { count: 'exact' }).order('created_at', { ascending: false })
    if (q) query = query.ilike('name', `%${q}%`)
    if (category) query = query.eq('category', category)
    const from = (p - 1) * per, to = from + per - 1
    const { data, error, count } = await query.range(from, to)
    if (error) return res.status(500).json({ ok:false, message: error.message })
    return res.status(200).json({ ok:true, data: data || [], total: count || 0, page: p, perPage: per })
  }
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const payload = { name: String(body.name||''), description: body.description??null, price: Number(body.price||0), image_url: body.image_url??null, category: body.category??null, stock: Number(body.stock||0), is_active: Boolean(body.is_active??true) }
    const { data, error } = await supabaseAdmin.from('productos').insert(payload).select('*').single()
    if (error) return res.status(500).json({ ok:false, message: error.message })
    return res.status(201).json({ ok:true, data })
  }
  return res.status(405).end('Method Not Allowed')
}
