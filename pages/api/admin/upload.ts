// pages/api/admin/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import { requireAdmin } from '../../../lib/requireAdmin';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export const config = {
  api: { bodyParser: false }, // requerido para formidable
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;

function getFirstFile(files: Record<string, any>): any | null {
  const values = Object.values(files || {});
  if (!values.length) return null;
  const v = values[0] as any;
  return Array.isArray(v) ? (v[0] ?? null) : v ?? null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!requireAdmin(req, res)) return; // bloquea si no es admin

  const form = formidable({
    multiples: false,
    maxFiles: 1,
    maxFileSize: MAX_SIZE, // validación temprana
    filter: (part: { mimetype?: string | null }) =>
      part.mimetype ? (ALLOWED as readonly string[]).includes(part.mimetype) : false,
  });

  try {
    const { files } = await new Promise<{ fields: Record<string, any>; files: Record<string, any> }>((resolve, reject) => {
  form.parse(
    req,
    (err: unknown, fields: Record<string, any>, files: Record<string, any>) => {
      if (err) return reject(err);
      return resolve({ fields, files });
    }
  );
});


    const f = getFirstFile(files);
    if (!f) return res.status(400).json({ ok: false, message: 'No se recibió archivo' });

    if (typeof f.size === 'number' && f.size > MAX_SIZE) {
      return res.status(413).json({ ok: false, message: 'Archivo demasiado grande' });
    }
    if (f.mimetype && !(ALLOWED as readonly string[]).includes(f.mimetype)) {
      return res.status(400).json({ ok: false, message: 'Tipo de archivo no permitido' });
    }

    // Lee el archivo a buffer
    const buf = await fs.readFile(f.filepath);

    // Determina extensión
    const extByMime: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/avif': 'avif',
    };
    const extFromMime = f.mimetype ? extByMime[f.mimetype] : undefined;
    const extFromName = String(f.originalFilename || '').split('.').pop()?.toLowerCase();
    const ext = extFromMime || extFromName || 'jpg';

    const path = `products/${randomUUID()}.${ext}`;

    // Sube a Supabase Storage (bucket público configurado previamente)
    const { error: upErr } = await supabaseAdmin.storage
      .from('product-images')
      .upload(path, buf, { contentType: f.mimetype || 'application/octet-stream', upsert: false });
    if (upErr) return res.status(500).json({ ok: false, message: 'Error al subir la imagen', detail: upErr.message });

    const { data: pub } = supabaseAdmin.storage.from('product-images').getPublicUrl(path);
    return res.status(200).json({ ok: true, path, url: pub.publicUrl });
  } catch (e: any) {
    console.error('upload error', e);
    return res.status(400).json({ ok: false, message: 'Error procesando el archivo', detail: e?.message });
  }
}
