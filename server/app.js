
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const passport = require('passport')
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// routes 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


var app = express();

// DB
const db = require('./config/keys').mongoURI
mongoose
    .connect(db, {useNewUrlParser:true})
    .then(() => console.log("Connected to Mongoose DB "))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// passport 
app.use(passport.initialize())
require('./config/passport')(passport)


module.exports = app;
