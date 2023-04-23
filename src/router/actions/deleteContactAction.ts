import {
  ActionFunctionArgs, ParamParseKey, Params, redirect,
} from 'react-router-dom';
import store from '../../store/store';
import { getToken } from '../../helpers/authorization';
import deleteContact from '../../store/thunks/deleteContact/deleteContact';
import { ContactsDeletePathName } from '../AppRouter/AppRouter';

interface DeleteContactActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<ContactsDeletePathName>>,
}

const deleteContactAction = async ({ params }: DeleteContactActionArgs) => {
  const contactId = Number(params.clientId);
  const token = getToken();

  if (token) {
    await store.dispatch(deleteContact({
      id: contactId,
      token,
    }));
  }

  return redirect('/contacts');
};

export default deleteContactAction;
