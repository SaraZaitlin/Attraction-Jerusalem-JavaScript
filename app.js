var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');

var indexRouter = require('./routes/index');
var attraction1 = require('./routes/Attraction.js');
var buildDataBase=require('./routes/buildDataBase.js');
var buildMuseums=require('./routes/buildMuseums.js')
var getAttraction=require('./routes/getAttraction.js');
var getRevwies=require('./routes/getRevwies.js');
var login=require('./routes/login.js');
var location=require('./routes/location.js');

var getLoad=require('./routes/load.js');
 let session =require('express-session');

var app = express();
var cookieParser =require('cookie-parser');
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"somesecretkey",
  resave: false, // Force save of session for each request
  saveUninitialized: false, // Save a session that is new, but has not been modified
  cookie: {maxAge: 10*60*1000 } // milliseconds!
}));

// I used the standard nodejs-express template and
// plugged my code (I deleted the /users route of the template)
app.use('/', indexRouter); // localhost:3000/abc/compute
app.use('/attraction',attraction1);
app.use('/buildDataBase',buildDataBase);
app.use('/buildMuseums',buildMuseums)
app.use('/getAttraction',getAttraction);
app.use('/getRevwies',getRevwies);
app.use('/login',login);
app.use('/load',getLoad);
app.use('/location',location);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
