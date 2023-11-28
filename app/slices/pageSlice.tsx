import { createSlice } from '@reduxjs/toolkit';
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
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
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_state: Draft<PageState>) => {
      return {
        ..._state,
      };
    });
  },
});

export const { increment, decrement, setFromQueryParams } = page.actions;
export default page.reducer;
export const usePageSelector = () => useTypedSelector((state) => state.page.page);
