import { createSlice } from '@reduxjs/toolkit';
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// import { getStorageData } from '../services/storage';
import { useTypedSelector } from '../store';

interface SearchTextState {
  text: string;
}

const initialState = { text: '' } as SearchTextState;

export const searchText = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_state: Draft<SearchTextState>) => {
      console.log(_state);
      return {
        ..._state,
      };
    });
  },
});

export const { setSearchText } = searchText.actions;
export default searchText.reducer;
export const useTextSelector = () => useTypedSelector((state) => state.searchText.text);
