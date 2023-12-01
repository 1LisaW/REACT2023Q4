import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { getStorageData } from '../services/storage';
import { useTypedSelector } from '../store';
import { genderList } from '../../constants';

interface GenderState {
  gender: string | undefined;
  genderList: typeof genderList;
}

const initialState = { gender: undefined, genderList: genderList } as GenderState;

export const gender = createSlice({
  name: 'gender',
  initialState,
  reducers: {
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
  },
});

export const { setGender } = gender.actions;
export default gender.reducer;
export const useGenderSelector = () => useTypedSelector((state) => state.name);
