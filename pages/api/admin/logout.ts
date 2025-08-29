 import type { NextApiRequest, NextApiResponse } from 'next'
+ import { ADMIN_COOKIE } from '../../../lib/authCookie'
 export default function handler(req: NextApiRequest, res: NextApiResponse) {
-  res.setHeader('Set-Cookie', ['admin_auth=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'])
+  res.setHeader('Set-Cookie', [`${ADMIN_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`])
   res.status(200).json({ ok: true })
 }
