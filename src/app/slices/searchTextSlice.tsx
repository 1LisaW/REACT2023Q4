import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getStorageData } from '../../store/storage';
import { useTypedSelector } from '../store';

interface SearchTextState {
  text: string;
}

const initialState = { text: getStorageData() || '' } as SearchTextState;

export const searchText = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export const { setSearchText } = searchText.actions;
export default searchText.reducer;
export const useTextSelector = () => useTypedSelector((state) => state.searchText.text);
