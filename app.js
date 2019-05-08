var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var log = require('morgan');
const config = require('config');
const Acl = require('acl');

const db = require('./db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const logger = require('./logger');

var app = express();
console.log(0);

(async () => {
  try {
    // 连接数据库
    let dbInstance = await db.connect(config.get('Customer.db'));
    console.log(1);
    // 权限控制
    const acl = new Acl(new Acl.mongodbBackend(dbInstance, config.get('Customer.aclPrefix')));
  } catch (error) {
    console.log('连接数据库失败，将退出程序')
    process.exit(0);
  }
  
  console.log(2);
  logger.emerg('emerg');
  logger.warning('warning');
  logger.error('error');

})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(log('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
