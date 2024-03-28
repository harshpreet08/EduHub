import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    firstName: null, 
    lastName: null,
    email: null,
    role: null
  };

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
