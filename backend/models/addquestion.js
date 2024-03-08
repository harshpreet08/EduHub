const mongoose = require('mongoose');
const { Schema } = mongoose;

const addQuestionSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  dateAndTime:{
    type: String,
    required: true
  }
})

exports.PostQuestion = mongoose.model('PostQuestion',addQuestionSchema)