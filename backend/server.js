/* external */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
/* controller */
const mongoose = require('mongoose')
const paymentRouter = require('./routes/payment')
const communityRouter = require('./routes/communityForum')

const dbURL = process.env.DB_URL

mongoose.connect(dbURL).then(() => {
  console.log('connected to db');
}).catch((e) => {
  console.log('Error', e);
})

app.use(cors());
app.use(express.json());

app.use('/api', paymentRouter.routes)
app.use('/community', communityRouter.routes)


app.listen(8000, () => {
  console.log('server started')
})