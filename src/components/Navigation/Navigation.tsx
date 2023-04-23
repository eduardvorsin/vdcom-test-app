import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  Link,
  styled,
  IconButton,
} from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link as ReactRouterLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import RouterNavLink from '../RouterNavLink/RouterNavLink';
import useAppDispatch from '../../hooks/useAppDispatch/useAppDispatch';
import { removeToken } from '../../helpers/authorization';
import { logoutUser } from '../../store/slices/userSlice/userSlice';
import useScreenWidth from '../../hooks/useScreenWidth/useScreenWidth';

type NavigationProps = {
  drawerWidth: number,
  open: boolean,
  onNavigationClose: React.MouseEventHandler<HTMLButtonElement>,
}

const LinkBaseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#32302c',
  textDecoration: 'none',
  fontSize: '20px',
  lineHeight: '1.5',
  width: '100%',
} as const;

const StyledNavLink = styled(Link)(() => ({
  ...LinkBaseStyles,
  padding: '12px 24px',
  '&::before, &::after': {
    content: '""',
    top: '0',
    left: '0',
    position: 'absolute',
    transition: 'background-color 0.15s ease, color 0.15s ease',
  },
  '&.active': {
    '&::after': {
      backgroundColor: '#FBF2DB',
      zIndex: '-1',
      width: '100%',
      height: '100%',
    },
    '&::before': {
      height: '100%',
      width: '5px',
      backgroundColor: '#EDBC4A',
    },
  },
  '&:hover': {
    '&::after': {
      backgroundColor: '#EDBC4A',
      zIndex: '-1',
      width: '100%',
      height: '100%',
    },
    '&::before': {
      height: '100%',
      width: '5px',
      backgroundColor: 'hsl(42, 82%, 41%)',
    },
  },
}));

const IconWrapper = styled(Box)(() => ({
  display: 'inline-block',
  mr: '10px',
  lineHeight: '1',
}));

const StyledListItem = styled(ListItem)(() => ({
  position: 'relative',
  padding: '0px',
  '&:not(:last-child)': {
    marginBottom: '20px',
  },
  '@media (min-height: 600px)': {
    '&:not(:last-child)': {
      marginBottom: '65px',
    },
  },
}));

const StyledLink = styled(Link)(() => ({
  ...LinkBaseStyles,
  justifyContent: 'center',
  transition: 'color 0.15s ease',
  '&:hover': {
    color: '#666666',
    transition: 'color 0.15s ease',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
  borderBottom: '1px solid rgb(234, 234, 234)',
  padding: '0px 24px 15px',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
    marginBottom: '43px',
  },
}));

const Navigation: React.FC<NavigationProps> = ({
  drawerWidth,
  open,
  onNavigationClose,
}) => {
  const screenWidth = useScreenWidth();
  const dispatch = useAppDispatch();

  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = () => {
    removeToken();
    dispatch(logoutUser());
  };

  const isMobileWidth = screenWidth < 900;

  return (
    <Box
    >
      <Drawer
        open={open}
        variant={`${isMobileWidth ? 'temporary' : 'persistent'}`}
        anchor='left'
        onClose={onNavigationClose}
        sx={{
          width: `${drawerWidth}px`,
          '.MuiPaper-root': {
            maxWidth: `${drawerWidth}px`,
            width: '100%',
            padding: '15px 0px 0px',
            border: 'none',
          },
        }}
      >
        <DrawerHeader>
          {!isMobileWidth && (
            <Logo />
          )}

          {isMobileWidth && (
            <IconButton
              onClick={onNavigationClose}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>

        <Box
          component={'nav'}
        >
          <List>
            <StyledListItem>
              <StyledNavLink
                component={RouterNavLink}
                to='/contacts'
              >
                <IconWrapper
                  component={'span'}
                >
                  <ContactsIcon />
                </IconWrapper>

                Total Contacts
              </StyledNavLink>
            </StyledListItem>
            <StyledListItem>
              <StyledNavLink
                component={RouterNavLink}
                to='/calendar'
              >
                <IconWrapper
                  component={'span'}
                >
                  <DateRangeIcon />
                </IconWrapper>

                Calendar
              </StyledNavLink>
            </StyledListItem>
            <StyledListItem>
              <StyledNavLink
                component={RouterNavLink}
                to='/project-report'
              >
                <IconWrapper
                  component={'span'}
                >
                  <DataUsageIcon />
                </IconWrapper>

                Project Report
              </StyledNavLink>
            </StyledListItem>
          </List>
        </Box>

        <Box
          sx={{
            mt: 'auto',
            padding: '18px 24px',
            display: 'flex',
            borderTop: '1px solid #EAEAEA',
          }}
        >
          <StyledLink
            to='/login'
            onClick={handleLogout}
            component={ReactRouterLink}
          >
            <IconWrapper
              component={'span'}
            >
              <LogoutIcon />
            </IconWrapper>

            Log out
          </StyledLink>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navigation;
