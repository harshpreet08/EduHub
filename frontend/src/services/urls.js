const baseURL = 'http://localhost:8000';

export const questionsService = {
  getAllQuestions: `${baseURL}/community/getAllQuestions`,
  getQuestionById: `${baseURL}/community/getQuestionById`,
  postQuestion: `${baseURL}/community/postQuestion`,
};
