import {
  ActionFunctionArgs, ParamParseKey, Params, redirect,
} from 'react-router-dom';
import { IContact } from '../../../models/IContact';
import store from '../../../store/store';
import { getToken } from '../../../utils/authorization/authorization';
import changeContact from '../../../store/thunks/changeContact/changeContact';
import { ContactsChangePathName } from '../../AppRouter/AppRouter';

interface changeContactActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<ContactsChangePathName>>,
  request: Request,
}

// eslint-disable-next-line max-len
const changeContactAction = async ({ params, request }: changeContactActionArgs): Promise<Response> => {
  const contactFormData = await request.formData();

  const contactData = {
    clientId: Number(params.clientId),
    clientName: contactFormData.get('clientName'),
    'TRN/PPSN': contactFormData.get('TRN/PPSN'),
    yearEnd: contactFormData.get('yearEnd'),
    ARD: contactFormData.get('ARD'),
    companyNumber: Number(contactFormData.get('companyNumber')),
    email: contactFormData.get('email'),
    phoneNumber: Number(contactFormData.get('phoneNumber')),
    companyAdress: contactFormData.get('companyAdress'),
  } as unknown as IContact;

  const token = getToken();

  if (token) {
    store.dispatch(changeContact({
      data: contactData,
      token,
    }));
  }

  return redirect('/contacts');
};

export default changeContactAction;
