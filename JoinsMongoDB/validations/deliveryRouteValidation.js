const Joi = require('joi');

//todo Schema for adding a new delivery route
const validateDeliveryRoute = (route) => {
  const schema = Joi.object({
    courier_id: Joi.string()
      .required(),
    route: Joi.array()
      .items(Joi.string().
        required())
      .min(1)
      .required(),
    createdBy: Joi.string()
      .required(),
    updatedBy: Joi.string()
      .required()
  });
  return schema.validate(route);
};

//todo Schema for updating a delivery route
const validateUpdateDeliveryRoute = (route) => {
  const schema = Joi.object({
    courier_id: Joi.string()
      .optional(),
    route: Joi.array()
      .items(Joi.string()
        .required())
      .min(1),
    updatedBy: Joi.string()
      .required()
  }).min(1);
  return schema.validate(route);
};

module.exports = { validateDeliveryRoute, validateUpdateDeliveryRoute };
