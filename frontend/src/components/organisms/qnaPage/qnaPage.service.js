import { questionsService } from '../../../services/urls';
import { http } from '../../../services/http';

export const getAnswerById = payload => (
  http.post(questionsService.getAnswerById, payload)
);
