const express = require('express')
const communityController = require('../controller/communityForum')

const router = express.Router();

router.get('/getAllQuestions', communityController.getAllQuestions);
router.post('/getAnswerById', communityController.getAnswerById);
router.post('/postQuestion', communityController.postQuestion);

exports.routes = router;
