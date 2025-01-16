const Joi = require('joi');

const createdCustomerSchema = (customer) => {
    const schema = Joi.object({
        id: Joi.string()
            .optional(),
        name: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        address: Joi.string()
            .required(),
        courier_id: Joi.number()
            .integer()
            .required(),
        createdBy: Joi.string()
            .required(),
        updatedBy: Joi.string()
            .optional(),
        createdAt: Joi.string()
            .optional(),
        updatedAt: Joi.string()
            .optional(),
        idDeleted: Joi.string()
            .pattern(/^[0 | 1]/)
            .optional()
    })
    return schema.validate(customer,{abortEarly:false});
}

const updatedCustomerSchema = (customer) => {
    const schema = Joi.object({
        id: Joi.string()
            .optional(),
        name: Joi.string()
            .optional(),
        email: Joi.string()
            .email()
            .optional(),
        address: Joi.string()
            .optional(),
        courier_id: Joi.number()
            .integer()
            .optional(),
        updatedBy: Joi.string()
            .required(),
        updatedAt: Joi.string()
            .optional()
    }).min(1);
    return schema.validate(customer,{abortEarly:false});
}



module.exports = {
    createdCustomerSchema,
    updatedCustomerSchema
}