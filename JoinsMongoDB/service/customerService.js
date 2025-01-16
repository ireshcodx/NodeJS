const Customer = require('../model/customerModel');
const Courier = require('../model/courierModel');
const Package = require('../model/packageModel');
const DeliveryRoute = require('../model/deliveryRoutesModel');
const logger = require('../logs/logger');
const mongoose = require('mongoose');

//! Add a new customer
const addCustomer = async (customerData) => {
  const customer = new Customer(customerData);
  return await customer.save();
};

//! Get all customers
const getAllCustomers = async () => {
  return await Customer.find({ isDeleted: false });
};

//! Get customer by ID
const getCustomerById = async (id) => {
  return await Customer.findOne({ _id: id, isDeleted: false });
};

//! Update customer
const updateCustomer = async (id, customerData) => {
  return await Customer.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...customerData, updatedAt: new Date() },
    { new: true }
  );
};

//! Soft delete customer
const deleteCustomer = async (id) => {
  const customer = await Customer.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, updatedAt: new Date() },
    { new: true }
  );
  return customer;
};

//! Join Package and Delivery (Example: linking a customer to a courier)
const joinPackageAndDeliveryRoute = async (packageId) => {
  try {
    // Ensure the packageId is an ObjectId (using new ObjectId())
    const objectId = new mongoose.Types.ObjectId(packageId); // Use 'new' here

    // Perform aggregation to join the package with customer, delivery route, and courier
    const result = await Package.aggregate([
      {
        $match: { _id: objectId, isDeleted: false }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: {
          path: '$customer',
          preserveNullAndEmptyArrays: true // This ensures we still get the package even if customer is not found
        }
      },
      {
        $lookup: {
          from: 'deliveryroutes',
          localField: 'customer.delivery_route_id',
          foreignField: '_id',
          as: 'deliveryRoute'
        }
      },
      {
        $unwind: {
          path: '$deliveryRoute',
          preserveNullAndEmptyArrays: true // Same for deliveryRoute
        }
      },
      {
        $lookup: {
          from: 'couriers',
          localField: 'deliveryRoute.courier_id',
          foreignField: '_id',
          as: 'courier'
        }
      },
      {
        $unwind: {
          path: '$courier',
          preserveNullAndEmptyArrays: true // Same for courier
        }
      },
      {
        $project: {
          package: 1,
          customer: 1,
          deliveryRoute: 1,
          courier: 1
        }
      }
    ]);

    if (result.length === 0) {
      throw new Error('No data found after join');
    }

    const combinedResult = result[0];

    logger.info(`[customerService.js] Successfully joined package with delivery route, customer, and courier`);

    return combinedResult;
  } catch (error) {
    logger.error(`[customerService.js] Error joining package with delivery route, customer, and courier: ${error.message}`);
    throw error;
  }
};

const getCustomerAndRoutesByDeliveryRouteId = async (deliveryRouteId) => {
  try {
    // Ensure the deliveryRouteId is an ObjectId
    const objectId = new mongoose.Types.ObjectId(deliveryRouteId);

    // Perform aggregation to join customer and routes based on delivery_route_id
    const result = await DeliveryRoute.aggregate([
      {
        $match: { _id: objectId, isDeleted: false } // Match the specific delivery route
      },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: 'delivery_route_id',
          as: 'customers'
        }
      },
      {
        $unwind: {
          path: '$customers',
          preserveNullAndEmptyArrays: true // If no customers are linked, still return the route
        }
      },
      {
        $lookup: {
          from: 'couriers',
          localField: 'courier_id',
          foreignField: '_id',
          as: 'courier'
        }
      },
      {
        $unwind: {
          path: '$courier',
          preserveNullAndEmptyArrays: true // If no courier is linked, return route with null courier
        }
      },
      {
        $project: {
          routeDetails: {
            route: '$route',
            courier: '$courier'
          },
          customer: '$customers'
        }
      }
    ]);

    if (result.length === 0) {
      throw new Error('No data found for the given delivery route ID');
    }

    logger.info(`[deliveryService.js] Successfully retrieved customer and route for delivery route ID: ${deliveryRouteId}`);

    return result;
  } catch (error) {
    logger.error(`[deliveryService.js] Error retrieving customer and route: ${error.message}`);
    throw error;
  }
};

module.exports = { 
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  joinPackageAndDeliveryRoute,
  getCustomerAndRoutesByDeliveryRouteId
};
