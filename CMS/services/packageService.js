const { Package, Courier, Customer } = require('../models');
const logger = require('../logs/logger');


// Get all packages
const getAllPackages = async () => {
    try {
        const packages = await Package.findAll({
            where: { isDeleted: 0 },
            include: [
                {
                    model: Courier,
                    as: 'courier',
                    attributes: ['id', 'name', 'vehicleType']
                },
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['id', 'name', 'email']
                }
            ],
            // logging: console.log
        });
        logger.info(`[packageService.js] - getAllPackages - Found ${packages.length} packages`);
        return packages;
    } catch (error) {
        logger.error(`[packageService.js] Error fetching all packages: ${error.message}`);
        throw error;
    }
};


// Get package by ID
const getPackageById = async (id) => {
    try {
        const packageData = await Package.findByPk({
            where: { id, isDeleted: 0 },
            include: [
                {
                    model: Courier,
                    as: 'courier',
                    attributes: ['id', 'name', 'vehicleType']
                },
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['id', 'name', 'email']
                }
            ],
        });
        logger.info(`[packageService.js] getPackageById - Found package with ID ${id}`);
        return packageData;
    } catch (error) {
        throw new Error(`[packageService.js] Error fetching package with ID ${id}: ${error.message}`);
    }
};

// Create a new package
const createPackage = async (packageData) => {
    try {
        const newPackage = await Package.create({
            customerId: packageData.customerId,
            courierId: packageData.courierId,
            weight: packageData.weight,
            deliveryStatus: packageData.deliveryStatus,
            createdBy: packageData.createdBy,
            createdAt: new Date(),
            updatedAt: null,
            updatedBy: null
        });
        logger.info(`[packageService.js] createPackage - Created new package with ID ${newPackage.id}`);
        return newPackage;
    } catch (error) {
        logger.error
        throw new Error(`[packageService.js] Error creating package: ${error.message}`);
    }
};

// Update package by ID
const updatePackage = async (id, packageData) => {
    try {
        // Update a package by its ID
        const [updated] = await Package.update(packageData, { where: { id } });
        return updated > 0; //! Returns true if a row was updated
    } catch (error) {
        throw new Error(`[packageService.js] Error updating package with ID ${id}: ${error.message}`);
    }
};

// Delete package by ID
const deletePackage = async (id) => {
    try {
        const deleted = await Package.destroy({ where: { id } });
        return deleted > 0;
    } catch (error) {
        throw new Error(`[packageService.js] Error deleting package with ID ${id}: ${error.message}`);
    }
};

module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};
