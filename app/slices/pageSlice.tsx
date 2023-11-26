import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '../store';

interface PageState {
  page: number;
}

const initialState = { page: 1 } as PageState;

export const page = createSlice({
  name: 'page',
  initialState,
  reducers: {
    increment(state) {
      state.page++;
    },
    decrement(state) {
      if (state.page > 1) state.page--;
    },
    setFromQueryParams(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { increment, decrement, setFromQueryParams } = page.actions;
export default page.reducer;
export const usePageSelector = () => useTypedSelector((state) => state.page.page);
