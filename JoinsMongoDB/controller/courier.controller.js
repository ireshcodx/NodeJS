const courierService = require('../service/courierService');
const courierValidation = require('../validations/courierValidation'); // Add validation file if needed
const logger = require('../logs/logger');

//! Add a new courier
const addCourier = async (req, res) => {
  try {
    const { error } = courierValidation.validateCourier(req.body); // Assuming you have a courier validation function
    if (error) {
      logger.error(`[courierController.js] - ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const courier = await courierService.addCourier(req.body);
    logger.info(`[courierController.js] Courier added successfully ${JSON.stringify(courier)}`);
    return res.status(201).json(courier);
  } catch (error) {
    logger.error(`[courierController.js] error adding courier ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

//! Get all couriers
const getAllCouriers = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[courierController.js] Received request body');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const couriers = await courierService.getAllCouriers();
    res.status(200).json(couriers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! Get courier by ID
const getCourierById = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[courierController.js] Received request body');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const courier = await courierService.getCourierById(req.params.id);
    if (!courier) {
      logger.error('[courierController.js] Courier Not Found', req.params.id);
      return res.status(404).json({ error: `Courier not found with id ${req.params.id}` });
    }
    logger.info(`[courierController.js] Fetched courier with id ${req.params.id}, ${JSON.stringify(courier)}`);
    return res.status(200).json(courier);
  } catch (error) {
    logger.error(`[courierController.js] error in getting courier with id ${req.params.id}, ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

//! Update courier
const updateCourier = async (req, res) => {
  try {
    const { error } = courierValidation.validateUpdateCourier(req.body); // Assuming you have update validation
    if (error) {
      logger.error(`[courierController.js] Validation error ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const updatedCourier = await courierService.updateCourier(req.params.id, req.body);
    if (!updatedCourier) {
      logger.error(`[courierController.js] Courier Not Found with id ${req.params.id}`);
      return res.status(404).json({ error: 'Courier not found' });
    }
    logger.info(`[courierController.js] Updated courier with id ${req.params.id}, ${JSON.stringify(updatedCourier)}`);
    res.status(200).json(updatedCourier);
  } catch (error) {
    logger.error(`[courierController.js] error in updating courier  ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

//! Delete courier
const deleteCourier = async (req, res) => {
  try {
    const deletedCourier = await courierService.deleteCourier(req.params.id);
    if (!deletedCourier) {
      logger.error(`[courierController.js] Courier Not Found with id ${req.params.id}`);
      return res.status(404).json({ error: 'Courier not found' });
    }
    logger.info(`[courierController.js] Deleted courier with id ${req.params.id}`);
    res.status(204).send('Courier deleted successfully with id', req.params.id);
  } catch (error) {
    logger.error('[courierController.js] error in deleting courier', error.message);
    res.status(500).json({ error: error.message });
  }
};

//! Join courier and customer
const joinCourierAndCustomer = async (req, res) => {
  try {
    const { courierId } = req.params;
    const result = await courierService.joinCourierAndCustomer(courierId);
    logger.info(`[courierController.js] Joined courier with customer: ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`[courierController.js] Error joining courier with customer: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

//! Join package and delivery route
const joinPackageAndDeliveryRoute = async (req, res) => {
  try {
    const { packageId } = req.params;
    const result = await courierService.joinPackageAndDeliveryRoute(packageId);
    logger.info(`[courierController.js] Joined package with delivery route: ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`[courierController.js] Error joining package with delivery route: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCourier,
  getAllCouriers,
  getCourierById,
  updateCourier,
  deleteCourier,
  joinCourierAndCustomer,
  joinPackageAndDeliveryRoute,
};


//! old API's
// const getAllCustomers = async (req, res) => {
//   try {
//     const customers = await courierService.getAllCustomers();
//     res.status(200).json(customers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllPackages = async (req, res) => {
//   try {
//     const packages = await courierService.getAllPackages();
//     res.status(200).json(packages);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllDeliveryRoutes = async (req, res) => {
//   try {
//     const routes = await courierService.getAllDeliveryRoutes();
//     res.status(200).json(routes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getFullDeliveryDetails = async (req, res) => {
//   try {
//     const details = await courierService.getFullDeliveryDetails();
//     res.status(200).json(details);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getFullDeliveryWithRouteDetails = async (req, res) => {
//   try {
//     const details = await courierService.getFullDeliveryWithRouteDetails();
//     res.status(200).json(details);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
// addCourier,
// getAllCouriers,
// getAllCustomers,
// getAllPackages,
// getAllDeliveryRoutes,
// getFullDeliveryDetails,
// getFullDeliveryWithRouteDetails
// };
