const deliveryRouteService = require('../service/deliveryRouteService');
const deliveryRouteValidation = require('../validations/deliveryRouteValidation');
const logger = require('../logs/logger');

//! Add a new delivery route
const addDeliveryRoute = async (req, res) => {
  try {
    const { error } = deliveryRouteValidation.validateDeliveryRoute(req.body);
    if (error) {
      logger.error(`[deliveryRoute.Controller.js] Validation error: ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const route = await deliveryRouteService.addDeliveryRoute(req.body);
    logger.info(`[deliveryRoute.Controller.js] Delivery route added successfully: ${JSON.stringify(route)}`);
    res.status(201).json(route);
  } catch (error) {
    logger.error(`[deliveryRoute.Controller.js] Error adding delivery route: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Get all delivery routes
const getAllDeliveryRoutes = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[deliveryRoute.Controller.js] Received request body');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const routes = await deliveryRouteService.getAllDeliveryRoutes();
    logger.info(`[deliveryRoute.Controller.js] Fetched all delivery routes: ${JSON.stringify(routes)}`);
    res.status(200).json(routes);
  } catch (error) {
    logger.error(`[deliveryRoute.Controller.js] Error fetching delivery routes: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Get delivery route by ID
const getDeliveryRouteById = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[deliveryRoute.Controller.js] Received request body');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const route = await deliveryRouteService.getDeliveryRouteById(req.params.id);
    if (!route) {
      logger.error(`[deliveryRoute.Controller.js] Delivery route not found with id ${req.params.id}`);
      return res.status(404).json({ error: `Delivery route not found with id ${req.params.id}` });
    }
    logger.info(`[deliveryRoute.Controller.js] Fetched delivery route with id ${req.params.id}: ${JSON.stringify(route)}`);
    res.status(200).json(route);
  } catch (error) {
    logger.error(`[deliveryRoute.Controller.js] Error fetching delivery route with id ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Update delivery route
const updateDeliveryRoute = async (req, res) => {
  try {
    const { error } = deliveryRouteValidation.validateUpdateDeliveryRoute(req.body);
    if (error) {
      logger.error(`[deliveryRoute.Controller.js] Validation error: ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const updatedRoute = await deliveryRouteService.updateDeliveryRoute(req.params.id, req.body);
    // console.log('from controller ',updatedRoute);
    if (!updatedRoute) {
      logger.error(`[deliveryRoute.Controller.js] Delivery route not found with id ${req.params.id}`);
      return res.status(404).json({ error: `Delivery route not found with id ${req.params.id}` });
    }
    logger.info(`[deliveryRoute.Controller.js] Updated delivery route with id ${req.params.id}: ${JSON.stringify(updatedRoute)}`);
    res.status(200).json(updatedRoute);
  } catch (error) {
    logger.error(`[deliveryRoute.Controller.js] Error updating delivery route with id ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Delete delivery route
const deleteDeliveryRoute = async (req, res) => {
  try {
    const deletedRoute = await deliveryRouteService.deleteDeliveryRoute(req.params.id);
    if (!deletedRoute) {
      logger.error(`[deliveryRoute.Controller.js] Delivery route not found with id ${req.params.id}`);
      return res.status(404).json({ error: `Delivery route not found with id ${req.params.id}` });
    }
    logger.info(`[deliveryRoute.Controller.js] Deleted delivery route with id ${req.params.id}`);
    res.status(204).send('Successfully deleted delivery route with id ' + req.params.id);
  } catch (error) {
    logger.error(`[deliveryRoute.Controller.js] Error deleting delivery route with id ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Join delivery route with customer
const joinDeliveryRouteAndCustomer = async (req, res) => {
  try {
    const { routeId, customerId } = req.body;
    const result = await deliveryRouteService.joinDeliveryRouteAndCustomer(routeId, customerId);
    logger.info(`[deliveryRoute.Controller.js] Delivery route with id ${routeId} successfully linked to customer with id ${customerId}`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`[deliveryRoute.Controller.js] Error linking delivery route to customer: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Join delivery route with courier
const joinDeliveryRouteAndCourier = async (req, res) => {
  try {
    const { routeId, courierId } = req.body;
    const result = await deliveryRouteService.joinDeliveryRouteAndCourier(routeId, courierId);
    logger.info(`[deliveryRoute.Controller.js] Delivery route with id ${routeId} successfully linked to courier with id ${courierId}`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`[deliveryRoute.Controller.js] Error linking delivery route to courier: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  addDeliveryRoute, 
  getAllDeliveryRoutes, 
  getDeliveryRouteById, 
  updateDeliveryRoute, 
  deleteDeliveryRoute,
  joinDeliveryRouteAndCustomer, 
  joinDeliveryRouteAndCourier  
};