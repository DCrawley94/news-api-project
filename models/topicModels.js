const connection = require('../db/connection');

exports.fetchTopics = () => {
  return connection.select('*').from('topics');
};

exports.checkTopicExists = (topic) => {
  return connection
    .select('*')
    .from('topics')
    .where('slug', '=', topic)
    .then((topics) => {
      if (!topics.length) {
        return Promise.reject({ status: 404, msg: 'Topic Not Found' });
      }
    });
};
