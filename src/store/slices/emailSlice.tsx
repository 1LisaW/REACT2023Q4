import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '../store';

interface EmailState {
  email: string;
}

const initialState = { email: '' } as EmailState;

export const email = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = email.actions;
export default email.reducer;
export const useNameSelector = () => useTypedSelector((state) => state.name);
