import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answerData: null,
  comments: [],
  commentText: '',
};

export const questionAnswerSlice = createSlice({
  name: 'answerReducer',
  initialState,
  reducers: {
    setAnswerData: (state, action) => ({
      ...state,
      answerData: action.payload,
    }),
    setCommentText: (state, action) => ({
      ...state,
      commentText: action.payload,
    }),
    setComments: (state, action) => ({
      ...state,
      comments: [...state.comments, action.payload],

    }),
  },
});

export const { setAnswerData, setCommentText, setComments } = questionAnswerSlice.actions;
export default questionAnswerSlice.reducer;
