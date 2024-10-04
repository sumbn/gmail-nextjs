'use client'
import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoginForm, { LoginPayload } from '../../components/auth/LoginForm'
import { useRouter } from 'next/navigation'
import { useLoading } from '../../context/loadingContext'
import { signIn } from 'next-auth/react'
import { enqueueSnackbar } from 'notistack'

const Login = () => {
  const router = useRouter()
  const { setLoading } = useLoading()

  async function handleLoginSubmit(payload: LoginPayload) {
    console.log('data form =>', payload)
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: payload.username,
      password: payload.password,
    })

    if (res?.error) {
      setLoading(false)
      enqueueSnackbar('Incorrect email or Password', { variant: 'error' })
    } else {
      // router.push('/')
      setLoading(false)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <LoginForm onSubmit={handleLoginSubmit} />
      </Box>
    </Container>
  )
}

export default Login
