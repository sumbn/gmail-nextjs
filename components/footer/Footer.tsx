import * as React from 'react';
import { footerLinks } from '../../constants';
import Link from 'next/link';

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <div className='flex justify-betwee'>
      {footerLinks.map((link) => (
        <div key={link.title}>
          <h3>{link.title}</h3>
          {link.links.map((item) => (
            <Link key={item.title} href={item.url} className='text-gray-500'>
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
