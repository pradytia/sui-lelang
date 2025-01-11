import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  id:string
  userName: string;
  email: string;
  role: string;
}

const initialState: ProfileState = {
  id:'',
  userName: '',
  email: '',
  role: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<ProfileState>>) {
      Object.assign(state, action.payload);
    },
    resetProfile() {
      return initialState;
    },
  },
});

export const { updateProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
