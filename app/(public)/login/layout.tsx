'use client';
import * as React from 'react';
import { useAuthenticated } from '../../../hooks';

export default function LayoutPublic({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, status } = useAuthenticated();
  if (status === 'loading') return <></>;

  if (session) return null;

  return (
    <div>
      <>{children}</>
    </div>
  );
}
