import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';

import { Alert, AlertTitle } from '@mui/material';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import loginAction from '../actions/loginAction/loginAction';
import addContactAction from '../actions/addContactAction/addContactAction';
import contactsLoader from '../loaders/contactsLoader';
import changeContactAction from '../actions/changeContactAction/changeContactAction';
import deleteContactAction from '../actions/deleteContactAction/deleteContactAction';
import Contacts from '../../components/Contacts/Contacts';
import { isAuth } from '../../helpers/authorization';

export type ContactsDeletePathName = '/contacts/:clientId/delete';
export type ContactsChangePathName = '/contacts/:clientId/change';

export const basename = process.env.NODE_ENV === 'development' ? '' : '/vdcom-test-app';

const router = createBrowserRouter(
  [
    {
      path: '/',
      loader: async () => (!isAuth() ? redirect('/login') : null),
      element: <HomePage />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: (
            <Alert
              severity='warning'>
              <AlertTitle>
                The data table could not be loaded, try reloading the page
              </AlertTitle>
            </Alert>
          ),
        },
        {
          path: 'contacts',
          loader: contactsLoader,
          element: <Contacts />,
        },
        {
          path: 'contacts/add',
          element: <Contacts />,
          action: addContactAction,
        },
        {
          path: 'contacts/:clientId',
          element: <Contacts />,
          index: true,
        },
        {
          path: 'contacts/:clientId/change',
          element: <Contacts />,
          action: changeContactAction,
        },
        {
          path: 'contacts/:clientId/delete',
          element: <Contacts />,
          action: deleteContactAction,
        },
      ],
    },
    {
      path: '/login',
      action: loginAction,
      element: <LoginPage />,
      errorElement: <LoginPage />,
    },
  ],
  {
    basename,
  },
);

const AppRouter = () => (
  <RouterProvider router={router} />
);

export default AppRouter;
