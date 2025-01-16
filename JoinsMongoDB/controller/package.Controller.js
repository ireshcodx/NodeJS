const packageService = require('../service/packageService');
const packageValidation = require('../validations/packageValidation');
const logger = require('../logs/logger');

const addPackage = async (req, res) => {
  try {
    const { error } = packageValidation.validatePackage(req.body);
    if (error) {
      logger.error(`[package.Controller.js] Validation error: ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const package = await packageService.addPackage(req.body);
    logger.info(`[package.Controller.js] Package added successfully: ${JSON.stringify(package)}`);
    return res.status(201).json(package);
  } catch (error) {
    logger.error(`[package.Controller.js] Error adding package: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

const getAllPackages = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[package.Controller.js] Request body is not allowed');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const packages = await packageService.getAllPackages();
    logger.info(`[package.Controller.js] Retrieved all packages: ${JSON.stringify(packages)}`);
    return res.status(200).json(packages);
  } catch (error) {
    logger.error(`[package.Controller.js] Error retrieving all packages: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

const getPackageById = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[package.Controller.js] Request body is not allowed');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const package = await packageService.getPackageById(req.params.id);
    if (!package) {
      logger.error(`[package.Controller.js] Package not found with id ${req.params.id}`);
      return res.status(404).json({ error: `Package not found with id ${req.params.id}` });
    }
    logger.info(`[package.Controller.js] Retrieved package with id ${req.params.id}: ${JSON.stringify(package)}`);
    return res.status(200).json(package);
  } catch (error) {
    logger.error(`[package.Controller.js] Error retrieving package with id ${req.params.id}: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const { error } = packageValidation.updatePackageVaidation(req.body);
    if (error) {
      logger.error(`[package.Controller.js] Validation error: ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }
    const updatedPackage = await packageService.updatePackage(req.params.id, req.body);
    if (!updatedPackage) {
      logger.error(`[package.Controller.js] Package not found with id ${req.params.id}`);
      return res.status(404).json({ error: `Package not found with id ${req.params.id}` });
    }
    logger.info(`[package.Controller.js] Updated package with id ${req.params.id}: ${JSON.stringify(updatedPackage)}`);
    return res.status(200).json(updatedPackage);
  } catch (error) {
    logger.error(`[package.Controller.js] Error updating package: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

const deletePackage = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    logger.error('[package.Controller.js] Request body is not allowed');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const deletedPackage = await packageService.deletePackage(req.params.id);
    if (!deletedPackage) {
      logger.error(`[package.Controller.js] Package not found with id ${req.params.id}`);
      return res.status(404).json({ error: `Package not found with id ${req.params.id}` });
    }
    logger.info(`[package.Controller.js] Deleted package with id ${req.params.id}`);
    return res.status(204).json({ packageID: req.params.id, package: deletedPackage });
  } catch (error) {
    logger.error(`[package.Controller.js] Error deleting package: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage
};
