import { configureStore } from '@reduxjs/toolkit';
import qnaPageReducer from './Components/organisms/qnaPage/reducer/qnaPage.reducer';
import questionsDisplayReducer from './Components/molecules/questions/slice/questionSlice';
import modalDisplayReducer from './Components/molecules/modalWrapper/slice/modalSlice';

const store = configureStore({
  reducer: {
    qnaPageReducer,
    questionsDisplay: questionsDisplayReducer,
    modalReducer: modalDisplayReducer,
  },
});

export default store;
