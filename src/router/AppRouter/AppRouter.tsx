import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import loginAction from '../actions/loginAction';
import addContactAction from '../actions/addContactAction';
import contactsLoader from '../loaders/contactsLoader';
import changeContactAction from '../actions/changeContactAction';
import deleteContactAction from '../actions/deleteContactAction';
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
      errorElement: (
        <NotFoundPage />
      ),
      children: [
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

console.log('router', router);

const AppRouter = () => (
  <RouterProvider router={router} />
);

export default AppRouter;
