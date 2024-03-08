import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionData: null,
  isModalVisible: false,
  title: null,
  description: null,
};

export const questionsDisplaySlice = createSlice({
  name: 'questionsDisplay',
  initialState,
  reducers: {
    setquestionData: (state, action) => ({
      ...state,
      questionData: action.payload,
    }),
    setModalVisible: (state, action) => ({
      ...state,
      isModalVisible: action.payload,
    }),
    setTitle: (state, action) => ({
      ...state,
      title: action.payload,
    }),
    setDescription: (state, action) => ({
      ...state,
      description: action.payload,
    }),
  },
});

export const {
  setquestionData, setModalVisible, setTitle, setDescription,
} = questionsDisplaySlice.actions;
export default questionsDisplaySlice.reducer;
