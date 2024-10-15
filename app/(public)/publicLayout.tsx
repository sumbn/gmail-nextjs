import * as React from 'react';

export interface IPublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: IPublicLayoutProps) {
  return (
    <div className='min-h-screen justify-center items-center'>{children}</div>
  );
}
