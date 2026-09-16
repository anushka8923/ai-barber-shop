import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes except /admin/Auth
  if (pathname.startsWith('/admin') && pathname !== '/admin/Auth') {
    const adminToken = request.cookies.get('adminToken')?.value;
    if (!adminToken) {
      const loginUrl = new URL('/admin/Auth', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
