import React from 'react';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import AppRouter from './router/AppRouter/AppRouter';
import Poppins400 from './assets/fonts/Poppins-400.woff2';
import RobotoCondensed400 from './assets/fonts/Roboto-Condensed-400.woff2';
import RobotoCondensed700 from './assets/fonts/Roboto-Condensed-700.woff2';

let theme = createTheme();

theme = createTheme(theme, {
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontSize: '38px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '46px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '64px',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '96px',
      },
    },
    h3: {
      fontSize: '26px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '32px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '41px',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '48px',
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${Poppins400}) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Roboto Condensed';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${RobotoCondensed400}) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Roboto Condensed';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(${RobotoCondensed700}) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `,
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '.MuiInputBase-input, .MuiFormLabel-root, .MuiFormHelperText-root': {
              fontFamily: 'Roboto Condensed',
            },
            '.MuiInputBase-input, .MuiFormLabel-root': {
              color: '#000000',
            },
            '.MuiFormLabel-root': {
              transition: 'none',
              transform: 'translate(0px, 0px)',
              position: 'static',
              fontWeight: '700',
              fontSize: '16px',
              marginBottom: '8px',
              [theme.breakpoints.up('sm')]: {
                marginBottom: '9px',
              },
              [theme.breakpoints.up('md')]: {
                marginBottom: '10px',
              },
              [theme.breakpoints.up('lg')]: {
                marginBottom: '11px',
              },
            },
            '.MuiInputBase-root > fieldset': {
              display: 'none',
            },
            '.MuiInputBase-input': {
              boxSizing: 'border-box',
              height: 'auto',
              border: '1px solid rgba(0, 0, 0, 0.7)',
              transition: 'outline 0.15s ease',
              lineHeight: '1.17',
              padding: '11px',
              fontSize: '16px',
            },
            '.MuiInputBase-input:focus': {
              outline: '1px solid rgba(0, 0, 0, 0.7)',
              transition: 'outline 0.15s ease',
            },
            '.MuiFormHelperText-root': {
              fontSize: '18px',
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            '&': {
              fontFamily: 'Poppins',
              lineHeight: '1.375',
              color: '#ffffff',
              backgroundColor: '#000000',
              borderRadius: '0px',
              border: '2px solid rgba(0, 0, 0, 0.7)',
              transition: 'color 0.15s ease, background-color 0.15s ease',
              boxShadow: 'none',
              padding: '8px',
              fontSize: '16px',
            },
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#ffffff',
              color: '#000000',
              transition: 'color 0.15s ease, background-color 0.15s ease',
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            '&': {
              lineHeight: '1.5',
              color: '#ffffff',
              backgroundColor: '#EDBC4A',
              border: '2px solid #EDBC4A',
              transition: 'color 0.15s ease, background-color 0.15s ease',
              borderRadius: '10px',
              boxShadow: '1px 1px 20px hsla(0, 0%, 0%, 0.1)',
              textTransform: 'none',
              padding: '5px 10px',
              fontSize: '16px',
              minWidth: '110px',
              [theme.breakpoints.up('sm')]: {
                padding: '5px 15px',
                fontSize: '18px',
                minWidth: '125px',
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '20px',
                minWidth: '130px',
              },
              [theme.breakpoints.up('lg')]: {
                padding: '5px 20px',
                minWidth: '140px',
              },
            },
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#EDBC4A',
              transition: 'color 0.15s ease, background-color 0.15s ease',
            },
            '&:focus': {
              outline: '2px solid #000000',
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: 'none',
        },
      },
    },
  },
});

export const visuallyHiddenStyles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: -'1px',
  padding: '0',
  overflow: 'hidden',
  border: '0',
  clip: 'rect(0 0 0 0)',
} as const;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflowWrap: 'break-word',
        }}
      >
        <CssBaseline enableColorScheme />
        <AppRouter />
      </Box>
    </ThemeProvider>
  );
}
