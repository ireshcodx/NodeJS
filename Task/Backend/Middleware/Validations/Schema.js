const Joi = require('joi');

const userSchema = (user) => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(2)
            .max(10),

        email: Joi.string()
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
            .required(),

        password: Joi.string()
            .regex(/^[0-9a-zA-Z].{5,}$/)
    })
    const result = schema.validate(user, { abortEarly: false });
    if (result.error) {
        const response = {
            error:result.error.details.map(error=> error.message)
        }
        return response;
    }

    return result;

}

module.exports = userSchema;