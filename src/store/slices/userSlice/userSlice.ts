import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';
/* eslint-disable no-param-reassign */

export type UserState = {
  username: string | null,
  password: string | null,
  token: string
}

const initialState: UserState = {
  username: null,
  password: null,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state: UserState, action: PayloadAction<IUser>) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },

    logoutUser(state: UserState) {
      state.username = null;
      state.password = null;
      state.token = '';
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
