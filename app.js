
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const publicDirectory = path.join(__dirname, './assets');
app.use(express.static(publicDirectory));

var indexRouter = require('./routes/chat-route');
app.use('/', indexRouter);

module.exports = app;