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
    .orderBy(sort_by || 'created_at', order || 'desc');
};

exports.changeCommentVotes = (comment_id, inc_votes) => {
  if (!inc_votes) return Promise.reject({ status: 400, msg: 'Bad Request' });

  return connection('comments')
    .where('comments.comment_id', '=', Number(comment_id))
    .increment('votes', inc_votes)
    .returning('*')
    .then((comment) => {
      if (comment.length) return comment;
      else {
        return Promise.reject({ status: 404, msg: 'Comment not found' });
      }
    });
};
