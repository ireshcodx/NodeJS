const Joi = require('joi');

//todo Schema for creating a new student
const createStudentSchema = Joi.object({
    first_name: Joi.string().
        max(50).
        required(),
    last_name: Joi.string().
        max(50).
        required(),
    email: Joi.string()
        .email()
        .required(),
    phone_number: Joi.string()
        .max(20)
        .optional(),
    date_of_birth: Joi.date().
        required(),
    department_id: Joi.number()
        .required(),
    hobbies: Joi.object({
        indoor: Joi.string()
            .required(),
        outdoor: Joi.string()
            .required()
    }).required()
});

//todo Schema for updating an student
const updateStudentSchema = Joi.object({
    first_name: Joi.string()
        .max(50)
        .optional(),
    last_name: Joi.string()
        .max(50)
        .optional(),
    email: Joi.string()
        .email()
        .optional(),
    phone_number: Joi.string()
        .max(20)
        .optional(),
    date_of_birth: Joi.date()
        .optional(),
    department_id: Joi.number()
        .optional(),
    hobbies: Joi.object({
        indoor: Joi.string()
            .optional(),
        outdoor: Joi.string()
            .optional()
    }).optional()
});

module.exports = { createStudentSchema, updateStudentSchema };
