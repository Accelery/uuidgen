('use strict');
const uuidFn = require('uuid/v4');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const apiHandler = require('./_apiHandler');

app.get('/', (res, req) => {
  let number = req.query.number;
  let result = apiHandler(uuidFn, number);
  res.json(result);
});

module.exports.handler = serverless(app);
