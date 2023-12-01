import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { username } from './slices/nameSlice';
import { email } from './slices/emailSlice';
import { age } from './slices/ageSlice';
import { gender } from './slices/genderSlice';
import { country } from './slices/countrySlice';
import { password } from './slices/passwordSlice';
import { avatar } from './slices/avatarSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      name: username.reducer,
      email: email.reducer,
      age: age.reducer,
      gender: gender.reducer,
      country: country.reducer,
      password: password.reducer,
      avatar: avatar.reducer,
    },
  });

export const store = createStore();
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<AppStore['getState']>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStore = ReturnType<typeof createStore>;
