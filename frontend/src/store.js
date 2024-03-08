import { configureStore } from '@reduxjs/toolkit';
import questionAnswerReducer from './Components/organisms/qnaPage/sections/comment/slice/questionAnswerSlice';
// import commentReducer from './Components/organisms/qnaPage/sections/comment/slice/questionAnswerSlice';
import questionsDisplayReducer from './Components/molecules/questions/slice/questionSlice';

const store = configureStore({
  reducer: {
    questionAnswer: questionAnswerReducer,
    // comments: commentReducer,
    questionsDisplay: questionsDisplayReducer,
  },
});

export default store;
