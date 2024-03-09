/* constants */
const { questionBank, answerBank } = require('../constant/index');
/* models */
const { postQuestion } = require('../models/addquestion');

exports.getAllQuestions = (_, resp) => {
  resp.send(questionBank)
}

exports.getAnswerById = (req, resp) => {
  const { qid } = req.body;
  resp.send(answerBank[qid]);
  resp.end()
};

exports.postQuestion = (req, resp) => {
  const question = new postQuestion(req.body);
  question.save()
    .then(document => {
      resp.status(200).json(document)
    })
    .catch(err => {
      resp.status(400).json(err);
    });
};