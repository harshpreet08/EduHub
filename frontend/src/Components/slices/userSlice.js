import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  role: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      const { firstName = '', lastName = '', ...rest } = payload;
      const userFullName = `${firstName} ${lastName}`;
      return {
        ...state,
        ...rest,
        firstName,
        lastName,
        userFullName,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
