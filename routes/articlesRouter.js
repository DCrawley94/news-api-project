const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById,
} = require('../controllers/articlesController');
const { postComment } = require('../controllers/commentsController');

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .all(() => {
    Promise.reject({ status: 405, msg: 'Method Not Allowed' });
  });

articlesRouter.route('/:article_id/comments').post(postComment);

module.exports = articlesRouter;
