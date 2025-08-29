-import { supabase } from '../../lib/supabaseClient';
+import { supabase } from '../../lib/supabaseClient';
 import type { NextApiRequest, NextApiResponse } from 'next';
-
-const BASE_URL = 'https://mercadiashop-6vkpj5jb3-mercadiashops-projects.vercel.app';
+function getBaseUrl(req: NextApiRequest) {
+  const env = process.env.NEXT_PUBLIC_BASE_URL;
+  if (env) return env.replace(/\/$/, '');
+  const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
+  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host || 'localhost:3000';
+  return `${proto}://${host}`;
+}
 
-const generateSitemap = (products: any[]) => {
+const generateSitemap = (base: string, products: any[]) => {
   let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
   xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
   xml += `
     <url>
-      <loc>${BASE_URL}</loc>
+      <loc>${base}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <priority>1.00</priority>
     </url>`;
   for (const p of products) {
     xml += `
       <url>
-        <loc>${BASE_URL}/producto/${p.id}</loc>
+        <loc>${base}/producto/${p.id}</loc>
         <lastmod>${new Date(p.created_at).toISOString()}</lastmod>
         <priority>0.80</priority>
       </url>`;
   }
   xml += `</urlset>`;
   return xml;
 }
 
 export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
+    const BASE_URL = getBaseUrl(req);
     const { data: products, error } = await supabase
       .from('productos')
       .select('id, created_at')
       .eq('is_active', true)
       .order('created_at', { ascending: false });
     if (error) throw error;
-    const sitemap = generateSitemap(products || []);
+    const sitemap = generateSitemap(BASE_URL, products || []);
     res.setHeader('Content-Type', 'application/xml');
     res.status(200).send(sitemap);
   } catch (error) {
     console.error(error);
     res.status(500).end();
   }
 }
