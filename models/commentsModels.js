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
