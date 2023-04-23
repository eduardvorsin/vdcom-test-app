import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import contactReducer from './slices/contactSlice/contactSlice';

export const setupStore = () => configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
  },
});

const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
