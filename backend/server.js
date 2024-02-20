const express = require('express');
const cors = require('cors');

const { questionBank, answerBank } = require('./constant/index.js')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/getAllQuestions', (_, resp) => {
  resp.send(questionBank)
});

app.post('/getAnswerById', (req, resp) => {
  const { qid } = req.body;
  resp.send(answerBank[qid]);
  resp.end()
});

app.listen(8000, () => {
  console.log('server started')
})