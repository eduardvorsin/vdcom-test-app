/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../../models/IContact';
import fetchContacts from '../../thunks/fetchContacts/fetchContacts';
import deleteContact from '../../thunks/deleteContact/deleteContact';
import addContact from '../../thunks/addContact/addContact';
import changeContact from '../../thunks/changeContact/changeContact';

export type ContactState = {
  status: 'resolved' | 'rejected' | 'loading' | null,
  error: string | null,
  data: [] | IContact[],
}

const initialState: ContactState = {
  status: null,
  error: null,
  data: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    removeContact(state, action: PayloadAction<{ id: number }>) {
      state.data = state.data.filter((item) => item.clientId !== action.payload.id);
    },
    createContact(state, action: PayloadAction<IContact>) {
      state.data = [...state.data, action.payload];
    },
    updateContact(state, action: PayloadAction<IContact>) {
      const updateIndex = state.data.findIndex((item) => item.clientId === action.payload.clientId);
      state.data[updateIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.data = [];
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'resolved';

        if (state.data.length === 0) {
          state.data = action.payload;
        }
      })
      .addCase(deleteContact.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.error = null;
        state.status = 'resolved';
      })
      .addCase(addContact.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(addContact.fulfilled, (state) => {
        state.error = null;
        state.status = 'resolved';
      })
      .addCase(changeContact.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(changeContact.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(changeContact.fulfilled, (state) => {
        state.error = null;
        state.status = 'resolved';
      });
  },
});

export const { removeContact, createContact, updateContact } = contactSlice.actions;
export default contactSlice.reducer;
