const commentsRouter = require('express').Router();
const {
  patchCommentByCommentId,
  deleteCommentById,
} = require('../controllers/commentsController');
const { send405error } = require('../error_handlers/customErrors');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentByCommentId)
  .delete(deleteCommentById)
  .all(send405error);

module.exports = commentsRouter;
