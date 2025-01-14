var createError = require('http-errors');
var express = require('express');
const { expressjwt } = require('express-jwt')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var {sqCtrl} = require('./sql/index');
const { secretKey } = require('./constants');
const { test } = require('./service');

sqCtrl.check();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressjwt({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({
  path: ['/login']
}))


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin",req.headers.origin || '*');
   //允许的header类型
  res.header("Access-Control-Allow-Headers","Content-Type,Authorization,X-Requested-With"); //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");// 可以带cookies
  res.header("Access-Control-Allow-Credentials",1);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token')
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token')
  }
})

module.exports = app;
