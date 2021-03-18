const {
  fetchArticleById,
  changeArticleVotes,
  fetchArticles,
} = require('../models/articlesModels');
const { checkUserExists } = require('../models/userModels');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  changeArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { author } = req.query;
  const { topic } = req.query;
  if (!author) {
    fetchArticles(sort_by, order, author, topic)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else {
    Promise.all([
      fetchArticles(sort_by, order, author, topic),
      checkUserExists(author),
    ])
      .then(([articles]) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  }
};
