const Package = require('../model/packageModel');
const logger = require('../logs/logger');

const addPackage = async (packageData) => {
  logger.info(`[packageService.js] Adding package: ${JSON.stringify(packageData)}`);
  const package = new Package(packageData);
  return await package.save();
};

const getAllPackages = async () => {
  logger.info(`[packageService.js] Retrieving all packages`);
  return await Package.find({ isDeleted: false }).populate('customer_id courier_id');
};

const getPackageById = async (id) => {
  logger.info(`[packageService.js] Retrieving package by ID: ${id}`);
  return await Package.findOne({ _id: id, isDeleted: false }).populate('customer_id courier_id');
};

const updatePackage = async (id, updateData) => {
  logger.info(`[packageService.js] Updating package with ID: ${id}, Data: ${JSON.stringify(updateData)}`);
  updateData.updatedAt = Date.now();               //? Update the times
  return await Package.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, {
    new: true,
    runValidators: true
  }).populate('customer_id courier_id');
};

//! Soft-delete a package by ID
const deletePackage = async (id) => {
  return await Package.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
};

module.exports = { 
  addPackage, 
  getAllPackages, 
  getPackageById, 
  updatePackage,
  deletePackage 
};
