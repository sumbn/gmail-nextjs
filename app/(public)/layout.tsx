import * as React from 'react';
import PublicLayout from './publicLayout';

export default function LayoutPublic({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PublicLayout>{children}</PublicLayout>
    </div>
  );
}
