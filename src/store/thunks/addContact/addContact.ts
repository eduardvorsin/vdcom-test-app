/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createId } from '../../../helpers/helpers';
import { ContactWithoutId } from '../../../models/IContact';
import ContactsAPI from '../../../API/ContactsAPI/ContactsAPI';
import { createContact } from '../../slices/contactSlice/contactSlice';
import { ErrorObject } from '../fetchContacts/fetchContacts';

type AddData = {
  token: string,
  data: ContactWithoutId,
};

const addContact = createAsyncThunk<void, AddData, { rejectValue: ErrorObject }>(
  'contacts/addContact',
  async ({ token, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ContactsAPI.addData(token, data);

      if (!response.ok) {
        throw new Error('Could not add this contact');
      }

      dispatch(createContact({
        ...data,
        clientId: createId(),
      }));
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue({
          message: err.message,
        });
      }
    }
  },
);

export default addContact;
