const joinsService = require('../service/joinsService');
const logger = require('../logs/logger');

//! Get customer with packages
const getCustomerWithPackages = async (req, res) => {
  try {
    const result = await joinsService.getCustomerWithPackages();
    logger.info(`[joinsController.js] getCustomerWithPackages - result: ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`[joinsController.js] Error fetching customer with packages: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! Get packages with courier details
const getPackagesWithCourierDetails = async (req, res) => {
  try {
    const result = await joinsService.getPackagesWithCourierDetails();
    logger.info(`[joinController.js] getPackagesWithCourierDetails - result: ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`[joinsController.js] Error fetching packages with courier details: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! Get delivery route with courier details
const getDeliveryRouteWithCourier = async (req, res) => {
  try {
    const result = await joinsService.getDeliveryRouteWithCourier();
    logger.info(`[joinsController.js] getDeliveryRouteWithCourier - result: ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`[joinsController.js] Error fetching delivery routes with courier details: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! Get complete package details
const getCompletePackageDetails = async (req, res) => {
  try {
    const result = await joinsService.getCompletePackageDetails();
    logger.info(`[joinsController.js] getCompletePackageDetails - result: ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`[joinsController.js] Error fetching complete package details: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getCustomerWithPackages,
  getPackagesWithCourierDetails,
  getDeliveryRouteWithCourier,
  getCompletePackageDetails
};
