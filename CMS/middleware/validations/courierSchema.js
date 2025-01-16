const Joi = require('joi');

const createCourierSchema = (courier) => {
    const schema = Joi.object({
        id: Joi.string()
            .optional(),
        name: Joi.string()
            .required(),
        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required(),
        vehicleType: Joi.string()
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
    return schema.validate(courier,{abortEarly:false});
}

const updatedCourierSchema = (courier) => {
    const schema = Joi.object({
        id: Joi.string()
            .optional(),
        name: Joi.string()
            .optional(),
        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .optional(),
        vehicleType: Joi.string()
            .optional(),
        updatedBy: Joi.string()
            .required(),
        updatedAt: Joi.string()
            .optional()
    }).min(1)
    return schema.validate(courier,{abortEarly:false});
}

module.exports = {
    createCourierSchema,
    updatedCourierSchema
}