const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.getQuestions);
//router.get('/mcq/allQuestions/:id', questionController.showAllQuestionsWithOptions);
router.get('/showquestions/:submission_id', questionController.showQuestions);
router.get('/showallquestions', questionController.showAllQuestions);
router.delete('/deletequestions/:submission_id', questionController.deleteQuestionsBySubmissionId);
router.delete("/deletewholequestions/:questionId", questionController.deleteQuestion);

module.exports = router;