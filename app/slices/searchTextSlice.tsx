import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setSearchText } = searchText.actions;
export default searchText.reducer;
export const useTextSelector = () => useTypedSelector((state) => state.searchText.text);
