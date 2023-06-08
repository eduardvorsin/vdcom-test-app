import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../router/AppRouter/AppRouter';

type MemoryRouterOptions = Parameters<typeof createMemoryRouter>[1];

// eslint-disable-next-line max-len
const addMemoryRouter = (options?: MemoryRouterOptions): React.ReactElement => {
  const memoryRouter = createMemoryRouter(routes, options);
  return (<RouterProvider router={memoryRouter} />);
};

export default addMemoryRouter;
