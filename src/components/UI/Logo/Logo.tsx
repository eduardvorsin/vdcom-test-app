import React from 'react';
import {
  Link,
  SxProps,
  Theme,
  styled,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logotype from '../../../assets/images/icons/logo.svg?url';

type LogoProps = {
  sx?: SxProps<Theme>,
};

const StyledLogo = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100px',
  height: '27px',
  [theme.breakpoints.up('sm')]: {
    width: '110px',
    height: '30px',
  },
  [theme.breakpoints.up('md')]: {
    width: '140px',
    height: '39px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '175px',
    height: '48px',
  },
}));

const Logo: React.FC<LogoProps> = ({
  sx,
}) => (
  <Link
    to='/contacts'
    component={RouterLink}
    sx={{
      display: 'inline-flex',
      ...sx,
    }}
  >
    <StyledLogo
      src={Logotype}
      alt='logo'
    />
  </Link>
);

export default Logo;
