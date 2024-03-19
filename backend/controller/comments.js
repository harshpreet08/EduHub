// const { Comment } = require('../models/comments');
const mongoose = require('mongoose');
const { Comment } = require('../models/comments');

exports.postComment = async (req, res) => {
  const { id } = req.params;
  const { userName, comment } = req.body;

  try {
    const newComment = await Comment.create({
      userName,
      comment,
      questionId: id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.postReply = async (req, res) => {
  const { commentId: parentId } = req.params;
  const { userName, reply } = req.body;

  try {
    const parent = await Comment.findById(parentId);

    console.log({ parent, parentId, params: req.params });

    if (!parent) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Add the reply to the comment's replies array
    parent.replies.push({
      userName,
      reply,
      createdAt: new Date(),
      replies: [],
    });

    await parent.save();

    res.status(201).json(parent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { text, parentId, questionId } = req.body;

  try {
    const document = await Comment.findById(questionId);
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

    await Comment.findByIdAndUpdate(questionId, document, { new: true });

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
