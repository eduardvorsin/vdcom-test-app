import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
} from '@mui/material';
import Navigation from '../../../components/Navigation/Navigation';
import Header from '../../../components/Header/Header';
import useScreenWidth from '../../../hooks/useScreenWidth/useScreenWidth';

const drawerWidth = 226;

const HomePage = () => {
  const screenWidth = useScreenWidth();
  const isMobileWidth = screenWidth < 900;

  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const leftMargin = isMobileWidth ? 0 : drawerWidth;

  const handleNavigationOpen = () => {
    setIsNavigationOpen(true);
  };

  const handleNavigationClose = () => {
    setIsNavigationOpen(false);
  };

  useEffect(() => {
    setIsNavigationOpen(!isMobileWidth);
  }, [isMobileWidth]);

  useEffect(() => {
    navigate('/contacts');
  }, []);

  return (
    <>
      <Header
        onMenuButtonClick={handleNavigationOpen}
        sx={{
          marginLeft: `${leftMargin}px`,
          width: `calc(100% - ${leftMargin}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
        }}
      />

      <Navigation
        open={isNavigationOpen}
        drawerWidth={drawerWidth}
        onNavigationClose={handleNavigationClose}
      />

      <Box
        component={'main'}
        sx={{
          p: { xs: '162px 24px 0px', md: '112px 24px 0px' },
          marginLeft: `${leftMargin}px`,
          transition: 'margin-left 0.3s ease',
          backgroundColor: '#EEEAE7',
        }}
      >
        <Outlet />
      </Box >
    </>
  );
};

export default HomePage;
