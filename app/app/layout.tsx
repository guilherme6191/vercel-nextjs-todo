import { type ReactNode } from 'react';

import AuthProvider from './auth-provider';
// import { LogoutButton } from '@/components/logout-button';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {/* <LogoutButton /> */}
      {children}
    </AuthProvider>
  );
}
