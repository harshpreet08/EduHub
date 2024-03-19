/* models */
const {questionBank} = require('../models/questionBank');
 
exports.getAllQuestions = async (_, resp) => {
  const allQuestions = await questionBank.find();
  resp.send(allQuestions || [])
}
 
exports.getQuestionById = async (req, resp) => {
  const { qId } = req.body;
  const answer = await questionBank.findById(qId);
  resp.status(200).json(answer);
  resp.end()
};
 
exports.postQuestion = (req, resp) => {
  const question = new questionBank(req.body);
  question.save()
    .then(document => {
      resp.status(200).json(document)
    })
    .catch(err => {
      resp.status(400).json(err);
    });
};