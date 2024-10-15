import Link from 'next/link'
import * as React from 'react'

export interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  return (
    <header className='w-full'>
      <nav>
        <Link href={''}>Login</Link>
        <Link href={''}>Logout</Link>
      </nav>
    </header>
  )
}
