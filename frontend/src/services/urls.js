const baseURL = 'http://localhost:8000';

export const questionsService = {
  getAllQuestions: `${baseURL}/community/getAllQuestions`,
  getAnswerById: `${baseURL}/community/getAnswerById`,
  postQuestion: `${baseURL}/community/postQuestion`,
};
