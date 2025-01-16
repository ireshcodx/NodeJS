const Joi = require('joi');

const createCourierSchema = Joi.object({
    from_CustomerName: Joi.string()
        .required(),
    to_CustomerName: Joi.string()
        .required(),
    address: Joi.object({
        office: Joi.string()
            .max(200)
            .required(),
        permanent: Joi.string()
            .max(200)
            .required()
    }).required(),
    primary_No: Joi.string()
        .pattern(/^\d{10}$/)
        .required(),
    secondary_No: Joi.string()
        .pattern(/^\d{10}$/)
        .required(),
});


const updateCourierSchema = Joi.object({
    _id: Joi.string().required(),
    address: Joi.object({
        office: Joi.string()
            .optional(),
        permanent: Joi.string()
            .optional()
    }).optional(),
    created_Date: Joi.date()
        .optional(),
    expected_Date: Joi.string()
        .optional(),
    primary_No: Joi.string()
        .pattern(/^\d{10}$/)
        .optional(),
    secondary_No: Joi.string()
        .pattern(/^\d{10}$/)
        .optional(),
});


const IdCourierSchema = Joi.object({
    _id: Joi.string()
        .required(),
})
module.exports = {
    updateCourierSchema,
    createCourierSchema,
    IdCourierSchema
}