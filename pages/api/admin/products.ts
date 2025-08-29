 import type { NextApiRequest, NextApiResponse } from 'next'
 import { supabaseAdmin } from '../../../lib/supabaseAdmin'
 import type { Product } from '../../../lib/types'
+ import { requireAdmin } from '../../../lib/requireAdmin'

 export default async function handler(req: NextApiRequest, res: NextApiResponse) {
+  if (!requireAdmin(req, res)) return
   if (req.method === 'GET') {
     ...
   }
   if (req.method === 'POST') {
     ...
   }
   return res.status(405).end('Method Not Allowed')
 }

