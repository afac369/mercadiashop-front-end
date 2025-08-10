
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/admin/login')) return NextResponse.next()
  const auth = req.cookies.get('admin_auth')?.value === '1'
  if (!auth) {
    if (pathname.startsWith('/api/')) return new NextResponse('Unauthorized', { status: 401 })
    const url = req.nextUrl.clone(); url.pathname = '/admin/login'; url.search = ''; return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
