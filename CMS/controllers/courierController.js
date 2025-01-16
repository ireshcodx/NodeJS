const courierService = require('../services/courierService');
const logger = require('../logs/logger');
const courierValidation = require('../middleware/validations/courierSchema');

//? Get all couriers
const getAllCouriers = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[package.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const couriers = await courierService.getAllCouriers();
        logger.info('Fetched all couriers');
        return res.status(200).json(couriers);
    } catch (error) {
        logger.error(`Error fetching couriers: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//? Get courier by ID
const getCourierById = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[package.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const { id } = req.params;
        const courier = await courierService.getCourierById(id);
        if (!courier) {
            logger.warn(`Courier not found: ID ${id}`);
            return res.status(404).json({ message: 'Courier not found' });
        }
        logger.info(`Fetched courier by ID: ${id}`);
        return res.status(200).json(courier);
    } catch (error) {
        logger.error(`Error fetching courier by ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//? Create a new courier
const createCourier = async (req, res) => {
    try {
        const { error } = courierValidation.createCourierSchema(req.body);
        if (error) {
            logger.error(`[courierController.js] Error in validation ${error.details[0].message}}`)
            return res.status(500).json({ error: error });
        }
        const courier = await courierService.createCourier(req.body);
        logger.info('Courier created successfully');
        return res.status(201).json(courier);
    } catch (error) {
        logger.error(`Error creating courier: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//? Update courier by ID
const updateCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const { error } = courierValidation.updatedCourierSchema(update);
        if (error) {
            logger.error(`[courierController.js] Error in validation ${error}`)
            return res.status(500).json({ error: error.details[0].message })
        }
        const updated = await courierService.updateCourier(id, update);
        if (!updated) {
            logger.warn(`Courier not found for update: ID ${id}`);
            return res.status(404).json({ message: 'Courier not found' });
        }
        logger.info(`Courier updated successfully: ID ${id}`);
        return res.status(200).json({ message: 'Courier updated successfully' });
    } catch (error) {
        logger.error(`Error updating courier ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//? Delete courier by ID
const deleteCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await courierService.deleteCourier(id);
        if (!deleted) {
            logger.warn(`Courier not found for deletion: ID ${id}`);
            return res.status(404).json({ message: 'Courier not found' });
        }
        logger.info(`Courier deleted successfully: ID ${id}`);
        return res.status(200).json({ message: 'Courier deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting courier ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

//? Get all couriers with their created customers
const getAllCouriersWithCustomers = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[package.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const UnitpdfBuffer = await courierService.getAllCouriersWithCustomers(); //! PDF is generating in UTF8Array binary code
        const pdfBuffer = Buffer.from(UnitpdfBuffer);   //! conerting it into Buffer as res.send supports buffer

        logger.info(`[courierController.js] PDF generated successfully`);

        //! Setting headers to load PDF on postmen || browser
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="couriers_report.pdf"');
        // console.log(pdfBuffer.slice(0,10));
        res.send(pdfBuffer);
    } catch (error) {
        logger.error(`Error generating PDF report: ${error.message}`);
        res.status(500).send({ message: 'Error generating report', error: error.message });
    }
};

//? Get courier by ID with created customer details
const getCourierByIdWithCustomer = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        logger.error('[package.Controller.js] Request body is not allowed');
        return res.status(400).json({ error: 'Request body is not allowed' });
    }
    try {
        const { id } = req.params;
        const courier = await courierService.getCourierByIdWithCustomer(id);
        if (!courier) {
            logger.warn(`Courier not found with customer: ID ${id}`);
            return res.status(404).json({ message: 'Courier not found' });
        }
        logger.info(`Fetched courier by ID with customer: ${id}`);
        return res.status(200).json(courier);
    } catch (error) {
        logger.error(`Error fetching courier with customer by ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCouriers,
    getCourierById,
    createCourier,
    updateCourier,
    deleteCourier,
    getCourierByIdWithCustomer,
    getAllCouriersWithCustomers
};