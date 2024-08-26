'use client'
import { Avatar, Box, Container, CssBaseline, Typography } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from "../../components/LoginForm";
import { useRouter } from 'next/navigation';


const Login = () => {

  const router = useRouter()

  return ( <Container component="main" maxWidth="xs">
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
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <LoginForm callRouter={() => {
        router.push('/')
      }}/>
    </Box>
  </Container>)
}

export default Login
