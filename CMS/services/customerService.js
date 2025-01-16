const { Customer, Users } = require('../models');
const logger = require('../logs/logger');

const getAllCustomers = async () => {
    try {
        const customers = await Customer.findAll({ where: { isDeleted: 0 } });
        return customers;
    } catch (error) {
        logger.error(`[customerService.js] Error fetching all customers: ${error.message}`);
        throw error;
    }
};

const getCustomerById = async (id) => {
    try {
        const customer = await Customer.findOne({ where: { id, isDeleted: 0 } });
        return customer;
    } catch (error) {
        logger.error(`[customerService.js] Error fetching customer by ID: ${error.message}`);
        throw error;
    }
};

const createCustomer = async (customerData) => {
    try {
        console.log(customerData);
        return await Customer.create(customerData);
    } catch (error) {
        logger.error(`[customerService.js] Error creating customer: ${error.message}`);
        throw error;
    }
};

const createdUser = async (userData) => {
    try {
        return await Users.create(userData);
    } catch (error) {
        logger.error(`[customerService.js] Error creating user: ${error.message}`);
        throw error;
    }
}

const updateCustomer = async (id, updateData) => {
    try {
        const [updated] = await Customer.update(updateData, { where: { id } });
        return updated;
    } catch (error) {
        logger.error(`[customerService.js] Error updating customer: ${error.message}`);
        throw error;
    }
};

const deleteCustomer = async (id) => {
    try {
        const deleted = await Customer.destroy({ where: { id } });
        return deleted;
    } catch (error) {
        logger.error(`[customerService.js] Error deleting customer: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    createdUser,
    updateCustomer,
    deleteCustomer,
};
