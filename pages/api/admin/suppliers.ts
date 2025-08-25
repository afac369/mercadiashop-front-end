import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

// GET /api/admin/suppliers -> devuelve todos los proveedores
// POST /api/admin/suppliers -> crea un nuevo proveedor

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseAdmin.from('suppliers').select('*').order('created_at');
      if (error) throw error;
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { name, contact_email, website } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    try {
      const { data, error } = await supabaseAdmin
        .from('suppliers')
        .insert([{ name, contact_email, website }])
        .select()
        .single(); // .single() para que devuelva el objeto creado, no un array

      if (error) throw error;
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
