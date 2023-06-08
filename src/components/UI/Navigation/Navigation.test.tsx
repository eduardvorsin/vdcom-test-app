import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';
import wrapWithRedux from '../../../tests/helpers/wrapWithRedux';
import addMemoryRouter from '../../../tests/helpers/addMemoryRouter';
import server from '../../../tests/msw/server';

describe('Navigation tests', () => {
  it('renders correctly', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();

    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    render(
      wrapWithRedux(
        <RouterProvider router={mockRouter} />,
        {},
      ),
    );

    expect(screen.getByTestId<HTMLDivElement>('navigation')).toBeInTheDocument();
  });

  it('should display the logo if the width is greater than 900 pixels, and should not if less', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();

    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    const renderedElement = wrapWithRedux(
      <RouterProvider router={mockRouter} />,
      {},
    );

    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1600);

    const { unmount } = render(renderedElement);

    expect(screen.getByAltText<HTMLImageElement>('logo')).toBeInTheDocument();

    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(768);

    unmount();
    render(renderedElement);

    expect(screen.queryByAltText<HTMLImageElement>('logo')).not.toBeInTheDocument();
  });

  it('should display the prev button if the width is less than 900 pixels, and should not if more', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();

    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    const renderedElement = wrapWithRedux(
      <RouterProvider router={mockRouter} />,
      {},
    );

    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(500);

    const { unmount } = render(renderedElement);

    expect(screen.getByRole<HTMLButtonElement>('button', { name: /close navigation/i })).toBeInTheDocument();

    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1000);

    unmount();
    render(renderedElement);

    expect(screen.queryByRole<HTMLButtonElement>('button', { name: /close navigation/i })).not.toBeInTheDocument();
  });

  it('should remove the Navigation component from the body if the open prop is false', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();

    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={false}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    render(wrapWithRedux(
      <RouterProvider router={mockRouter} />,
      {},
    ));

    expect(screen.queryByTestId<HTMLDivElement>('navigation')).not.toBeInTheDocument();
  });

  it('should apply the width passed through the drawerWidth prop', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();

    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={432}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    render(wrapWithRedux(
      <RouterProvider router={mockRouter} />,
      {},
    ));

    expect(screen.getByTestId<HTMLDivElement>('navigation')).toHaveStyle('width:432px');
  });

  it('should call the mock for the onNavigationClose function when clicking the close navigation button', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();
    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={432}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    render(wrapWithRedux(
      <RouterProvider router={mockRouter} />,
      {},
    ));

    user.click(await screen.findByRole<HTMLButtonElement>('button', { name: /close navigation/i }));

    await waitFor(async () => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('is a basic snapshot', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();
    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    render(
      wrapWithRedux(
        <RouterProvider router={mockRouter} />,
        {},
      ),
    );

    expect(screen.getByTestId<HTMLDivElement>('navigation')).toMatchSnapshot();
  });

  it('is a basic snapshot with a width of less than 900 pixels', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();
    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });
    jest.spyOn(window.screen, 'width', 'get').mockReturnValueOnce(500);

    render(
      wrapWithRedux(
        <RouterProvider router={mockRouter} />,
        {},
      ),
    );

    expect(screen.getByTestId<HTMLDivElement>('navigation')).toMatchSnapshot();
  });

  it('is a basic snapshot with a width of more than 900 pixels', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();
    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={true}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });
    jest.spyOn(window.screen, 'width', 'get').mockReturnValueOnce(1400);

    render(
      wrapWithRedux(
        <RouterProvider router={mockRouter} />,
        {},
      ),
    );

    expect(screen.getByTestId<HTMLDivElement>('navigation')).toMatchSnapshot();
  });

  it('is a snapshot with the open prop equal to false', () => {
    const mockFn = jest.fn<void, [e: React.MouseEvent<HTMLButtonElement>]>();
    const mockRouter = createMemoryRouter([{
      path: '/contacts',
      element: <Navigation
        drawerWidth={250}
        open={false}
        onNavigationClose={mockFn}
      />,
    }], {
      initialEntries: ['/contacts'],
    });

    render(
      wrapWithRedux(
        <RouterProvider router={mockRouter} />,
        {},
      ),
    );

    expect(screen.queryByTestId<HTMLDivElement>('navigation')).toMatchSnapshot();
  });
});

describe('Navigation integration tests', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('should go to the login page when clicking on the logout button', async () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1024);
    const user = userEvent.setup();
    const router = addMemoryRouter({
      initialEntries: ['/contacts'],
    });

    render(wrapWithRedux(router, {}));

    user.click(await screen.findByRole<HTMLAnchorElement>('link', { name: /Log out/i }));

    await waitFor(() => {
      expect(screen.queryByRole<HTMLAnchorElement>('link', { name: /Log out/i })).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole<HTMLTitleElement>('heading', { name: /Welcome To CRM System Sign In To Your Account/i })).toBeInTheDocument();
    });
  });

  it('should go to the 404 page when clicking on calendar page link', async () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1024);
    const user = userEvent.setup();
    const router = addMemoryRouter({
      initialEntries: ['/contacts'],
    });

    render(wrapWithRedux(router, {}));

    user.click(await screen.findByRole<HTMLAnchorElement>('link', { name: /calendar/i }));

    await waitFor(async () => {
      expect(screen.queryByRole<HTMLAnchorElement>('link', { name: /calendar/i })).not.toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByRole<HTMLTitleElement>('heading', { name: /404/i })).toBeInTheDocument();
    });
  });

  it('should go to the 404 page when clicking on project report page link', async () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1024);
    const user = userEvent.setup();
    const router = addMemoryRouter({
      initialEntries: ['/contacts'],
    });

    render(wrapWithRedux(router, {}));

    user.click(await screen.findByRole<HTMLAnchorElement>('link', { name: /project report/i }));

    await waitFor(() => {
      expect(screen.queryByRole<HTMLAnchorElement>('link', { name: /project report/i })).not.toBeInTheDocument();
    });
    await waitFor(async () => {
      expect(screen.getByRole<HTMLTitleElement>('heading', { name: /404/i })).toBeInTheDocument();
    });
  });
});
