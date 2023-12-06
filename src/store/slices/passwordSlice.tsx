import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '../store';

interface PasswordState {
  password: string;
}

const initialState = { password: '' } as PasswordState;

export const password = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const { setPassword } = password.actions;
export default password.reducer;
export const useNameSelector = () => useTypedSelector((state) => state.name);
