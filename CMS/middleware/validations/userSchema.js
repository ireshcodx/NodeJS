const Joi = require('joi')

const createdUserSchema = (user) => {
    const schema = Joi.object({
        userName:Joi.string()
        .required(),
        email:Joi.string()
        .email().required(),
        password:Joi.string()
        .required(),
        role:Joi.number()
        .integer().required(),
        createdBy:Joi.string().required(),
    })
    return schema.validate(user,{abortEarly:false});
}

const logInSchema = (user) => {
    const schema = Joi.object({
        email:Joi.string()
        .email().required(),
        password:Joi.string()
        .required()
    })
    return schema.validate(user,{abortEarly:false});
}

module.exports = {
    createdUserSchema,
    logInSchema
}