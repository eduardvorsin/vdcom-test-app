import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  IconButton,
  Input,
  SxProps,
  Theme,
  styled,
} from '@mui/material';

const SearchWrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
}));

const SearchButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: '10',
  top: '50%',
  left: '16px',
  transform: 'translateY(-50%)',
  padding: '0px',
  svg: {
    width: '20px',
    height: '20px',
    fill: '#000000',
    transition: 'fill 0.15s ease',
  },
  [theme.breakpoints.up('md')]: {
    svg: {
      width: '28px',
      height: '28px',
    },
  },
  '&:hover > svg, &:focus > svg, &:focus-visible > svg': {
    fill: '#666666',
    transition: 'fill 0.15s ease',
  },
}));

const SearchInput = styled(Input)(({ theme }) => ({
  '&': {
    width: '100%',
  },
  '.MuiInput-input': {
    fontFamily: 'Roboto Condensed',
    fontSize: '20px',
    borderRadius: '6px',
    backgroundColor: '#F2F2F2',
    lineHeight: '1.17',
    height: 'auto',
    border: '2px solid #F2F2F2',
    transition: 'border 0.15s ease',
    padding: '8px 8px 8px 39px',
    [theme.breakpoints.up('md')]: {
      padding: '12px 12px 12px 51px',
    },
    '&:focus': {
      border: '2px solid #797979',
      transition: 'border 0.15s ease',
    },
    '&::placeholder': {
      opacity: '1',
      color: '#797979',
    },
  },
  '&::after, &::before': {
    display: 'none',
  },
}));

type SearchProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  value: string,
  sx?: SxProps<Theme>,
};

const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  sx,
}) => (
  <SearchWrapper
    sx={sx}
  >
    <SearchButton
      disableRipple
    >
      <SearchIcon />
    </SearchButton>
    <SearchInput
      placeholder='Search by Name...'
      value={value}
      onChange={onChange}
    />
  </SearchWrapper>
);

export default Search;


