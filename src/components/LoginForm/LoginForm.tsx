import React, { useState } from 'react';
import { Button, TextField, Box, styled } from '@mui/material';
import { Form } from 'react-router-dom';
import { UserWithoutToken } from '../../models/IUser';
import { getCurrentValidationMessage, isEmpty } from '../../helpers/validation';

interface LoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement,
  password: HTMLInputElement,
}

const LoginTextField = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-input': {
    padding: '11px',
    fontSize: '16px',
    [theme.breakpoints.up('sm')]: {
      padding: '15px',
      fontSize: '20px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '19px',
      fontSize: '22px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '23px',
      fontSize: '24px',
    },
  },
  '.MuiFormLabel-root': {
    transition: 'none',
    transform: 'translate(0px, 0px)',
    position: 'static',
    fontWeight: '700',
    fontSize: '16px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '26px',
    },
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  padding: '8px',
  fontSize: '16px',
  minWidth: '130px',
  [theme.breakpoints.up('sm')]: {
    padding: '10px',
    fontSize: '20px',
    minWidth: '145px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '12px',
    fontSize: '22px',
    minWidth: '160px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '14px',
    fontSize: '24px',
    minWidth: '175px',
  },
}));

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const currentErrorMessage = getCurrentValidationMessage(e.target);

    if (name === 'username') {
      setUsername(value);
      setUsernameError(currentErrorMessage);
    } else {
      setPassword(value);
      setPasswordError(currentErrorMessage);
    }
  };

  const submitValidationHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const formElements = e.currentTarget.elements as LoginFormElements;
    const formEntries = [...formData.entries()] as [keyof UserWithoutToken, string][];

    const currentErrors = formEntries.reduce<UserWithoutToken>((loginErrors, loginFormEntries) => {
      const errorMessage = getCurrentValidationMessage(formElements[loginFormEntries[0]]);

      return {
        ...loginErrors,
        [loginFormEntries[0]]: errorMessage,
      };
    }, {} as UserWithoutToken);

    setUsernameError(currentErrors.username);
    setPasswordError(currentErrors.password);

    if (currentErrors.username !== '' || currentErrors.password !== '') {
      e.preventDefault();
    }
  };

  return (
    <Form
      method='post'
      action='/login'
      onSubmit={submitValidationHandler}
      noValidate
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridAutoRows: 'min-content',
          gap: '20px',
          maxWidth: { xs: '430px', md: '580px' },
          margin: '0 auto',
        }}
      >
        <Box>
          <LoginTextField
            required
            error={!isEmpty(usernameError)}
            helperText={usernameError}
            size='medium'
            variant='outlined'
            fullWidth
            label='Login'
            name='username'
            value={username}
            onChange={changeHandler}
            autoComplete='username'
          />
        </Box>
        <Box
        >
          <LoginTextField
            required
            error={!isEmpty(passwordError)}
            helperText={passwordError}
            size='medium'
            variant='outlined'
            fullWidth
            label='Password'
            name='password'
            value={password}
            onChange={changeHandler}
            type='password'
            autoComplete='current-password'
          />
        </Box>
        <Box
          sx={{
            justifySelf: 'center',
          }}
        >
          <LoginButton
            type='submit'
            color='primary'
            variant='contained'
            size='large'
            sx={{
              mt: {
                xs: '10px',
                sm: '15px',
                md: '20px',
                lg: '25px',
              },
            }}
          >
            Sign in
          </LoginButton>
        </Box>
      </Box>
    </Form>
  );
};

export default LoginForm;
