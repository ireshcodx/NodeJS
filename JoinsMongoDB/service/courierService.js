// require('dotenv').config();
// const { json } = require('express');
// // const { ObjectId } = require('mongodb');
// const logger = require('../logs/logger');
// const CustomerDbName = process.env.CL_CUSTOMER;
// const CourierDBName = process.env.CL_COURIER;
// const PackageDBName = process.env.CL_PACKAGE;
// const DeliveryDBName = process.env.CL_DELIVERY;

// //! to get all customers
// const getAllCustomers = async (db) => {
//     const result = await db.collection(CustomerDbName).find().toArray();
//     logger.info('[courierService.js] fetched Cutomers from DB');
//     // console.log('from service', result);
//     return result;
// }

// //! to get all couriers
// const getAllCouriers = async (db) => {
//     const result = await db.collection(CourierDBName).find().toArray();
//     logger.info('[courierService.js] fetched Couriers from DB');
//     return result;
// }

// //! to get all Package
// const getAllPackage = async (db) => {
//     const result = await db.collection(PackageDBName).find().toArray();
//     logger.info('[courierService.js] fetched Packages from DB');
//     return result;
// }

// //! to get all Delivery
// const getAllDelivery = async (db) => {
//     const result = await db.collection(DeliveryDBName).find().toArray();
//     logger.info('[courierService.js] fetched Delivery Routes from DB');
//     return result;
// }

// //! to get all packages with customers and couriers to show full delivery details (2 Joins)
// const getFullDeliveryDetails = async (db) => {
//     try {
//         const result = await db.collection(PackageDBName).aggregate([
//             {
//                 //! 1st lookup to join 'package' collection with 'customers'
//                 $lookup: {  
//                     from: CustomerDbName, //! collection to join 
//                     localField: 'customer_id', //? field from packages
//                     foreignField: '_id', //? field from customers
//                     as: 'customer_details' //? alias name
//                 }
//             },
//             {
//                 //! 2nd lookup to join 'package' collection with 'couriers'
//                 $lookup: {
//                     from: CourierDBName,
//                     localField: 'courier_id',
//                     foreignField: '_id', 
//                     as: 'courier_details' 
//                 }
//             },
//             { $unwind: "$customer_details" }, //todo flatten the 'customer_details' array using $unwind
//             { $unwind: "$courier_details" } 
//         ]).toArray(); //! converting cursor to array for ease handle

//         logger.info(`[courierService.js] fetched Full Delivery Details from DB ${JSON.stringify(result)}`);
//         return result;
//     } catch (error) {
//         logger.error(`Error fetching delivery details `,error);
//         console.error("Error fetching delivery details:", error);
//         throw error; 
//     }
// };

// //! all Packages with Customer and Courier Information Along with Delivery Route Details (3 Joins)
// const getFullDeliveryWithRouteDetails = async (db) => {
//     try {
//         const result = await db.collection(PackageDBName).aggregate([
//             {
//                 $lookup: {
//                     from: CustomerDbName,
//                     localField: 'customer_id',
//                     foreignField: '_id',
//                     as: 'customer_details'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: CourierDBName,
//                     localField: 'courier_id',
//                     foreignField: '_id',
//                     as: 'courier_details'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: DeliveryDBName,
//                     localField: 'courier_id',
//                     foreignField: 'courier_id',
//                     as: 'delivery_route'
//                 }
//             },
//             { $unwind: "$customer_details" },
//             { $unwind: "$courier_details" },
//             { $unwind: "$delivery_route" },
//             {
//                 $project: {
//                     _id: 1,
//                     "customer_details.name": 1,
//                     "courier_details.name": 1,
//                     "delivery_route.route": 1,
//                     weight: 1,
//                     status: 1,
//                     delivery_date: 1
//                 }
//             }
//         ]).toArray();
//         logger.info(`[courierService.js] Fetched full delivery details with route details ${JSON.stringify(result)}`);
//         return result;
//     } catch (error) {
//         logger.error("Error fetching delivery with route details:", error);
//         throw error;
//     }
// };

// module.exports = {
//     getAllCustomers,
//     getAllCouriers,
//     getAllPackage,
//     getAllDelivery,
//     getFullDeliveryDetails,
//     getFullDeliveryWithRouteDetails
// }

