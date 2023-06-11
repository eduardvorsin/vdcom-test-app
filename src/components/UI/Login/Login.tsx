import React from 'react';
import { useActionData } from 'react-router-dom';
import { Fade, AlertTitle, Alert, Box } from '@mui/material';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
  const actionError = useActionData();
  const error = actionError instanceof Error ? actionError : '';

  return (
    <Box data-testid='login'>
      {error && (
        <Fade
          in={Boolean(error)}
        >
          <Alert
            severity='error'
            variant='standard'
            sx={{
              mb: '30px',
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        </Fade>
      )}

      <LoginForm />
    </Box>
  );
};

export default Login;
