const { createCourierSchema, updateCourierSchema, IdCourierSchema } = require('./Validations/CourierSchema');
const logger = require('../logs/logger');

const createCourierValidation = (data) => {
  logger.info('[validations.js] Create courier validation executed');
  return createCourierSchema.validate(data);
};

const updateCourierValidation = (data) => {
  logger.info('[validations.js] Update courier validation executed');
  return updateCourierSchema.validate(data);
};

const IdCourierValidation = (data) => {
  logger.info('[validation.js] Id courier validation executed');
  return IdCourierSchema.validate(data);
}

module.exports = {
  createCourierValidation,
  updateCourierValidation,
  IdCourierValidation
}