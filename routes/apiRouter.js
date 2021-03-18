const apiRouter = require('express').Router();

const topicsRouter = require('./topicsRouter.js');
const usersRouter = require('./usersRouter.js');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const { getEndpoints } = require('../controllers/apiController');
const { send405error } = require('../error_handlers/customErrors.js');

apiRouter.route('/').get(getEndpoints).all(send405error);

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
