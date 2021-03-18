const connection = require('../db/connection');
const { fetchTopics } = require('../models/topicModels');

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
