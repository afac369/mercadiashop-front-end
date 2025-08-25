import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://mercadiashop-6vkpj5jb3-mercadiashops-projects.vercel.app';

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Página de inicio
  xml += `
    <url>
      <loc>${BASE_URL}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.00</priority>
    </url>
  `;

  // A futuro, aquí se añadirían las páginas de producto

  xml += `</urlset>`;
  return xml;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sitemap = generateSitemap();
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
}
