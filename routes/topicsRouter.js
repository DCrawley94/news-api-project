const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/topicsController');
const { send405error } = require('../error_handlers/customErrors');

topicsRouter.route('/').get(getTopics).all(send405error);

module.exports = topicsRouter;
