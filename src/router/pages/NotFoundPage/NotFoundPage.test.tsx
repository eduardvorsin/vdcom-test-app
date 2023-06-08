import React from 'react';

import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

const routes = [{
  path: '/',
  element: <NotFoundPage />,
}];

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});

describe('NotFoundPage tests', () => {
  it('renders correctly', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLTitleElement>('heading', { name: /404/ })).toBeInTheDocument();
    expect(screen.getByText<HTMLParagraphElement>(/The page you are looking for was not found/i)).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('not-found-page')).toMatchSnapshot();
  });
});
