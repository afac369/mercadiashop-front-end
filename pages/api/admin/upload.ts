// pages/api/admin/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export const config = { api: { bodyParser: false } }

// Tipado mínimo local (evita @types/formidable)
type UploadFile = {
  filepath: string
  originalFilename?: string | null
  mimetype?: string | null
  size?: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  // Import dinámico para serverless
  const formidable = (await import('formidable')).default

  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 })
  const { files } = await new Promise<{ files: Record<string, unknown> }>((resolve, reject) => {
    form.parse(req, (err, _fields, files) => (err ? reject(err) : resolve({ files })))
  })

  const f = files.file as UploadFile | UploadFile[] | undefined
  if (!f || Array.isArray(f)) return res.status(400).json({ ok: false, message: 'Archivo faltante. Usa campo "file".' })

  const buf = await fs.readFile(f.filepath)
  const ext = String(f.originalFilename || 'image.jpg').split('.').pop()?.toLowerCase() || 'jpg'
  const path = `products/${randomUUID()}.${ext}`

  const { error: upErr } = await supabaseAdmin.storage
    .from('product-images')
    .upload(path, buf, { contentType: f.mimetype || 'application/octet-stream', upsert: false })

  if (upErr) return res.status(500).json({ ok: false, message: upErr.message })

  const { data: pub } = supabaseAdmin.storage.from('product-images').getPublicUrl(path)
  return res.status(200).json({ ok: true, path, url: pub.publicUrl })
}
