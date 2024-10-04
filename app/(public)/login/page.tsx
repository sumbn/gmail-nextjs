import { useEffect } from 'react'
import ProtectedRule from '../../(admin)/protectedRule'
import Login from './login'
import { useAccountList } from '../../../hooks/use-account-list'

const LoginPage = () => {
  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       //call api client
  //     } catch (error) {}
  //   })()
  // }, [])

  //use swr call api
  // const { data: accountlist, isLoading } = useAccountList({
  //   params: { _page: 1 },
  // })
  // console.log({ accountlist, isLoading })

  return <Login />
}

// LoginPage.Layout = ProtectedRule

export async function getStaticProps() {
  //call api server
}

export default LoginPage
