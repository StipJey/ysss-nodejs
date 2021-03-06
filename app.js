var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql      = require('mysql');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

db = mysql.createConnection({
  host     : 'localhost',
  user     : 'ysss.ru',
  password : 'ysssysss',
  database : 'ysss.ru'
});
db.connect();

/**
* Random words generator
*/
randWD = function(n){  // [ 3 ] random words and digits by the wocabulary
  var s ='', abd ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', aL = abd.length;
  while(s.length < n)
    s += abd[Math.random() * aL|0];
  return s;
};

//get data from database
db_get = function(param, value, callback){
  db.query('SELECT * FROM url where '+param+' = "'+value+'"',function(err, rows){
      callback(rows);
  });
};

//return (err?false:true);
db_set = function(data, short){
  db.query('INSERT INTO url (url, short) Values ("'+url+'", "'+short+'")', function(err, rows){
    console.log(err);
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
