import { createSlice } from '@reduxjs/toolkit';
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

interface PageSizeState {
  pageSize: number;
}

const initialState = { pageSize: 3 } as PageSizeState;

export const pageSize = createSlice({
  name: 'pageSize',
  initialState,
  reducers: {
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_state: Draft<PageSizeState>) => {
      return {
        ..._state,
      };
    });
  },
});

export const { setPageSize } = pageSize.actions;
export default pageSize.reducer;
export const usePageSizeSelector = () =>
  useTypedSelector((state) => state.pageSize.pageSize);
