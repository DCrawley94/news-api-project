const usersRouter = require('express').Router();
const { getUserById } = require('../controllers/userControllers');

usersRouter.get('/:username', getUserById);

module.exports = usersRouter;
