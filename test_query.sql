\c nc_news_test;


SELECT * from articles;
SELECT * from topics;

-- SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes,    
-- COUNT (comments.comment_id) AS comment_count
-- FROM articles
-- LEFT JOIN comments ON
-- articles.article_id = comments.article_id
-- GROUP BY articles.article_id
-- ;
