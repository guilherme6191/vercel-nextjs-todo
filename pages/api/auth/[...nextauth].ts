import { authConfig } from '@/lib/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authConfig);
export default handler;
