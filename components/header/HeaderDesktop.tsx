import { Box, Container, Link, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { headerLinks } from '../../constants';

export interface HeaderDesktopProps {}

export default function HeaderDesktop(props: HeaderDesktopProps) {
  return (
    <Box display={{ xs: 'none', lg: 'block' }} py={2}>
      <Container>
        <Stack direction='row' justifyContent='flex-end'>
          {headerLinks.map((route) => (
            <Link
              sx={{ ml: 2, color: 'primary.main' }}
              underline='hover'
              key={route.path}
              href={route.path}
            >
              <Typography color='blue'>{route.label}</Typography>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
