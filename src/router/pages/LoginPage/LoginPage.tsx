import React from 'react';
import { Box, Typography, Container, styled } from '@mui/material';
import Login from '../../../components/UI/Login/Login';
import Logo from '../../../components/UI/Logo/Logo';

const LoginWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  margin: '0 auto',
  maxWidth: '500px',
  minHeight: '505px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

  [theme.breakpoints.up('sm')]: {
    minHeight: '585px',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '692px',
    maxWidth: '654px',
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '790px',
  },
}));

const LoginLogo = styled(Logo)(({ theme }) => ({
  alignSelf: 'center',
  marginBottom: '28px',

  [theme.breakpoints.up('sm')]: {
    marginBottom: '68px',
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: '108px',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: '148px',
  },
}));

const LoginTitle = styled(Typography)(({ theme }) => ({
  lineHeight: '1.46',
  marginBottom: '20px',
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    marginBottom: '25px',
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: '30px',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: '35px',
  },
}));

const LoginPage = () => (
  <Container
    maxWidth='xl'
    data-testid='login-page'
  >
    <LoginWrapper>
      <LoginLogo />

      <LoginTitle
        variant='h3'
        component='h1'
      >
        Welcome To CRM System Sign In To Your Account
      </LoginTitle>

      <Login />
    </LoginWrapper>
  </Container>

);

export default LoginPage;
