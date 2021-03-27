const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');
const {
  reFormatTimeStamp,
  renameKeys,
  createRef,
  formatComments,
} = require('../utils/data-manipulation');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics').insert(topicData).returning('*');
    })
    .then(() => {
      return knex('users').insert(userData).returning('*');
    })
    .then(() => {
      const newArticleData = [...articleData].map((article) => {
        const newArticle = { ...article };
        newArticle.created_at = reFormatTimeStamp(newArticle.created_at);
        return newArticle;
      });

      return knex('articles').insert(newArticleData).returning('*');
    })
    .then((articleRows) => {
      const commentsRefObj = createRef(articleRows, 'title', 'article_id');

      let newCommentData = [...commentData].map((comment) => {
        const newComment = { ...comment };
        newComment.created_at = reFormatTimeStamp(newComment.created_at);
        return newComment;
      });
      newCommentData = renameKeys(newCommentData, 'created_by', 'author');

      const dbReadyComments = formatComments(
        newCommentData,
        commentsRefObj,
        'belongs_to',
        'article_id'
      );

      return knex('comments')
        .insert(dbReadyComments)
        .returning('*')
        .then((comments) => {});
    });
};

/*  

Given data:

body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
    belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
    created_by: 'tickle122',
    votes: -1,
    created_at: 1468087638932,
  
    


Transformed Data:
comment_id: Made for us
author: Format object func (new key = author, old key = created_by ----> delete old key)
article_id: create ref object then format object
votes:
created_at:  call reFormatTimeStampfunction on the number
body:
*/
