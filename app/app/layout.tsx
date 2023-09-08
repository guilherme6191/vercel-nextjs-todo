import { type ReactNode } from 'react';

import AuthProvider from './auth-provider';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
