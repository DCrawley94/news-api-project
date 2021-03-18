const commentsRouter = require('express').Router();
const {
  patchCommentByCommentId,
} = require('../controllers/commentsController');
const { send405error } = require('../error_handlers/customErrors');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentByCommentId)
  .all(send405error);

module.exports = commentsRouter;
