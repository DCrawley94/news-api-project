const connection = require('../db/connection');

exports.fetchArticleById = (article_id) => {
  //console.log(typeof article_id, '<--- ID');
  return connection
    .select('*')
    .from('articles')
    .where('article_id', Number(article_id));
};
