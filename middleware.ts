import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { csp } from './lib/csp';
// import { securityHeaders } from './lib/security-headers';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname.startsWith('/app') && !token) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL!);
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: '/:path*',
};
