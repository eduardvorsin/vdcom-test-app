import {
  ActionFunctionArgs, ParamParseKey, Params, redirect,
} from 'react-router-dom';
import store from '../../../store/store';
import { getToken } from '../../../utils/authorization/authorization';
import deleteContact from '../../../store/thunks/deleteContact/deleteContact';
import { ContactsDeletePathName } from '../../AppRouter/AppRouter';

interface DeleteContactActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<ContactsDeletePathName>>,
}

const deleteContactAction = async ({ params }: DeleteContactActionArgs): Promise<Response> => {
  const contactId = Number(params.clientId);
  const token = getToken();

  //! возможно await здесь лишний
  if (token) {
    store.dispatch(deleteContact({
      id: contactId,
      token,
    }));
  }

  return redirect('/contacts');
};

export default deleteContactAction;
