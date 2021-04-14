var winston = require('winston');

var logLevel = process.env.DEBUG=='1' ?'debug':'info';
var customColors = {
  trace: 'white',
  debug: 'green',
  info: 'blue',
  warn: 'yellow',
  crit: 'red',
  fatal: 'red'
}
var logger = new (winston.Logger)({
  colors: customColors,
  level: logLevel,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  transports: [
  new (winston.transports.Console)({
    colorize: true,
    timestamp: true
  }),
    new (winston.transports.File)({ filename: 'log.txt' })
  ]
});
module.exports = logger;