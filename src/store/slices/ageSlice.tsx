import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '../store';

interface AgeState {
  age: number | undefined;
}

const initialState = { age: undefined } as AgeState;

export const age = createSlice({
  name: 'age',
  initialState,
  reducers: {
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
  },
});

export const { setAge } = age.actions;
export default age.reducer;
export const useNameSelector = () => useTypedSelector((state) => state.name);
