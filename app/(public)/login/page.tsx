'use client';
import { Box, Paper, Typography } from '@mui/material';
import { LoginForm } from '../../../components';
import { LoginPayload } from '../../../components/login/LoginForm';
import { signIn } from 'next-auth/react';

import { useRouter } from 'next/navigation';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  const router = useRouter();
  async function handleLoginSubmit(payload: LoginPayload) {
    const res = await signIn('credentials', {
      redirect: false,
      email: payload.username,
      password: payload.password,
    });
    if (res?.error) {
      console.log(res?.error);
    } else {
      console.log('router push');
      router.push('/');
    }
  }
  return (
    <Box>
      <Paper
        elevation={4}
        sx={{ mx: 'auto', mt: 8, p: 4, maxWidth: '480px', textAlign: 'center' }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  );
}
