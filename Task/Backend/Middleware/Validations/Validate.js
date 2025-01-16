const userSchema = require('./Schema');
const logger = require('../Logs/logger');



const userValidation = (user) => {
    const response = userSchema(user);
    if (response.error) {
        const Validation = {
            error: response.error.map(err => err),
            status: 406
        };
        logger.error(`error in validating ${Validation.error}`);
        return Validation;
    } else {
        const validation = {
            response: response,
            status: 202
        };
        logger.info(`authentication successful ${JSON.stringify(validation.response)}`);
        return validation;
    }
};

module.exports = userValidation;