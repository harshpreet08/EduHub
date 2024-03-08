/* external */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { questionBank, answerBank } = require('./constant/index.js')

const app = express();
/* controller */
const mongoose = require('mongoose')
const paymentRouter = require('./routes/payment')
const communityRouter = require('./routes/communityForum')

const dbURL = process.env.DB_URL

mongoose.connect(dbURL).then(()=>{
  console.log("connected to db");
}).catch((e)=>{
  console.log("Error",e);
})

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