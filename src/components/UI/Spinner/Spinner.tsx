import {
  Box,
  CircularProgress,
  SxProps,
  Theme,
  styled,
} from '@mui/material';
import React, { FC } from 'react';

const SpinnerWrapper = styled(Box)(() => ({
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
}));

type SpinnerProps = {
  className?: string,
  sx?: SxProps<Theme>,
  size?: number,
}

const Spinner: FC<SpinnerProps> = ({
  className,
  sx,
  size = 60,
}) => (
  <SpinnerWrapper
    className={className}
    sx={sx}
    data-testid='spinner'
  >
    <CircularProgress
      size={size}
    />
  </SpinnerWrapper>
);

export default Spinner;
