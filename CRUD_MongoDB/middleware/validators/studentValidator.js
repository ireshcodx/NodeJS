const Joi = require('joi');

//todo Schema for creating a student
const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(1).required(),
  class: Joi.string().min(1).max(10).required(),
});

//todo Schema for updating a student
const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().integer().min(1).optional(),
  class: Joi.string().min(1).max(10).optional(),
});

//todo Schema for deleting or fetching by ID
const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
  idSchema,
};
