import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './Providers'
import GlobalLoading from '../components/GlobalLoading'
import { LoadingProvider } from '../context/loadingContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gmail account',
  description: 'Coded by ns',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <LoadingProvider>
            <GlobalLoading />
            {children}
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  )
}
