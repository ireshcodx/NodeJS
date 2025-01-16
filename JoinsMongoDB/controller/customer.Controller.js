const customerService = require('../service/customerService');
const customerValidation = require('../validations/customerValidation');
const logger = require('../logs/logger');

//! Add a new customer
const addCustomer = async (req, res) => {
  try {
    const { error } = customerValidation.validateCustomer(req.body);
    if (error) {
      logger.error(`[customer.Controller.js] - ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const customer = await customerService.addCustomer(req.body);
    logger.info(`[customer.Controller.js] Customer added successfully ${JSON.stringify(customer)}`);
    return res.status(201).json(customer);
  } catch (error) {
    logger.error(`[customer.Controller.js] error adding customer ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

//! Get all customers
const getAllCustomers = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[customerController.js] Received request body');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! Get customer by ID
const getCustomerById = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[customerController.js] Received request body');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      logger.error('[customerController.js] Customer Not Found', req.params.id);
      return res.status(404).json({ error: `Customer not found with id ${req.params.id}` });
    }
    logger.info(`[customerController.js] Fetched customer with id ${req.params.id}, ${JSON.stringify(customer)}`);
    return res.status(200).json(customer);
  } catch (error) {
    logger.error(`[customerController.js] error in getting customer with id ${req.params.id}, ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

//! Update customer
const updateCustomer = async (req, res) => {
  try {
    const { error } = customerValidation.validateUpdateCustomer(req.body);
    if (error) {
      logger.error(`[customer.Controller.js] Validation error ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
    if (!updatedCustomer) {
      logger.error(`[customer.Controller.js] Customer Not Found with id ${req.params.id}`);
      return res.status(404).json({ error: 'Customer not found' });
    }
    logger.info(`[customer.Controller.js] Updated customer with id ${req.params.id}, ${JSON.stringify(updatedCustomer)}`);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    logger.error(`[customer.Controller.js] error in updating customer  ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await customerService.deleteCustomer(req.params.id);
    if (!deletedCustomer) {
      logger.error(`[customer.Controller.js] Customer Not Found with id ${req.params.id}`);
      return res.status(404).json({ error: 'Customer not found' });
    }
    logger.info(`[customer.Controller.js] Deleted customer with id ${req.params.id}`);
    res.status(204).send('Customer deleted successfully with id', req.params.id);
  } catch (error) {
    logger.error('[customer.Controller.js] error in deleting customer', error.message);
    res.status(500).json({ error: error.message });
  }
};

//! Join courier and customer
// const joinCourierAndCustomer = async (req, res) => {
//   try {
//     const { courierId } = req.params;
//     const result = await customerService.joinCourierAndCustomer(courierId);
//     logger.info(`[customer.Controller.js] Joined courier with customer: ${JSON.stringify(result)}`);
//     return res.status(200).json(result);
//   } catch (error) {
//     logger.error(`[customer.Controller.js] Error joining courier with customer: ${error.message}`);
//     return res.status(500).json({ error: error.message });
//   }
// };

//! Join package and delivery route

const joinPackageAndDeliveryRoute = async (req, res) => {
  try {
    const {id}  = req.params;
    // console.log(req.params);
    const result = await customerService.joinPackageAndDeliveryRoute(id);
    logger.info(`[customer.Controller.js] Joined package with delivery route: ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`[customer.Controller.js] Error joining package with delivery route: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

const getCustomerAndRoutesByDeliveryRouteId = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await customerService.getCustomerAndRoutesByDeliveryRouteId(id);
    logger.info(`[customer.Controller.js] Joined customer with delivery route: ${JSON.stringify(result)}`);
      return res.status(200).json(result);
  } catch (error) {
    logger.error(`[customer.Controller.js] Error joining customer with delivery route: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  joinPackageAndDeliveryRoute,
  getCustomerAndRoutesByDeliveryRouteId
};
