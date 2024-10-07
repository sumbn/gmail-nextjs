import { Box, Container, Link, Stack } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { ROUTE_LIST } from './routes'

const logout = () => {
  signOut({ callbackUrl: '/login' })
}

const Header = () => {
  const { data: session } = useSession()
  const isLoggedIn = Boolean(session?.user.name)

  const routeList = ROUTE_LIST.filter(
    (route) => !route.requireLogin || isLoggedIn
  )

  return (
    // <header className="bg-gray-800 text-white py-4 px-4 md:px-8">
    //   <div className="container mx-auto flex justify-between items-center">
    //     <Link href="/" className="text-2xl font-bold">Welcome {session?.user.name}</Link>
    //     <nav>
    //       <ul className="flex space-x-6">
    //         <li><Link className="hover:text-gray-400 transition" href="/">Home</Link></li>
    //         <li><Link className="hover:text-gray-400 transition" href="/profile">Home</Link></li>
    //         <li><button onClick={logout}>Logout</button></li>
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container className='bg-gray-800 text-white py-4 px-4 md:px-8'>
        <Stack direction='row' justifyContent='space-between'>
          <Link href='/' className='text-2xl font-bold'>
            Welcome {session?.user.name}
          </Link>
          <Stack direction='row' justifyContent='flex-end'>
            {routeList.map((router) => (
              <Link
                key={router.path}
                href={router.path}
                sx={{ ml: 2, fontWeight: 'medium' }}
              >
                {router.label}
              </Link>
            ))}

            {!isLoggedIn && (
              <Link href='/login' sx={{ ml: 2, fontWeight: 'medium' }}>
                Login
              </Link>
            )}

            {isLoggedIn && (
              <Link
                sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }}
                onClick={logout}
              >
                Logout
              </Link>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
