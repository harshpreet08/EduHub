const baseURL = 'http://localhost:8000';

export const questionsService = {
  getAllQuestions: `${baseURL}/community/getAllQuestions`,
  getAnswerById: `${baseURL}/community/getAnswerById`,
  postAllQuestions: `${baseURL}/community/postAllQuestions`,
};
