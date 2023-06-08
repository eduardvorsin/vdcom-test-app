import {
  redirect,
} from 'react-router-dom';
import store from '../../store/store';
import { getToken, isAuth } from '../../utils/authorization/authorization';
import fetchContacts from '../../store/thunks/fetchContacts/fetchContacts';

const contactsLoader = async (): Promise<Response | null> => {
  if (!isAuth()) return redirect('/login');
  const token = getToken();

  if (token) {
    store.dispatch(fetchContacts(
      token,
    ));
  }

  return null;
};

export default contactsLoader;
