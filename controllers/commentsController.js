const {
  addComment,
  fetchCommentsByArticleId,
} = require('../models/commentsModels');

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;
  addComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;
  const { order } = req.query;
  

  fetchCommentsByArticleId(article_id, sort_by, order).then((comments) => {
    res.status(200).send({ comments });
  });
};
