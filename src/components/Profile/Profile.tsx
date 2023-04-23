import React from 'react';
import { Box, SxProps, Theme, Typography, styled } from '@mui/material';

type ProfileProps = {
  name: string,
  role: string,
  src: string,
  sx?: SxProps<Theme>,
}

const ProfileWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const ProfileAvatar = styled('img')(({ theme }) => ({
  flexBasis: '60px',
  height: '60px',
  objectFit: 'cover',
  borderRadius: '50%',
  border: '1px solid #7f7f7f',
  [theme.breakpoints.up('md')]: {
    marginRight: '15px',
    flexBasis: '70px',
    height: '70px',
  },
}));

const ProfileContent = styled(Box)(({ theme }) => ({
  display: 'none',
  maxWidth: '130px',
  [theme.breakpoints.up('md')]: {
    display: 'block',
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

const Profile: React.FC<ProfileProps> = ({
  name,
  role,
  src,
  sx,
}) => (
  <ProfileWrapper
    sx={sx}
  >
    <ProfileAvatar
      src={src}
    />
    <ProfileContent>
      <ProfileName>
        {name}
      </ProfileName>
      <ProfileRole>
        {role}
      </ProfileRole>
    </ProfileContent>
  </ProfileWrapper>
);

export default Profile;

