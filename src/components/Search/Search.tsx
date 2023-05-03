import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  FormHelperText,
  IconButton,
  Input,
  SxProps,
  Theme,
  styled,
} from '@mui/material';
import { visuallyHiddenStyles } from '../../App';
import { isEmpty } from '../../helpers/validation';

const SearchForm = styled('form')(() => ({
  width: '100%',
}));

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

const SearchLabel = styled('label')(() => ({
  ...visuallyHiddenStyles,
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
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#F2F2F2',
    transition: 'border-color 0.15s ease',
    padding: '8px 8px 8px 39px',
    [theme.breakpoints.up('md')]: {
      padding: '12px 12px 12px 51px',
    },
    '&:focus': {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#797979',
      transition: 'border-color 0.15s ease',
    },
    '&.error:focus': {
      borderColor: '#d32f2f',
    },
    '&::placeholder': {
      opacity: '1',
      color: '#797979',
    },
    '&.error::placeholder': {
      color: '#d32f2f',
    },
  },
  '&::after, &::before': {
    display: 'none',
  },
}));

type SearchProps = {
  id: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  value: string,
  sx?: SxProps<Theme>,
};

const Search: React.FC<SearchProps> = ({
  id,
  value,
  onChange,
  sx,
  return (
    <SearchForm
      sx={sx}
      noValidate
    >
      <SearchWrapper
        role='search'
      >
        <SearchButton
          type='submit'
          disableRipple
        >
          <SearchIcon />
        </SearchButton>
        <SearchLabel
          htmlFor={id}
        >
          Search about documents
        </SearchLabel>
        <SearchInput
          name='search'
          required
          id={id}
          placeholder='Search by Name...'
          value={value}
          aria-describedby={`${id}-helper-text`}
        />
      </SearchWrapper>

    </SearchForm>
  );
};

export default Search;


