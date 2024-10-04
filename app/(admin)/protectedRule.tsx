'use client'
import { ReactNode } from 'react'
import Header from '../../components/header/Header'
import useAuth from '../../hooks/useAuth'

const ProtectedRule = ({ children }: { children: ReactNode }) => {
  const { session, status } = useAuth()

  if (status === 'loading') {
    return <div></div>
  }

  if (!session) {
    return null
  }

  return (
    <div className='bg bg-gray-100 items-center justify-center'>
      <Header />
      {children}
    </div>
  )
}

export default ProtectedRule
