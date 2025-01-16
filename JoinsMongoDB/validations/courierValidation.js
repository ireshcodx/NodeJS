const Joi = require('joi');

//todo Schema for adding a new courier
const validateCourier = (courier) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    vehicle: Joi.string()
      .required(),
    assigned_region: Joi.string()
      .required(),
    createdBy: Joi.string()
      .required(),
    updatedBy: Joi.string()
      .required()
  });
  return schema.validate(courier);
};

//todo Schema for updating a courier
const validateUpdateCourier = (courier) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50),
    vehicle: Joi.string(),
    assigned_region: Joi.string(),
    updatedBy: Joi.string()
      .required()
  }).min(1);
  return schema.validate(courier);
};

module.exports = { validateCourier, validateUpdateCourier };
