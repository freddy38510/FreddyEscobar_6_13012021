const express = require('express');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
module.exports = app;
