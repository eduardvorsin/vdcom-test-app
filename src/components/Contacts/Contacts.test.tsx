import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import errorState from '../../tests/stubs/errorState';
import Contacts from './Contacts';
import wrapWithRedux from '../../tests/helpers/wrapWithRedux';
import loadingState from '../../tests/stubs/loadingState';
import resolvedState from '../../tests/stubs/resolvedState';

describe('Contacts tests', () => {
  it('renders correctly', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, {}));

    expect(screen.getByTestId<HTMLDivElement>('contacts')).toBeInTheDocument();
    expect(screen.getByRole<HTMLTableElement>('heading', {
      name: /Total Contacts/i,
    })).toBeInTheDocument();
  });

  it('should show an error if the fetch status is "error"', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, errorState));

    expect(screen.getAllByText<HTMLDivElement>('mock error')[0]).toBeInTheDocument();
  });

  it('should show a spinner if the fetch status is "loading"', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, loadingState));

    expect(screen.getByTestId<HTMLDivElement>('spinner')).toBeInTheDocument();
  });

  it('should show a table with data if the download status is "resolved"', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, resolvedState));

    expect(screen.getByRole<HTMLButtonElement>('button', { name: /Add/i })).toBeInTheDocument();
    expect(screen.getAllByRole<HTMLTableCellElement>('columnheader')[0]).toBeInTheDocument();
    expect(screen.getAllByRole<HTMLTableCellElement>('cell')[0]).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, {}));

    expect(screen.getByTestId<HTMLDivElement>('contacts')).toMatchSnapshot();
  });

  it('is a snapshot with displayed error', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, errorState));

    expect(screen.getByTestId<HTMLDivElement>('contacts')).toMatchSnapshot();
  });

  it('is a snapshot with the displayed spinner', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, loadingState));

    expect(screen.getByTestId<HTMLDivElement>('contacts')).toMatchSnapshot();
  });

  it('is a snapshot with data table', () => {
    const routes = [{
      path: '/',
      element: <Contacts />,
    }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(wrapWithRedux(<RouterProvider router={router} />, resolvedState));

    expect(screen.getByTestId<HTMLDivElement>('contacts')).toMatchSnapshot();
  });
});
