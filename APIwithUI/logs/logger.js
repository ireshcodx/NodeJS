const { createLogger, format, transports } = require('winston');
const path = require('path');

const createCustomLogger = (filename) => {
    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp(),
            format.printf(
                ({ timestamp, level, message }) =>
                    `${timestamp} [${path.basename(filename)}] ${level}: ${message}`
            )
        ),
        transports: [
            // new transports.Console(),
            new transports.File({ filename: 'logs.log' }),
        ],
    });
};

module.exports = createCustomLogger;
