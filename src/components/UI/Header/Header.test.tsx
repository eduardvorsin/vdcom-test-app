import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import Header from './Header';

const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();
const routes = [{
  path: '/',
  element: <Header onMenuButtonClick={mockFn} />,
}];
const router = createMemoryRouter(routes, { initialEntries: ['/'] });

describe('Header tests', () => {
  it('renders correctly', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLElement>('banner')).toBeInTheDocument();
    expect(screen.getByRole<HTMLButtonElement>('button', { name: /open navigation menu/i })).toBeInTheDocument();
    expect(screen.getByRole<HTMLDivElement>('search')).toBeInTheDocument();
  });

  it('should call the mock function when clicking on the "open navigation menu" button', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    user.click(screen.getByRole<HTMLButtonElement>('button', { name: /open navigation menu/i }));

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('is a basic snapshot', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLElement>('banner')).toMatchSnapshot();
  });
});

describe('Header integration tests', () => {
  it('should be the displayed value if it has been entered', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    user.type(screen.getByRole<HTMLInputElement>('textbox'), 'contacts');

    await waitFor(() => {
      expect(screen.getByRole<HTMLInputElement>('textbox')).toHaveValue('contacts');
    });
  });
});
