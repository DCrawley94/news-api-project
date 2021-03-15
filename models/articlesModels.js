const connection = require('../db/connection');

exports.fetchArticleById = (article_id) => {
  return connection
    .select(
      'articles.article_id',
      'articles.title',
      'articles.body',
      'articles.votes',
      'articles.topic',
      'articles.author',
      'articles.created_at'
    ) //select all from articles
    .count({ comment_count: 'comments.article_id' }) //count comments per article
    .leftJoin('comments', 'articles.article_id', 'comments.article_id') //left join to get required db data
    .groupBy('articles.article_id')
    .where('articles.article_id', Number(article_id))
    .then((articleRows) => {
      if (articleRows.length > 0) return articleRows[0];
      else return Promise.reject({ status: 404, msg: 'Article not found' });
    });
};

exports.changeArticleVotes = (article_id, inc_votes) => {
  if (!inc_votes) return Promise.reject({ status: 400, msg: 'Bad Request' });

  return connection('articles')
    .where('articles.article_id', '=', Number(article_id))
    .increment('votes', inc_votes)
    .returning('*')
    .then((articleRows) => {
      if (articleRows.length) return articleRows[0];
      else {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
    });
};

exports.checkArticleExists = (article_id) => {
  return connection('articles')
    .select('*')
    .where({ article_id })
    .then(([article]) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, msg: 'Article Not Found' });
      }
    });
};

exports.fetchArticles = () => {
  return connection('articles')
    .select(
      'articles.article_id',
      'articles.title',
      'articles.body',
      'articles.votes',
      'articles.topic',
      'articles.author',
      'articles.created_at'
    )
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id');
};
