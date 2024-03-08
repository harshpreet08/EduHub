const { questionBank, answerBank } = require('../constant/index')

exports.getAllQuestions= (_, resp) => {
  resp.send(questionBank)
}

exports.getAnswerById=(req, resp) => {
  const { qid } = req.body;
  resp.send(answerBank[qid]);
  resp.end()
};