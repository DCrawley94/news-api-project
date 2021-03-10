const express = require('express');
const apiRouter = require( './routes/apiRouter.js' );
const{customErrors} = require('./error_handlers/customErrors')
const { handle400s } = require('./error_handlers/handle400s');
const { handle500s } = require('./error_handlers/handle500s');


const app = express();

app.use('/api', apiRouter);
app.use(customErrors);
//app.use(handle400s);
app.use(handle500s);

module.exports = app;
