import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Login from '../../../components/Login/Login';
import Logo from '../../../components/Logo/Logo';

const LoginPage = () => (
  <Container
    maxWidth='xl'
  >
    <Box
      sx={{
        height: '100vh',
        maxWidth: { xs: '500px', md: '654px' },
        margin: '0 auto',
        minHeight: {
          xs: '505px',
          sm: '585px',
          md: '692px',
          lg: '790px',
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Logo
        sx={{
          alignSelf: 'center',
          mb: {
            xs: '28px',
            sm: '68px',
            md: '108px',
            lg: '148px',
          },
        }}
      />

      <Typography
        align='center'
        variant='h3'
        component='h1'
        sx={{
          lineHeight: '1.46',
          mb: {
            lg: '35px',
            md: '30px',
            sm: '25px',
            xs: '20px',
          },
        }}
      >
        Welcome To CRM System Sign In To Your Account
      </Typography>

      <Login />
    </Box>
  </Container>

);

export default LoginPage;
