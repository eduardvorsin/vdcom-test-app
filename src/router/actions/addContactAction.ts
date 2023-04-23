import {
  ActionFunctionArgs, redirect,
} from 'react-router-dom';
import { ContactWithoutId } from '../../models/IContact';
import store from '../../store/store';
import { getToken } from '../../helpers/authorization';
import addContact from '../../store/thunks/addContact/addContact';

interface addContactActionArgs extends ActionFunctionArgs {
  request: Request,
}

const addContactAction = async ({ request }: addContactActionArgs) => {
  const contactFormData = await request.formData();
  const contactData = {
    clientName: contactFormData.get('clientName'),
    'TRN/PPSN': contactFormData.get('TRN/PPSN'),
    yearEnd: contactFormData.get('yearEnd'),
    ARD: contactFormData.get('ARD'),
    companyNumber: Number(contactFormData.get('companyNumber')),
    email: contactFormData.get('email'),
    phoneNumber: Number(contactFormData.get('phoneNumber')),
    companyAdress: contactFormData.get('companyAdress'),
  } as unknown as ContactWithoutId;

  const token = getToken();

  if (token) {
    await store.dispatch(addContact({
      data: contactData,
      token,
    }));
  }

  return redirect('/contacts');
};

export default addContactAction;
