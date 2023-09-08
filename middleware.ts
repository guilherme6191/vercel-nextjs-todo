import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { csp } from './lib/csp';
import { securityHeaders } from './lib/security-headers';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const response = NextResponse.next();

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  response.headers.set('Content-Security-Policy', csp);

  if (req.nextUrl.pathname.startsWith('/app') && !token) {
    console.log('AUTH REDIRECT:', process.env.NEXTAUTH_URL);
    return NextResponse.redirect(process.env.NEXTAUTH_URL!);
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
