import {
  AppBar,
  Box,
  IconButton,
  SxProps,
  Theme,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import ProfileImg from '../../../assets/images/profile.jpg?webp';
import Profile from '../Profile/Profile';
import Search from '../../Search/Search';
import Logo from '../Logo/Logo';

type HeaderProps = {
  sx?: SxProps<Theme>,
  onMenuButtonClick: React.MouseEventHandler<HTMLButtonElement>,
}

const StyledAppBar = styled(AppBar)(() => ({
  position: 'absolute',
  justifyContent: 'center',
  zIndex: '5',
}));

const AppBarInner = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  margin: '0',
  display: 'grid',
  justifyContent: 'start',
  alignItems: 'center',
  padding: '5px 15px',
  gap: '10px 20px',
  gridTemplateColumns: 'min-content min-content 1fr',
  gridTemplateRows: '1fr 1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 215px',
    padding: '5px 24px',
    justifyContent: 'space-between',
  },
}));

const BurgerMenu = styled(IconButton)(({ theme }) => ({
  fontSize: '0px',
  color: '#000000',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const Header: React.FC<HeaderProps> = ({
  sx,
  onMenuButtonClick,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const searchChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledAppBar
      sx={sx}
    >
      <AppBarInner
      >
        <BurgerMenu
          onClick={onMenuButtonClick}
        >
          <MenuIcon />
          open navigation menu
        </BurgerMenu>

        <Logo
          sx={{
            display: { sx: 'block', md: 'none' },
          }}

        />

        <Search
          id='main-search'
          value={searchValue}
          onChange={searchChangeHandler}
          sx={{
            maxWidth: { lg: '552px', md: '350px', sm: '250px', xs: '100%' },
            gridRow: { xs: '2/3', md: '1/2' },
            gridColumn: { xs: '1/-1', md: 'span 1' },
          }}
        />

        <Profile
          name='Mr. Director'
          role='Managing Director'
          src={ProfileImg}
          alt='Mr. Director avatar'
        />
      </AppBarInner>
    </StyledAppBar>
  );
};

export default Header;
