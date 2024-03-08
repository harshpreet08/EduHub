import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './Components/organisms/qnaPage/sections/question/slice/questionSlice';
import commentReducer from './Components/organisms/qnaPage/sections/comment/slice/commentSlice';
import questionsDisplayReducer from './Components/molecules/questions/slice/questionSlice';

const store = configureStore({
  reducer: {
    question: questionReducer,
    comments: commentReducer,
    questionsDisplay: questionsDisplayReducer,
  },
});

export default store;
