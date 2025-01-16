const Joi = require('joi');
const createLogger = require('../logs/logger');

const logger = createLogger(__filename);

// Joi Schema for validating category
const categorySchema = Joi.object({
    category: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(3)
        .required(),
});

// Function to validate category
const validateCategory = (data) => {
    const { error, value } = categorySchema.validate(data);

    if (error) {
        logger.error(`Validation error: ${error.details[0].message}`);
        return {
            isValid: false,
            error: error.details[0].message,
        };
    }
    logger.info(`Category validated successfully: ${value.category}`);
    return { isValid: true, value };
};

module.exports = validateCategory;
