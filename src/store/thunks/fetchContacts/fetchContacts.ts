/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContact } from '../../../models/IContact';
import ContactsAPI from '../../../API/ContactsAPI/ContactsAPI';

export type ErrorObject = {
  message: string,
};

const fetchContacts = createAsyncThunk<IContact[], string, {
  rejectValue: ErrorObject
}>(
  'contacts/fetchContacts',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await ContactsAPI.fetchData(token);

      if (!response.ok) {
        throw new Error('Failed to upload contacts');
      }

      const contacts = await response.json();

      return contacts.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue({
          message: err.message,
        });
      }
    }
  },
);

export default fetchContacts;
