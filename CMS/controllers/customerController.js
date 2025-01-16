const customerService = require('../services/customerService');
const logger = require('../logs/logger');
const bcrypt = require('bcrypt')
const customerValidation = require('../middleware/validations/customerSchema');
const userValidation = require('../middleware/validations/userSchema')

//todo Get all customers
const getAllCustomers = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[customer.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const customers = await customerService.getAllCustomers();
        logger.info(`[customer.Controller.js] - getAllCustomers - Found ${customers.length} customers`);
        return res.status(200).json(customers);
    } catch (error) {
        logger.error(`Error fetching all customers: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//todo Get customer by ID
const getCustomerById = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[customer.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const { id } = req.params;
        const customer = await customerService.getCustomerById(id);
        if (!customer) {
            logger.info(`[customer.Controller.js] - getCustomerById - Customer with ID ${id} not found`);
            return res.status(404).json({ message: 'Customer not found' });
        }
        logger.info(`[customer.Controller.js] - getCustomerById - Found customer with ID ${id}`);
        return res.status(200).json(customer);
    } catch (error) {
        logger.error(`Error fetching customer by ID: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//todo Create a new customer
const createCustomer = async (req, res) => {
    try {
        const CustomerData = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            courier_id: req.body.courier_id,
            createdBy: req.body.createdBy,
        };

        const { error } = customerValidation.createdCustomerSchema(CustomerData);
        if (error) {
            logger.error(`[customer.Controller.js] - createCustomer - Invalid customer data: ${error.details[0].message}`);
            return res.status(500).json({ validationError: error.details[0].message });
        }

        const newCustomer = await customerService.createCustomer(CustomerData);

        //! Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const UserData = {
            userName: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            customerId: newCustomer.id,
            role: req.body.role || 0,
            createdBy: req.body.createdBy,
        };

        const { err } = userValidation.createdUserSchema(UserData);
        if (err) {
            logger.error(`[customer.Controller.js] - createUser - Invalid user data: ${err.details[0].message}`);
            return res.status(500).json({ validationError: err.details[0].message });
        }

        const newUser = await customerService.createdUser(UserData);
        logger.info(`[customer.Controller.js] - createCustomer - Created new customer with ID ${newCustomer.id}`);
        return res.status(201).json({ customer: newCustomer, user: newUser });
    } catch (error) {
        logger.error(`Error creating customer: ${error.message}`);
        return res.status(500).json({ error: error });
    }
};

//todo Update customer by ID
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const { error } = customerValidation.updatedCustomerSchema(updateData);
        if (error) {
            logger.error(`[customer.Controller.js] - updateCustomer - Invalid customer data: ${error.details[0].message}`);
            return res.status(500).json({ validationError: error.details[0].message })
        }
        const updated = await customerService.updateCustomer(id, updateData);
        if (!updated) {
            logger.info(`[customer.Controller.js] - updateCustomer - Customer with ID ${id} not found`);
            return res.status(404).json({ message: 'Customer not found' });
        }
        logger.info(`[customer.Controller.js] - updateCustomer - Updated customer with ID ${id}`);
        return res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        logger.error(`Error updating customer: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//todo Delete customer by ID
const deleteCustomer = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[customer.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const { id } = req.params;
        const deleted = await customerService.deleteCustomer(id);
        if (!deleted) {
            logger.info(`[customer.Controller.js] deleteCustomer - Customer with ID ${id} not found`);
            return res.status(404).json({ message: 'Customer not found' });
        }
        logger.info(`[customer.Controller.js] - deleteCustomer - Deleted customer with ID ${id}`);
        return res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        logger.error(`[customer.Controller.js] Error deleting customer: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
