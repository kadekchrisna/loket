require('dotenv').config();
const winston = require('winston');
const expressWinston = require('express-winston');

exports.requestLog = expressWinston.logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './log/loket-app-backend.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console()
  ],
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  ignoreRoute: function (req, res) {
    return false;
  }
});