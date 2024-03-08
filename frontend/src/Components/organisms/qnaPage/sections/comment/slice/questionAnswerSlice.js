import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answerData: null,
};

export const questionAnswerSlice = createSlice({
  name: 'questionAnswer',
  initialState,
  reducers: {
    setAnswerData: (state, action) => ({
      ...state,
      answerData: action.payload,
    }),
  },
});

export const { setAnswerData } = questionAnswerSlice.actions;
export default questionAnswerSlice.reducer;
