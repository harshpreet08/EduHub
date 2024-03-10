import { configureStore } from '@reduxjs/toolkit';
import answerReducer from './Components/organisms/qnaPage/sections/comment/slice/questionAnswerSlice';
import questionsDisplayReducer from './Components/molecules/questions/slice/questionSlice';
import modalDisplayReducer from './Components/molecules/modalWrapper/slice/modalSlice';

const store = configureStore({
  reducer: {
    answerReducer,
    questionsDisplay: questionsDisplayReducer,
    modalReducer: modalDisplayReducer,
  },
});

export default store;
