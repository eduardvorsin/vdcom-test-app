import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import contactReducer from './slices/contactSlice/contactSlice';

const rootReducer = combineReducers({
  user: userReducer,
  contact: contactReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (initialState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
