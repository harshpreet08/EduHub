/* external */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = 8000;

const app = express();
/* controller */
const mongoose = require('mongoose')
const paymentRouter = require('./routes/payment')
const communityRouter = require('./routes/communityForum')
const blogRouter = require('./routes/blog');

const dbURL = process.env.DB_URL

mongoose.connect(dbURL).then(() => {
  console.log('connected to db');
}).catch((e) => {
  console.log('Error', e);
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', paymentRouter.routes)
app.use('/community', communityRouter.routes)
app.use('/api/blog', blogRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});