import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, SxProps, Theme, Typography, styled } from '@mui/material';
import useScreenWidth from '../../../hooks/useScreenWidth/useScreenWidth';

const ProfileWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  position: 'relative',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  flex: '0 0 60px',
  height: '60px',
  objectFit: 'cover',
  borderRadius: '50%',
  border: '1px solid #7f7f7f',
  [theme.breakpoints.up('md')]: {
    marginRight: '15px',
    flex: '0 0 70px',
    height: '70px',
  },
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '18px',
  lineHeight: '1.25',
  color: '#000000',
  marginBottom: '5px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('md')]: {
    fontSize: '22px',
  },
}));

const ProfileRole = styled(Typography)(() => ({
  fontFamily: 'inherit',
  color: '#4d4d4d',
  fontSize: '13px',
  lineHeight: '1.2',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const ProfileContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#ddd5cf',
  position: 'absolute',
  top: 'calc(100% + 25px)',
  maxWidth: '150px',
  padding: '10px',
  transition: 'transform 0.15s ease, opacity 0.15s ease',
  opacity: '0',
  transform: 'translateY(-10px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    right: '10%',
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '0 15px 20px 15px',
    borderColor: 'transparent transparent #ddd5cf transparent',
  },
  '&.open': {
    transition: 'transform 0.15s ease, opacity 0.15s ease',
    transform: 'translateY(0px)',
    opacity: '1',
  },
  [theme.breakpoints.up('md')]: {
    backgroundColor: 'transparent',
    padding: '0px',
    position: 'static',
    '&::before': {
      display: 'none',
    },
  },
}));

type ProfileProps = {
  name: string,
  role: string,
  src: string,
  className?: string,
  sx?: SxProps<Theme>,
  alt: string,
}

const Profile: React.FC<ProfileProps> = ({
  className,
  name,
  role,
  src,
  alt,
  sx,
}) => {
  const screenWidth = useScreenWidth();
  const isMobileWidth = screenWidth < 900;
  const [open, setOpen] = useState<boolean>(!isMobileWidth);
  const menuRef = useRef<HTMLDivElement>();

  const clickHander: React.MouseEventHandler<HTMLImageElement> = () => {
    if (isMobileWidth) {
      setOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const mouseDownHander = (e: MouseEvent): void => {
      if (isMobileWidth && !menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', mouseDownHander);

    return () => {
      document.removeEventListener('mousedown', mouseDownHander);
    };
  }, []);

  return (
    <ProfileWrapper
      ref={menuRef}
      sx={sx}
      className={className}
      data-testid='profile'
    >
      <ProfileAvatar
        src={src}
        alt={alt}
        onClick={clickHander}
      >
        {name[0]}
      </ProfileAvatar>
      <ProfileContent
        className={open ? 'open' : ''}
      >
        <ProfileName>
          {name}
        </ProfileName>
        <ProfileRole>
          {role}
        </ProfileRole>
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default Profile;
