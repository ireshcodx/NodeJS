const Joi = require('joi');
const logger = require('../logs/logger');

const validatePackage = (packageData) => {
  const schema = Joi.object({
    customer_id: Joi.string()
      .required(),
    courier_id: Joi.string()
      .required(),
    weight: Joi.number().positive()
      .required(),
    status: Joi.string()
      .valid('In Transit', 'Delivered', 'Pending').required(),
    delivery_date: Joi.date().optional(),
    createdBy: Joi.string()
      .required(),
    updatedBy: Joi.string()
      .required()
  });
  return schema.validate(packageData);
};

const updatePackageVaidation = (packageData) => {
  const schema = Joi.object({
    weight: Joi.number().positive()
      .optional(),
    status: Joi.string()
      .valid('In Transit', 'Delivered', 'Pending')
      .optional(),
    delivery_date: Joi.date()
      .optional(),
    createdBy: Joi.string()
      .optional(),
    updatedBy: Joi.string()
      .optional()
  });
  return schema.validate(packageData);
}

module.exports = { validatePackage, updatePackageVaidation };