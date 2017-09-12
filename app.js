var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var nunjucks = require('nunjucks');
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var multer = require('multer');
var flash = require('connect-flash');

var index = require('./routes/index');
var posts = require('./routes/posts');

var app = express();

// global variables
app.locals.moment = require('moment');

// view engine setup
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

// multer for file uploads
//app.use(multer({ dest: './public/images/uploads' }));
var upload = multer({ dest: './public/images/uploads/' })

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// logger
app.use(logger('dev'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// express sessions
app.use(session({
  secret: '11r4nD0M8211',
  saveUninitialized: true,
  resave: true
}));

// express validator
// ---------

// static files
app.use(express.static(path.join(__dirname, 'public')));

// flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// make database accessible to all routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// register routes
app.use('/', index);
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