const Courier = require('../model/courierModel');
const Customer = require('../model/customerModel');
const Package = require('../model/packageModel'); 
const DeliveryRoute = require('../model/deliveryRoutesModel'); 
const logger = require('../logs/logger');

//! Add a new courier
const addCourier = async (courierData) => {
  try {
    const courier = new Courier(courierData);
    const savedCourier = await courier.save();
    logger.info('[courierService.js] Courier added successfully');
    return savedCourier;
  } catch (error) {
    logger.error(`[courierService.js] Error adding courier: ${error.message}`);
    throw error;
  }
};

//! Get all couriers
const getAllCouriers = async () => {
  try {
    const couriers = await Courier.find({isDeleted: false});
    logger.info('[courierService.js] Fetched all couriers');
    return couriers;
  } catch (error) {
    logger.error(`[courierService.js] Error fetching couriers: ${error.message}`);
    throw error;
  }
};

//! Get courier by ID
const getCourierById = async (id) => {
  try {
    const courier = await Courier.findOne({ _id: id, isDeleted: false });
    if (!courier) {
      logger.warn(`[courierService.js] Courier with ID ${id} not found`);
      throw new Error('Courier not found');
    }
    logger.info(`[courierService.js] Fetched courier with ID ${id}`);
    return courier;
  } catch (error) {
    logger.error(`[courierService.js] Error fetching courier by ID: ${error.message}`);
    throw error;
  }
};

//! Update courier
const updateCourier = async (id, updateData) => {
  try {
    const updatedCourier = await Courier.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCourier) {
      logger.warn(`[courierService.js] Courier with ID ${id} not found for update`);
      throw new Error('Courier not found');
    }
    logger.info(`[courierService.js] Updated courier with ID ${id}`);
    return updatedCourier;
  } catch (error) {
    logger.error(`[courierService.js] Error updating courier: ${error.message}`);
    throw error;
  }
};

//! Soft delete courier
const deleteCourier = async (id) => {
  try {
    const deletedCourier = await Courier.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deletedCourier) {
      logger.warn(`[courierService.js] Courier with ID ${id} not found for soft delete`);
      throw new Error('Courier not found');
    }
    logger.info(`[courierService.js] Soft deleted courier with ID ${id}`);
    return deletedCourier;
  } catch (error) {
    logger.error(`[courierService.js] Error soft deleting courier: ${error.message}`);
    throw error;
  }
};

//! Join Courier and Customer
const joinCourierAndCustomer = async (courierId) => {
  try {
    // Find package with the courierId
    const packageItem = await Package.findOne({ courierId: courierId, isDeleted: false });
    console.log(packageItem);
    if (!packageItem) {
      logger.warn(`[courierService.js] Package with courierId ${courierId} not found`);
      throw new Error('Package not found');
    }

    // Find the associated customer by customerId from the package
    const customer = await Customer.findOne({ _id: packageItem.customer_Id, isDeleted: false });
    if (!customer) {
      logger.warn(`[courierService.js] Customer with ID ${packageItem.customer_Id} not found`);
      throw new Error('Customer not found');
    }

    logger.info(`[courierService.js] Joined courier with ID ${courierId} and customer with ID ${customer._id}`);
    return { packageItem, customer };
  } catch (error) {
    logger.error(`[courierService.js] Error joining courier and customer: ${error.message}`);
    throw error;
  }
};


//! Join Package and Delivery Route
const joinPackageAndDeliveryRoute = async (packageId) => {
  try {
    // Find the package by ID
    const packageItem = await Package.findOne({ _id: packageId, isDeleted: false });
    if (!packageItem) {
      logger.warn(`[courierService.js] Package with ID ${packageId} not found`);
      throw new Error('Package not found');
    }

    // Find the associated delivery route by courierId from the package
    const deliveryRoute = await DeliveryRoute.findOne({ courierId: packageItem.courierId, isDeleted: false });
    if (!deliveryRoute) {
      logger.warn(`[courierService.js] Delivery Route with courierId ${packageItem.courierId} not found`);
      throw new Error('Delivery Route not found');
    }

    logger.info(`[courierService.js] Joined package with ID ${packageId} and delivery route with ID ${deliveryRoute._id}`);
    return { packageItem, deliveryRoute };
  } catch (error) {
    logger.error(`[courierService.js] Error joining package and delivery route: ${error.message}`);
    throw error;
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
