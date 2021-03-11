const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById,
} = require('../controllers/articlesController');

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .all(() => {
    Promise.reject({ status: 405, msg: 'Method Not Allowed' });
  });

module.exports = articlesRouter;
