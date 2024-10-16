'use client';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { headerLinks } from '../../constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HeaderDesktop() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    console.log('đã login');
  }

  function handleLogin() {
    router.push('/login');
  }

  function handleLogout() {}

  return (
    <Box display={{ xs: 'none', lg: 'block' }} py={2}>
      <Container
        sx={{
          display: { xs: 'none', lg: 'block' },
          py: 2,
          backgroundColor: '#1F2937',
        }}
      >
        <Stack direction='row' justifyContent='flex-end'>
          {headerLinks.map((route) => (
            <Link
              sx={{ ml: 2 }}
              underline='hover'
              key={route.path}
              href={route.path}
            >
              <Typography sx={{ color: 'white' }}>{route.label}</Typography>
            </Link>
          ))}

          {status === 'authenticated' ? (
            <Link
              sx={{ ml: 2, color: 'white', cursor: 'pointer' }}
              underline='hover'
              onClick={() => console.log('Logout clicked')}
            >
              <Typography sx={{ color: 'white' }}>Logout</Typography>
            </Link>
          ) : (
            <Link
              sx={{ ml: 2, color: 'white', cursor: 'pointer' }}
              underline='hover'
              onClick={handleLogin}
            >
              <Typography sx={{ color: 'white' }}>Login</Typography>
            </Link>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
