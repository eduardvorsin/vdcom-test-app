import React from 'react';

import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

const routes = [{
  path: '/',
  element: <LoginPage />,
}];

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});

describe('LoginPage tests', () => {
  it('renders correctly', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLTitleElement>('heading', { name: /Welcome To CRM System Sign In To Your Account/i })).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('login-page')).toMatchSnapshot();
  });
});
