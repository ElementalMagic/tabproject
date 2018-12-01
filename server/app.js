var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var compression = require('compression');
var linksRouter = require('./routes/linksRoute');
const mongoose = require('mongoose');

var app = express();


mongoose
    .connect('mongodb://localhost:27017')
    .then(() => console.log("MongoDB connected."))
    .catch(error => console.log(error));

app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/dist/notebookFactory/')));


app.use('/api/links', linksRouter);

module.exports = app;
