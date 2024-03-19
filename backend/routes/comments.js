const express = require('express');
const router = express.Router();

const commentController = require('../controller/comments');

router.post('/questions/:id/comments', commentController.postComment);
router.post('/comments/:commentId/replies', commentController.postReply)
router.post('/comments/new', commentController.updateComment)
exports.routes = router;