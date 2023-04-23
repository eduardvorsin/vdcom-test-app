/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import ContactsAPI from '../../../API/ContactsAPI/ContactsAPI';
import { removeContact } from '../../slices/contactSlice/contactSlice';
import { ErrorObject } from '../fetchContacts/fetchContacts';

type RemoveData = {
  token: string,
  id: number
};

const deleteContact = createAsyncThunk<void, RemoveData, { rejectValue: ErrorObject }>(
  'contacts/deleteContact',
  async ({ token, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ContactsAPI.removeData(token, id);

      if (!response.ok) {
        throw new Error('Could not delete this contact');
      }

      dispatch(removeContact({ id }));
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue({
          message: err.message,
        });
      }
    }
  },
);

export default deleteContact;
