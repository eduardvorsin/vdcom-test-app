import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Logo from './Logo';

describe('Logo tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter initialEntries={['/contacts']}>
        <Routes>
          <Route path='contacts' element={<Logo className='logo' />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId<HTMLAnchorElement>('logo-link')).toBeInTheDocument();
    expect(screen.getByAltText<HTMLImageElement>('logo')).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(
      <MemoryRouter initialEntries={['/contacts']}>
        <Routes>
          <Route path='contacts' element={<Logo className='logo' />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId<HTMLAnchorElement>('logo-link')).toMatchSnapshot();
  });
});
