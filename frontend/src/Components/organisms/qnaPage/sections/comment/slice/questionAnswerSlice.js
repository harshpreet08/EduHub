import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answerData: null,
  commentFocused: false,
};

export const questionAnswerSlice = createSlice({
  name: 'answerReducer',
  initialState,
  reducers: {
    setAnswerData: (state, action) => ({
      ...state,
      answerData: action.payload,
    }),
    setComment: (state, action) => ({
      ...state,
      commentFocused: action.payload,
    }),
  },
});

export const { setAnswerData, setComment } = questionAnswerSlice.actions;
export default questionAnswerSlice.reducer;
