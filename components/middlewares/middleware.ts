import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const protectedPaths = ['/dashboard', '/admin', '/settings'];
  const currentPath = request.nextUrl.pathname;

  if (protectedPaths.some(path => currentPath.startWith(path)) && !token) {
    const loginUrl = new URL('/login', request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/settings/:path*'],
};
