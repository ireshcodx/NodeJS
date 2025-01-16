const Joi = require('joi');

const createdPackageSchema = (package) => {
    const schema = Joi.object({
        id: Joi.string()
            .optional(),
        customerId: Joi.string()
            .required(),
        courierId: Joi.string()
            .required(),
        weight: Joi.string()
            .required(),
        deliveryStatus: Joi.string()
            .valid('In Transit', 'Delivered', 'Pending').required(),
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
    return schema.validate(package,{abortEarly:false});
}

const updatedpackageSchema = (package) => {
    const schema = Joi.object({
        id: Joi.string()
            .optional(),
        customerId: Joi.string()
            .optional(),
        courierId: Joi.string()
            .optional(),
        weight: Joi.string()
            .optional(),
        deliveryStatus: Joi.string()
            .valid('In Transit', 'Delivered', 'Pending').optional(),
        updatedBy: Joi.string()
            .required(),
        updatedAt: Joi.string()
            .optional()
    }).min(1);
    return schema.validate(package,{abortEarly:false});
}

module.exports = {
    updatedpackageSchema,
    createdPackageSchema
}