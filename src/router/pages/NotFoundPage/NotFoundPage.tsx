import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
      minHeight: '400px',
    }}
  >
    <Typography
      variant='h2'
      component='h1'
      sx={{
        mb: '20px',
      }}
    >
      404
    </Typography>
    <Typography
      paragraph
    >
      Искомая страница не найдена
    </Typography>
    <Link
      to='/'
      component={RouterLink}
    >
      Перейти на главную
    </Link>
  </Box>
);

export default NotFoundPage;
