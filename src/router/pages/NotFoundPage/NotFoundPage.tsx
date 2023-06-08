import React from 'react';
import { Box, Typography, Link, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SdCardAlertOutlinedIcon from '@mui/icons-material/SdCardAlertOutlined';

const NotFoundWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100vh',
  minHeight: '400px',
  padding: '0 15px',
}));

const NotFoundIcon = styled(SdCardAlertOutlinedIcon)(({ theme }) => ({
  width: '60px',
  height: '60px',
  marginBottom: '25px',

  [theme.breakpoints.up('sm')]: {
    width: '70px',
    height: '70px',
    marginBottom: '35px',
  },
  [theme.breakpoints.up('md')]: {
    width: '85px',
    height: '85px',
    marginBottom: '40px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100px',
    height: '100px',
    marginBottom: '50px',
  },
}));

const NotFoundLink = styled(Link)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#32302c',
  fontSize: '20px',
  textDecorationColor: 'currentColor',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '#EDBC4A',
    transition: 'color 0.15s ease',
  },
}));

const NotFoundTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '20px',

  [theme.breakpoints.up('md')]: {
    marginBottom: '30px',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: '40px',
  },
}));

const NotFoundText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '22px',
  marginBottom: '10px',

  [theme.breakpoints.up('sm')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '26px',
    marginBottom: '15px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '30px',
    marginBottom: '20px',
  },
}));

const NotFoundPage = () => (
  <NotFoundWrapper
    data-testid='not-found-page'
  >
    <NotFoundIcon />

    <NotFoundTitle
      variant='h1'
      component='h1'
    >
      404
    </NotFoundTitle>
    <NotFoundText
      paragraph
    >
      The page you are looking for was not found
    </NotFoundText>
    <NotFoundLink
      to='/'
      component={RouterLink}
    >
      Go to the main page
    </NotFoundLink>
  </NotFoundWrapper>
);

export default NotFoundPage;
