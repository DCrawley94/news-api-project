const usersRouter = require('express').Router();
const { getUserById } = require('../controllers/userControllers');
const { send405error } = require('../error_handlers/customErrors');

usersRouter.route('/:username').get(getUserById).all(send405error);

module.exports = usersRouter;
