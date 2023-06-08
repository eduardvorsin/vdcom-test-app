import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ContactsTable from './ContactsTable';
import contacts from '../../data/fakeData';

describe('ContactsTable tests', () => {
  it('renders correctly', () => {
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('table')).toBeInTheDocument();
    expect(screen.getByRole<HTMLTableElement>('table')).toBeInTheDocument();
  });

  it('should call the mock function when you click on the "delete contact" button', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    const user = userEvent.setup();
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    user.click(screen.getAllByRole<HTMLButtonElement>('button', { name: /delete contact/i })[0]);

    await waitFor(() => {
      expect(deleteMockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('should call the mock function when you click on the "edit contact" button', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    const user = userEvent.setup();
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    user.click(screen.getAllByRole<HTMLButtonElement>('button', { name: /edit contact/i })[0]);

    await waitFor(() => {
      expect(editMockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('should change the data in the table when you click on the next page', async () => {
    const user = userEvent.setup();
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    const prevFirstCellText = screen.getAllByRole<HTMLTableCellElement>('cell')[0].textContent as string;
    await act(async () => {
      await user.click(screen.getByTitle<HTMLButtonElement>('Go to next page'));
    });
    const currentFirstCellText = screen.getAllByRole<HTMLTableCellElement>('cell')[0].textContent;

    expect(prevFirstCellText).not.toBe(currentFirstCellText);
  });

  it('should change the data in the table when you click on sorting by a specific column', async () => {
    const user = userEvent.setup();
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    const prevFirstCellText = screen.getAllByRole<HTMLTableCellElement>('cell')[0].textContent as string;
    await act(async () => {
      await user.click(screen.getByText<HTMLButtonElement>('Client ID'));
    });
    const currentFirstCellText = screen.getAllByRole<HTMLTableCellElement>('cell')[0].textContent;

    expect(prevFirstCellText).not.toBe(currentFirstCellText);
  });

  it('is a basic snapshot', () => {
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('table')).toMatchSnapshot();
  });

  it('is a snapshot with switched table page', async () => {
    const user = userEvent.setup();
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.click(screen.getByTitle<HTMLButtonElement>('Go to next page'));
    });

    expect(screen.getByTestId<HTMLDivElement>('table')).toMatchSnapshot();
  });

  it('is a snapshot with a table sorted by clientID column', async () => {
    const user = userEvent.setup();
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={contacts}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await act(async () => {
      await user.click(screen.getByText<HTMLButtonElement>('Client ID'));
    });

    expect(screen.getByTestId<HTMLDivElement>('table')).toMatchSnapshot();
  });

  it('is a snapshot with a table without data', () => {
    const editMockFn = jest.fn<void, [id: number]>();
    const deleteMockFn = jest.fn<void, [id: number]>();
    const routes = [{
      path: '/',
      element: (
        <ContactsTable
          rows={[]}
          onEdit={editMockFn}
          onDelete={deleteMockFn}
        />
      ),
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('table')).toMatchSnapshot();
  });
});
