import { createSlice } from '@reduxjs/toolkit';
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '../store';

export interface LoadingState {
  loadingCards: boolean;
  loadingDetails: boolean;
}

const initialState = { loadingCards: false, loadingDetails: false } as LoadingState;
import { HYDRATE } from 'next-redux-wrapper';

export const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    toggleLoadingCards(state, action: PayloadAction<boolean>) {
      state.loadingCards = action.payload;
    },
    toggleLoadingDetails(state, action: PayloadAction<boolean>) {
      state.loadingDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_state: Draft<LoadingState>) => {
      return { ..._state };
    });
  },
});

export const { toggleLoadingCards, toggleLoadingDetails } = loading.actions;
export default loading.reducer;
export const useLoadingSelector = () => useTypedSelector((state) => state.loadings);
