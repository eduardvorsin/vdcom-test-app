import React from 'react';

import { act, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import addMemoryRouter from '../../../tests/helpers/addMemoryRouter';
import wrapWithRedux from '../../../tests/helpers/wrapWithRedux';

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

describe('LoginPage integration tests', () => {
  it('should show an error if the login and password field is not filled in and the sign in button was pressed', async () => {
    const user = userEvent.setup();
    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/login'] }), {}));

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/login/i), 'rrooot2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/password/i), 'rrooot2');
    });

    user.click(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i }));

    expect(await screen.findByText<HTMLHeadingElement>(/Error/i)).toBeInTheDocument();
    expect(await screen.findByText<HTMLDivElement>(/not found/i)).toBeInTheDocument();
  });

  it('is a snapshot with error message', async () => {
    const user = userEvent.setup();
    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/login'] }), {}));

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/login/i), 'rrooot2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/password/i), 'rrooot2');
    });

    user.click(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i }));

    await screen.findByText<HTMLHeadingElement>(/Error/i);
    expect(screen.getByTestId<HTMLDivElement>('login-page')).toMatchSnapshot();
  });
});
