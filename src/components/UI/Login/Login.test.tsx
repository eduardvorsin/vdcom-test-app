import React from 'react';

import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Login from './Login';

const routes = [{
  path: '/login',
  element: <Login />,
}];

const router = createMemoryRouter(routes, {
  initialEntries: ['/login'],
});

describe('Login tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders correctly', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('login')).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>(/Password/i)).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('login')).toMatchSnapshot();
  });
});
