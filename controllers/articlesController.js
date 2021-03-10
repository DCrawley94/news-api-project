const { fetchArticleById } = require('../models/articlesModels');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((data) => {
      article = data[0];
      res.status(200).send({ article });
    })
    .catch(next);
};
