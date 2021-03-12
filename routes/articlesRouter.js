const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById,
} = require('../controllers/articlesController');
const { postComment } = require('../controllers/commentsController');
const { send405error } = require('../error_handlers/customErrors');

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .all(send405error);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .all(send405error);

module.exports = articlesRouter;
