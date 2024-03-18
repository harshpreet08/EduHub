import { http } from '../../../../../services/http';
import { questionsService } from '../../../../../services/urls';

export const postComment = (qid, payload) => http.post(questionsService.postComment.replace(':id', qid), payload);
