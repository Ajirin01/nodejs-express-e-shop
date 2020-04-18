var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var passport = require('passport');
require('./passport')(passport);

var mongoose = require('mongoose');
var con = mongoose.connect('mongodb://127.0.0.1:27017/express-eShop',{
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
if(con){
  console.log('connected...');
  var text = "olagoke";
  var hash = bcrypt.hashSync(text, bcrypt.genSaltSync(10));
  console.log(hash);
}
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')(passport);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: "9oitro68utyfg;hpoy;89i7yf",
  saveUninitialized: false,
  resave: false
}))

app.use(passport.initialize());
app.use(passport.session())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);







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
