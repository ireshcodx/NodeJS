// logger.js
const path = require('path');
const winston = require('winston');

const fileName = path.basename(__filename);

const myDir = '../Middleware/Logs/';
const logsFilePath = path.join(myDir, 'validationLogs.log');

//! Configuring winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm' }),
        winston.format.printf(({ level, message, timestamp }) => {
            return `pId:- 213145 [${timestamp}] [File:${fileName}] ${level.toUpperCase()} ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: logsFilePath })
    ]
});

module.exports = logger;