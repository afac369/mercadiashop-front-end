import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://mercadiashop-6vkpj5jb3-mercadiashops-projects.vercel.app';

const generateSitemap = (products: any[]) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static pages
  xml += `
    <url>
      <loc>${BASE_URL}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.00</priority>
    </url>
  `;

  // Dynamic product pages
  products.forEach(product => {
    xml += `
      <url>
        <loc>${BASE_URL}/producto/${product.id}</loc> 
        <lastmod>${new Date(product.created_at).toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data: products, error } = await supabase
      .from('productos')
      .select('id, created_at'); // Only need ID and creation date for sitemap

    if (error) {
      console.error('Error fetching products for sitemap:', error);
      throw error;
    }
    
    const sitemap = generateSitemap(products || []);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}