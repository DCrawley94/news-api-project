const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require('../controllers/articlesController');
const {
  postComment,
  getCommentsByArticleId,
} = require('../controllers/commentsController');
const { send405error } = require('../error_handlers/customErrors');

articlesRouter.route('/').get(getArticles).all(send405error);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .all(send405error);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getCommentsByArticleId)
  .all(send405error);

module.exports = articlesRouter;
