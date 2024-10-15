'use client';
import { Box, Paper, Typography } from '@mui/material';
import { LoginForm } from '../../../components';
import { LoginPayload } from '../../../components/login/LoginForm';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      // await authApi.login(payload)
      //router.push('/')
    } catch (error) {}
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
