
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'
import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')
  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 })
  const { files } = await new Promise<{ files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, _fields, files) => { if (err) reject(err); else resolve({ files }) })
  })
  const f = files.file as File | File[] | undefined
  if (!f || Array.isArray(f)) return res.status(400).json({ ok: false, message: 'Archivo faltante. Usa campo "file".' })
  const buf = await fs.readFile(f.filepath)
  const ext = String(f.originalFilename || 'image.jpg').split('.').pop()?.toLowerCase() || 'jpg'
  const path = `products/${randomUUID()}.${ext}`
  const { error: upErr } = await supabaseAdmin.storage.from('product-images').upload(path, buf, { contentType: f.mimetype || 'application/octet-stream', upsert: false })
  if (upErr) return res.status(500).json({ ok: false, message: upErr.message })
  const { data: pub } = supabaseAdmin.storage.from('product-images').getPublicUrl(path)
  return res.status(200).json({ ok: true, path, url: pub.publicUrl })
}
