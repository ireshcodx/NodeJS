const { Courier, Customer, package } = require('../models');
const logger = require('../logs/logger');
const pdfGenerator = require('./pdfGenerator');
const courier = require('../models/courier');

//! Get all couriers
const getAllCouriers = async () => {
    try {
        const couriers = await Courier.findAll({ where: { isDeleted: 0 } });
        logger.info(`[courierService.js] - getAllCouriers - Found ${couriers.length} couriers`);
        return couriers;
    } catch (error) {
        logger.error(`[courierService.js] Error fetching all couriers: ${error.message}`);
        throw error;
    }
};

//! Get courier by ID
const getCourierById = async (id) => {
    try {
        return await Courier.findByPk(id, { where: { isDeleted: 0 } });
    } catch (error) {
        logger.error(`[courierService.js] Error fetching courier by ID ${id}: ${error.message}`);
        throw error;
    }
};

//! Get all couriers with their created customers
// const getAllCouriersWithCustomers = async () => {
//     try {
//         const couriers = await Courier.findAll({
//             where: { isDeleted: 0 },
//             include: [
//                 {
//                     model: Customer,
//                     as: 'customers',
//                     attributes: ['id', 'name', 'email'],
//                 },
//             ],
//         });
//         logger.info(`[courierService.js] - getAllCouriersWithCustomers - Found ${couriers.length} couriers`);
//         return couriers;
//     } catch (error) {
//         logger.error(`[courierService.js] Error fetching couriers with customers: ${error.message}`);
//         throw error;
//     }
// };



//! Get courier by ID with created customer details

const getAllCouriersWithCustomers = async () => {
    try {
        const couriers = await Courier.findAll({
            where: { isDeleted: 0 },
            include: [
                {
                    model: Customer,
                    as: 'customers',
                    attributes: ['id', 'name', 'email'],
                }
            ],
        });


        if (couriers.error) {
            logger.error(`[courierService.js] - getAllCouriersWithCustomers - No couriers`);
            return [];
        }
        // console.log(JSON.stringify(couriers));
        //! Create HTML design with data in it
        const htmlContent = pdfGenerator.generateHTMLContent(couriers);

        //! Generate PDF and return as buffer
        const pdfBuffer = await pdfGenerator.generatePDF(htmlContent);

        logger.info(`[courierService.js] - getAllCouriersWithCustomers - PDF generated successfully`);
        return pdfBuffer;
    } catch (error) {
        logger.error(`[courierService.js] Error fetching couriers with customers: ${error.message}`);
        throw error;
    }
};

const getCourierByIdWithCustomer = async (id) => {
    try {
        const courier = await Courier.findOne({
            where: { id, isDeleted: 0 },
            include: [
                {
                    model: Customer,
                    as: 'customers',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });
        if (!courier) {
            logger.warn(`[courierService.js] - getCourierByIdWithCustomer - Courier not found: ID ${id}`);
        }
        return courier;
    } catch (error) {
        logger.error(`[courierService.js] Error fetching courier with customer by ID ${id}: ${error.message}`);
        throw error;
    }
};

//! Create a new courier
const createCourier = async (courierData) => {
    try {
        courierData.isDeleted = 0;
        return await Courier.create(courierData);
    } catch (error) {
        logger.error(`[courierService.js] Error creating courier: ${error.message}`);
        throw error;
    }
};

//! Update courier by ID
const updateCourier = async (id, updateData) => {
    try {
        updateData.updatedAt = Date.now();
        const [updated] = await Courier.update(updateData, { where: { id } });
        return updated;
    } catch (error) {
        logger.error(`[courierService.js] Error updating courier ID ${id}: ${error.message}`);
        throw error;
    }
};

//! Delete courier by ID
const deleteCourier = async (id) => {
    try {
        return await Courier.update({ isDeleted: 0 }, { where: { id } });
    } catch (error) {
        logger.error(`[courierService.js] Error deleting courier ID ${id}: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getAllCouriers,
    getCourierById,
    getAllCouriersWithCustomers,
    getCourierByIdWithCustomer,
    createCourier,
    updateCourier,
    deleteCourier,
};
