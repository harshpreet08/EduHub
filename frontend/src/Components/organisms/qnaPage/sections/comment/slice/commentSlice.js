import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answerData: null,
};

export const commentSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setAnswerData: (state, action) => ({
      ...state,
      answerData: action.payload,
    }),
  },
});

export const { setAnswerData } = commentSlice.actions;
export default commentSlice.reducer;
