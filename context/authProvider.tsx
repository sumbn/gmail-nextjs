'use client';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
