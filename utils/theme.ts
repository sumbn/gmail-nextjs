'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#1976d2',
    // },
    // secondary: {
    //   main: '#dc004e',
    // },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        // maxWidthSm: {
        //   maxWidth: '680',
        //   '@media (min-width: 600px)': {
        //     maxWidth: '680px',
        //   },
        // },
        // maxWidthMd: {
        //   maxWidth: '860',
        //   '@media (min-width: 900px)': {
        //     maxWidth: '860px',
        //   },
        // },
      },
      // variants: [],
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        // root: {
        //   color: '#dc004e!',
        //   '&:hover': {
        //     color: '#1976d2',
        //   },
        // },
      },
    },

    // MuiPagination: {
    //   styleOverrides: {
    //     root: {
    //       button: {
    //         color: '#000000',
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
