// pages/api/sitemap.xml.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

function getBaseUrl(req: NextApiRequest) {
  const env = process.env.NEXT_PUBLIC_BASE_URL;
  if (env) return env.replace(/\/$/, '');
  const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
  const host =
    (req.headers['x-forwarded-host'] as string) ||
    (req.headers.host as string) ||
    'localhost:3000';
  return `${proto}://${host}`;
}

function generateSitemap(base: string, products: Array<{ id: string; created_at: string }>) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  xml += `
    <url>
      <loc>${base}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.00</priority>
    </url>`;
  for (const p of products || []) {
    xml += `
      <url>
        <loc>${base}/producto/${p.id}</loc>
        <lastmod>${new Date(p.created_at).toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>`;
  }
  xml += `</urlset>`;
  return xml;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const BASE_URL = getBaseUrl(req);
    const { data: products, error } = await supabase
      .from('productos')
      .select('id, created_at')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const sitemap = generateSitemap(BASE_URL, (products as any[]) || []);
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
