'use client';
import * as React from 'react';
import useAuth from '../../hooks/useAuth';

export interface IProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: IProtectedLayoutProps) {
  const { session, status } = useAuth();

  if (status === 'loading') return <></>;
  if (!session) {
    return null;
  }
  return <div>{children}</div>;
}
