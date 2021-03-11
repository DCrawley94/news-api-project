const connection = require('../db/connection');

exports.fetchArticleById = (article_id) => {
  //console.log(typeof article_id, '<--- ID');
  return connection
    .select('articles.*') //select all from articles
    .from('articles')
    .count({ comment_count: 'comments.article_id' }) //count comments per article
    .leftJoin('comments', 'articles.article_id', 'comments.article_id') //left join to get required db data
    .groupBy('articles.article_id')
    .where('articles.article_id', Number(article_id));
};
