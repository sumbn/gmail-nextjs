'use client';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  return (
    <SessionProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {children}
      </SnackbarProvider>
    </SessionProvider>
  );
}
