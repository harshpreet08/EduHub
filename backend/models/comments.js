const mongoose = require('mongoose');
const { Schema } = mongoose;

// const replySchema = new Schema({
//   userName: {
//     type: String,
//     required: true
//   },
//   reply: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   parentComment: {
//     type: Schema.Types.ObjectId,
//     ref: 'Comment'
//   }
// });

// const commentSchema = new Schema ({
//   userName: {
//     type: String,
//     required: true
//   },
//   comment: {
//     type: String,
//     required: true
//   },
//   questionId: {
//     type: Schema.Types.ObjectId,  
//     ref: 'Question',               
//     required: true
//   },
//   timeStamp: {
//     type: Number,
//     default: Date.now
//   },
//   replies: [replySchema]
// });

// const Comment = mongoose.model('Comment', commentSchema);
// // const Reply = mongoose.model('Reply', replySchema);

// module.exports = { Comment };


// const commentSchema = new Schema({
//   _id: {
//     type: Schema.Types.Mixed,
//   },
//   text: {
//     type: String,
//     // required: true,
//   },
//   parentId: {
//     type: Schema.Types.Mixed,
//     // required: true,
//   },
//   replies: [Object]
// });

// exports.nestedCommentSchema = mongoose.model('nestedCommentSchema', commentSchema, 'nestedComment');

const CommentSchema = new Schema({
  _id: String,
  text: String,
  parentId: { type: Schema.Types.Mixed, default: null, ref: 'Comment' },
  replies: [Object] 
});

exports.Comment = mongoose.model('Comment', CommentSchema, 'nestedComment');
