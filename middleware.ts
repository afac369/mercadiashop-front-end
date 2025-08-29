 import { NextResponse } from 'next/server'
 import type { NextRequest } from 'next/server'
+ import { ADMIN_COOKIE, verify } from './lib/authCookie'
 export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
 export function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl
   if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/admin/login')) return NextResponse.next()
-  const auth = req.cookies.get('admin_auth')?.value === '1'
-  if (!auth) {
+  const token = req.cookies.get(ADMIN_COOKIE)?.value
+  const secret = process.env.ADMIN_COOKIE_SECRET
+  const payload = secret ? verify(token, secret) : null
+  if (!payload || payload.role !== 'admin') {
     if (pathname.startsWith('/api/')) return new NextResponse('Unauthorized', { status: 401 })
     const url = req.nextUrl.clone(); url.pathname = '/admin/login'; url.search = ''; return NextResponse.redirect(url)
   }
   return NextResponse.next()
 }
