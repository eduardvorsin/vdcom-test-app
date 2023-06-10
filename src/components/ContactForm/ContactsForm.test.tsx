import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactsForm tests', () => {
  it('renders correctly', () => {
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLFormElement>('contact-form')).toBeInTheDocument();
  });

  it('should call mock onSubmit when clicking on the accept button, if there are no validation errors', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/Client Name/i), '1');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Number/i), '2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/TRN\/PPSN/i), '3');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Adress/i), '4');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Year End/i), '2000-10-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/ARD/i), '2000-10-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Email/i), 'example@email.com');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Phone Number/i), '0123456789');

      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /To accept/i }));
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should show the message "this field is mandatory" if any of the form fields are empty', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /To accept/i }));
    });

    expect(screen.getAllByText<HTMLParagraphElement>('This field is mandatory')[0]).toBeInTheDocument();
  });

  it('should show the message "the entered value must match the following pattern example@email.com" if the email field is filled in incorrectly', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/Client Name/i), '1');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Number/i), '2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/TRN\/PPSN/i), '3');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Adress/i), '4');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Year End/i), '2000-10-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/ARD/i), '2000-10-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Email/i), 'example@.');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Phone Number/i), '0123456789');

      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /To accept/i }));
    });

    expect(screen.getByText<HTMLParagraphElement>('the entered value must match the following pattern example@email.com')).toBeInTheDocument();
  });

  it('should show the message "the entered value must correspond to the following pattern 0123456789" if the phone number field is filled in incorrectly', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/Client Name/i), '1');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Number/i), '2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/TRN\/PPSN/i), '3');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Adress/i), '4');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Year End/i), '2000-10-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/ARD/i), '2000-10-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Email/i), 'example@email.com');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Phone Number/i), '09');

      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /To accept/i }));
    });

    expect(screen.getByText<HTMLParagraphElement>('the entered value must correspond to the following pattern 0123456789')).toBeInTheDocument();
  });

  it('should show the message "You need to enter the date in the format yyyy-mm-dd" if the Year end or ARD field is filled in incorrectly', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.type(screen.getByLabelText<HTMLInputElement>(/Client Name/i), '1');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Number/i), '2');
      await user.type(screen.getByLabelText<HTMLInputElement>(/TRN\/PPSN/i), '3');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Company Adress/i), '4');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Year End/i), '2000-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/ARD/i), '2000-10');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Email/i), 'example@email.com');
      await user.type(screen.getByLabelText<HTMLInputElement>(/Phone Number/i), '0123456789');

      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /To accept/i }));
    });

    expect(screen.getAllByText<HTMLParagraphElement>('You need to enter the date in the format "yyyy-mm-dd"')).toHaveLength(2);
  });

  it('is a basic snapshot', () => {
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLFormElement>('contact-form')).toMatchSnapshot();
  });

  it('is a snapshot with validation errors', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.FormEvent]>();
    const routes = [{
      path: '/',
      element: (
        <ContactForm
          actionType='add'
          onSubmit={mockFn} />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /To accept/i }));
    });

    expect(screen.getByTestId<HTMLFormElement>('contact-form')).toMatchSnapshot();
  });
});
