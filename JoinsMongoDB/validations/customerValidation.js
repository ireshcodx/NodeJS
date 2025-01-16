const Joi = require('joi');

//todo Schema for adding a new customer
const validateCustomer = (customer) => {
  const schema = Joi.object({
    _id: Joi.string()
      .optional(),
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    address: Joi.string()
      .required(),
    delivery_route_id: Joi.string()
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    createdBy: Joi.string()
      .required(),
    updatedBy: Joi.string()
      .required()
  });
  return schema.validate(customer);
};

//todo Schema for updating a customer
const validateUpdateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50),
      delivery_route_id:Joi.string()
      .optional(),
    address: Joi.string(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/),
    updatedBy: Joi.string()
      .required()
  }).min(1);
  return schema.validate(customer);
};

module.exports = { validateCustomer, validateUpdateCustomer };
