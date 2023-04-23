/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContact } from '../../../models/IContact';
import { updateContact } from '../../slices/contactSlice/contactSlice';
import ContactsAPI from '../../../API/ContactsAPI/ContactsAPI';
import { ErrorObject } from '../fetchContacts/fetchContacts';

type UpdateData = {
  token: string,
  data: IContact,
};

const changeContact = createAsyncThunk<void, UpdateData, { rejectValue: ErrorObject }>(
  'contacts/changeContact',
  async ({ token, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ContactsAPI.updateData(token, data);

      if (!response.ok) {
        throw new Error('Could not change this contact');
      }

      dispatch(updateContact(data));
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue({
          message: err.message,
        });
      }
    }
  },
);

export default changeContact;
