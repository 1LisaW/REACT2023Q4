import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { getStorageData } from '../services/storage';
import { useTypedSelector } from '../store';

interface UserNameState {
  name: string;
}

const initialState = { name: '' } as UserNameState;

export const username = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setUserName } = username.actions;
export default username.reducer;
export const useNameSelector = () => useTypedSelector((state) => state.name);
