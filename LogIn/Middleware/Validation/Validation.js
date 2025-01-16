const userSchema = require('./Schema');
const path = require('path');
const log4Js = require('log4js');

const fileName = path.basename(__filename);

const myDir = '../Middleware/Logs/';                                    //todo path for logs
const logsFilePath = path.join(myDir, 'validationLogs.log');


//todo initiating/configuring log4js
log4Js.configure({
    appenders: {
        file: {                                                          //! Log to a file
            type: 'file', 
            filename: logsFilePath,
            layout: {      
                type: "pattern",                                                               //? Using pattern layout for logs
                pattern: 'pId:- %z [%d{yyyy-MM-dd hh:mm}] [File:%X{fileName}] %p %m'           //? custmizing log format
            }
        },
        // console: { type: 'console' }                                  //! Log to the console
    },
    categories: {
        default: { appenders: ['file'], level: 'info' }                  //! in appenders we can add where we want logs to be written('console/file')
    }
});

const logger = log4Js.getLogger();

logger.addContext('fileName',fileName);

const userValidation = (user) => {
    // const response = userSchema({username:'Yash',email:'iresh@gmail.com',phoneNumber:'988134018',password:'iresh9',conformPassword:'iresh9'});
    // console.log(response.error.details[0].message);
    const response = userSchema(user);
    // console.log(response);
    if (response.error) {
        const Validation = {
            error: response.error.map(err => err),
            status: 406                                                 //? 406 is standard code for not acceptable
        } 
        // console.log('From Validation ', Validation.status);
        // console.log('From Validation ',Validation.error);
        logger.error(`error in validating ${Validation.error}`);
        return Validation;
    }
    else {
        const validation = {
            response: response,
            status: 202                                                 //? 202 is standard code for Accepted
        }
        logger.info(`authentication successfull ${validation.response}`)
        return validation;
    }
}
// userValidation()

module.exports = userValidation;

// const fs = require('fs');
// const path = require('path');
// const userSchema = require('./Schema');

// // Define the log file path
// const logFilePath = path.join(__dirname, 'validationLogs.txt');

// // Helper function to write logs to the file
// const logToFile = (message) => {
//     const timestamp = new Date().toISOString();
//     const logMessage = `[${timestamp}] ${message}\n`;
//     fs.appendFileSync(logFilePath, logMessage, 'utf8');
// };

// const userValidation = (user) => {
//     // Validate the user data using the schema
//     const response = userSchema(user);

//     if (response.error) {
//         const validation = {
//             error: response.error.details[0].message,
//             status: 406 // 406: Not Acceptable
//         };
//         // Log the validation error
//         logToFile(`Validation Error: ${validation.error}`);
//         return validation;
//     } else {
//         const validation = {
//             response: response,
//             status: 202 // 202: Accepted
//         };
//         // Log the successful validation
//         logToFile('Validation Successful: User data is valid.');
//         return validation;
//     }
// };

// module.exports = userValidation;
