const baseURL = 'http://localhost:7000';

const questionUrl = `${baseURL}/community`;
const commentUrl = `${baseURL}/comments`;

export const questionsService = {
  getAllQuestions: `${questionUrl}/getAllQuestions`,
  getQuestionById: `${questionUrl}/getQuestionById`,
  postQuestion: `${questionUrl}/postQuestion`,
};

export const commentService = {
  getCommentsByQid: commentUrl,
  postReplyToComment: `${commentUrl}/replyToComment`,
};
