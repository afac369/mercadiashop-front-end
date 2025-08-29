// pages/api/admin/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../lib/requireAdmin'; // este usa verify() de authCookie.ts (Node)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdmin(req, res)) return;
  // ...
}
