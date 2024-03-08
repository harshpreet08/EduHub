import { questionsService } from '../../../services/urls';
import { http } from '../../../services/http';

export const getAllQuestions = () => http.get(questionsService.getAllQuestions);
export const getAllAnswers = () => http.get(questionsService.getAllAnswers);
export const postAllQuestions = payload => http.post(questionsService.postAllQuestions, payload);
