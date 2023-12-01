import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '../store';

interface AvatarState {
  avatar: string;
}

const initialState = { avatar: '' } as AvatarState;

export const avatar = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
  },
});

export const { setAvatar } = avatar.actions;
export default avatar.reducer;
export const useNameSelector = () => useTypedSelector((state) => state.name);
