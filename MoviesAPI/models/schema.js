const Joi = require('joi');

//! Joi Schema for category validation
const categorySchema = Joi.object({
    category: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(3)
        .required(),
});

//! Function to validate category
const validateCategory = (data) => {
    const { error, value } = categorySchema.validate(data);

    if (error) {
        return {
            isValid: false,
            error: error.details[0].message,
        };
    }
    return { isValid: true, value };
};

module.exports = validateCategory;
