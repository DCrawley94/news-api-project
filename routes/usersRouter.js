const usersRouter = require('express').Router();
const { getUserById } = require('../controllers/userControllers');

usersRouter
  .route('/:username')
  .get(getUserById)
  .delete(() => {
    return Promise.reject({ status: 405, msg: 'Method Not Allowed' });
  });

module.exports = usersRouter;
