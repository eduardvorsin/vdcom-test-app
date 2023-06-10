import React from 'react';

import { act, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const routes = [{
  path: '/login',
  element: <LoginForm />,
}];

const router = createMemoryRouter(routes, {
  initialEntries: ['/login'],
});

describe('LoginForm tests', () => {
  it('renders correctly', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLInputElement>(/Password/i)).toBeInTheDocument();
  });

  it('should show the message "this field is mandatory" if any of the form fields are empty', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i }));
    });

    expect(screen.getAllByText<HTMLParagraphElement>('This field is mandatory')).toHaveLength(2);
  });

  it('should show the message "The username must be more than 3 characters long" if the length of the value is less than 3', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/Login/i), '1');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Password/i), 'aaa4445');

      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i }));
    });

    expect(screen.getByText<HTMLParagraphElement>('The username must be more than 3 characters long')).toBeInTheDocument();
  });

  it('should show the message "The password must be more than 5 characters" if the length of the value is less than 5', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/Login/i), '1bdc2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Password/i), 'abc');

      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i }));
    });

    expect(screen.getByText<HTMLParagraphElement>('The password must be more than 5 characters')).toBeInTheDocument();
  });

  it('should show the message "The password must contain at least one lowercase character" if the value does not contain lowercase characters', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/Login/i), 'tyuabb2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Password/i), '123456');

      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i }));
    });

    expect(screen.getByText<HTMLParagraphElement>('The password must contain at least one lowercase character')).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLFormElement>('login-form')).toMatchSnapshot();
  });

  it('is a snapshot with validation errors', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /Sign in/i }));
    });

    expect(screen.getByTestId<HTMLFormElement>('login-form')).toMatchSnapshot();
  });
});
