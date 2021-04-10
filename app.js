var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var consoleTypeRouter = require('./routes/consoleType');
var consoleProductRouter = require('./routes/consoleProduct');
var adminRouter = require('./routes/admin');
var userRegisterRouter = require('./routes/userRegister');
var gameRouter = require('./routes/game');
var accessoriesListRouter = require('./routes/accessories')
var apiRouter = require('./routes/apii')
var addressRouter = require('./routes/address')
var inventoryRouter = require('./routes/inventory')
var excelRouter = require('./routes/excel')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/consoletype', consoleTypeRouter);
app.use('/consoleproduct', consoleProductRouter);
app.use('/admin', adminRouter);
app.use('/userRegister', userRegisterRouter);
app.use('/game', gameRouter);
app.use('/accessories', accessoriesListRouter);
app.use('/api', apiRouter);
app.use('/address', addressRouter)
app.use('/inventory', inventoryRouter)
app.use('/excel', excelRouter)
// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;