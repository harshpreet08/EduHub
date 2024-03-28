const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  // _id: String,
  // _id: mongoose.Types.ObjectId,
  text: String,
  parentId: {
    type: Schema.Types.Mixed,
    default: null,
    ref: 'Comment',
  },
  qId: String,
  replies: [Object],
});

exports.Comment = mongoose.model('Comment', CommentSchema, 'nestedComment');
