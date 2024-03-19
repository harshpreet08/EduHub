import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comment: [],
  newCommentText: '',
};

const comments = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    setComment: (state, action) => ({
      ...state,
      comment: action.payload,
    }),
    setNewCommentText: (state, action) => ({
      ...state,
      newCommentText: action.payload,
    }),
  },
});

export const { setComment, setNewCommentText } = comments.actions;
export default comments.reducer;
