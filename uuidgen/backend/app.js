var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
const rateLimit = require('express-rate-limit');

var ApiRouter = require('./routes/api');

var app = express();
app.enable('trust proxy');
app.use(helmet());
app.use(cors());
app.use(logger('dev'));

const limiter = rateLimit({
  max: 6, // limit each IP to 100 requests per minute.
});
app.use(limiter);

app.use('/api', ApiRouter);

module.exports = app;
