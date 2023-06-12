import { render, screen } from '@testing-library/react';
import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ContactDialog from './ContactDialog';

describe('ContactDialog tests', () => {
  it('renders correctly', () => {
    const onCloseMock = jest.fn<void, [e: React.SyntheticEvent, reason: string]>();
    const routes = [{
      path: '/',
      element: (
        <ContactDialog
          title='test-title'
          onClose={onCloseMock}
          actionType='add'
          open
        />
      ),
    }];

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('contact-dialog')).toBeInTheDocument();
  });

  it('should be a title on the page with the passed title prop', () => {
    const onCloseMock = jest.fn<void, [e: React.SyntheticEvent, reason: string]>();
    const routes = [{
      path: '/',
      element: (
        <ContactDialog
          title='super title'
          onClose={onCloseMock}
          actionType='add'
          open
        />
      ),
    }];

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLHeadingElement>('heading', { name: /super title/i })).toBeInTheDocument();
  });

  it('should not be a dialog box on the page if the open prop is false', () => {
    const onCloseMock = jest.fn<void, [e: React.SyntheticEvent, reason: string]>();
    const routes = [{
      path: '/',
      element: (
        <ContactDialog
          title='super title'
          onClose={onCloseMock}
          actionType='add'
          open={false}
        />
      ),
    }];

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.queryByTestId<HTMLDivElement>('contact-dialog')).not.toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    const onCloseMock = jest.fn<void, [e: React.SyntheticEvent, reason: string]>();
    const routes = [{
      path: '/',
      element: (
        <ContactDialog
          title='test-title'
          onClose={onCloseMock}
          actionType='add'
          open
        />
      ),
    }];

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('contact-dialog')).toMatchSnapshot();
  });
});
