const { Comment } = require('../models/comments');

exports.getCommentByQid = async (req, res) => {
  try {
    const { qId: questionId = '' } = req.body;
    console.log({ questionId })
    const comment = await Comment.findOne({ qId: { $eq: questionId }});
    console.log({ comment })
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(404).json({ error: 'Parent comment not found' });
  }
} 


exports.updateComment = async (req, res) => {
  const { text, parentId, questionId } = req.body;

  try {
    const document = await Comment.findOne({ id: { $eq: questionId }});
    const { parentComment } = findParentCommentId(document, parentId);

    if (!parentComment._id) {
      return res.status(404).json({ error: 'Parent comment not found' });
    }

    const newComment = {
      _id: String(new Date().valueOf()),
      text: text,
      parentId: String(parentId),
      replies: [],
    };

    parentComment.replies.push(newComment);

    await Comment.findOneAndUpdate({ id: { $eq: questionId }}, document, { new: true });

    return res.status(201).json({ message: 'Reply added successfully' });
  } catch (error) {
    console.error('Error inserting reply:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findParentCommentId = (comment, commentId) => {
  let foundComment;

  const recurFindComment = (currComment, targetId) => {
    console.log({ currId: currComment._id, targetId });

    if (currComment._id.toString() === targetId.toString()) {
      foundComment = currComment;
      return;
    }

    for (const reply of currComment.replies) {
      recurFindComment(reply, commentId);
    }
  };

  recurFindComment(comment, commentId);
  return {
    parentComment: foundComment,
  };
};
