const connection = require('../db/connection');

exports.addComment = (article_id, username, body) => {
  return connection
    .insert({ author: username, article_id: article_id, body: body })
    .into('comments')
    .returning('*')
    .then((commentRows) => {
      return commentRows[0];
    });
};

exports.fetchCommentsByArticleId = (article_id, sort_by, order) => {
  return connection
    .select('*')
    .from('comments')
    .where({ article_id: article_id })
    .orderBy(sort_by || 'created_at', order ||'desc');
};
