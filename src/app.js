const express = require('express');
const firstRouter = require('./routers/firstRouter');

const app = express();

// This will allow data to be parsed by json parser.
app.use(express.json());
app.use(firstRouter);

module.exports = app;
