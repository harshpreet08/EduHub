import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allComments: [],
  commentText: '',
};

const comments = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    setAllComments: (state, action) => ({
      ...state,
      allComments: action.payload,
    }),
    setCommentText: (state, action) => ({
      ...state,
      commentText: action.payload,
    }),
  },
});

export const { setAllComments, setCommentText } = comments.actions;
export default comments.reducer;
