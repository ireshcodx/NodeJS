const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

//! Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

//! Create logger instance
const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({ filename: 'logs/log.log' })
  ],
});

module.exports = { logger };