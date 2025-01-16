const packageService = require('../services/packageService');
const packageValidation = require('../middleware/validations/packageSchema')

//! joins Get all packages
const getAllPackages = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[package.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const packages = await packageService.getAllPackages();
        return res.status(200).json(packages);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//todo Get package by ID
const getPackageById = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[package.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const id  = req.params;
        const packageData = await packageService.getPackageById(id);
        if (!packageData) {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(200).json(packageData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//todo Create a new package
const createPackage = async (req, res) => {
    try {
        const { error } = packageValidation.createdPackageSchema(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const package = req.body;
        const packageData = await packageService.createPackage(package);
        return res.status(201).json(packageData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//todo Update package by ID
const updatePackage = async (req, res) => {
    try {
        const id = req.params;
        const { error } = packageValidation.updatedpackageSchema(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const package = req.body;
        const updated = await packageService.updatePackage(id, package);
        if (!updated) {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(200).json({ message: 'Package updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//todo Delete package by ID
const deletePackage = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[package.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const id = req.params;
        const deleted = await packageService.deletePackage(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};
