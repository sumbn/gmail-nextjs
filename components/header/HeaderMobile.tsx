import Box from '@mui/material/Box';
import * as React from 'react';

export interface HeaderMobileProps {}

export default function HeaderMobile(props: HeaderMobileProps) {
  return <Box display={{ xs: 'block', lg: 'none' }}>Header Mobile</Box>;
}
