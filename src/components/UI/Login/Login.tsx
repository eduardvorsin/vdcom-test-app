import React from 'react';
import { useActionData } from 'react-router-dom';
import { Fade, AlertTitle, Alert } from '@mui/material';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
  const actionError = useActionData();
  const error = actionError instanceof Error ? actionError : '';

  return (
    <>
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
            <AlertTitle>Ошибка</AlertTitle>
            {error.message}
          </Alert>
        </Fade>
      )}

      <LoginForm />
    </>
  );
};

export default Login;
