const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema ({
  userName: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,  
    ref: 'Question',               
    required: true
  },
  replies: [{
    userName:{
      type: String,
      required:true
    },
    commentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    
  }]
})

exports.comments = mongoose.model('comments', commentSchema,)