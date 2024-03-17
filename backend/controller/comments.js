const { comments } = require('../models/comments');

exports.postComment = async(req, res) => {
  const { id } = req.params; 
  const { userName, comment } = req.body;
  
  try {
    const newComment = await comments.create({
      userName,
      comment,
      questionId: id  
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.postReply = async (req, res) => {
  const { commentId } = req.params;
  const { userName, reply } = req.body;

  try {
    const comment = await comments.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Add the reply to the comment's replies array
    comment.replies.push({
      commentId,
      userName,
      reply,
      createdAt: new Date()
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};