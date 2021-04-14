var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bulletinboardController = require('./controllers/bulletinboard_controller');
var userController=require('./controllers/user_controller');
var app = express();

var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'log.txt' })
    ]
  });

// view engine setup
var port 	= process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bulletinboard', bulletinboardController);
app.use('/user', userController);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // console.log(err);
  logger.log('error', err);
  res.render('error');
});

app.listen(port, function() {
  // console.log('Listening on port ' + port);
  logger.log('info', 'Listening on port ' + port);
}).on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      //console.error(bind + ' requires elevated privileges');
      logger.log('error',bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      //console.error(bind + ' is already in use');
      logger.log('error',bind + ' is already in use');

      process.exit(1);
      break;
    default:
      throw error;
  }
}
module.exports = app;
