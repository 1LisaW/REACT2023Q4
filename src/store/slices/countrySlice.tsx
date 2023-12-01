import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { getStorageData } from '../services/storage';
import { useTypedSelector } from '../store';
import { countriesList } from '../../constants';

interface CountryState {
  country: string | undefined;
  countriesList: typeof countriesList;
}

const initialState = { country: undefined, countriesList } as CountryState;

export const country = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
  },
});

export const { setCountry } = country.actions;
export default country.reducer;
export const useNameSelector = () => useTypedSelector((state) => state.name);
