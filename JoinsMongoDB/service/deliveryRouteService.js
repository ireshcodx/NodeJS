const DeliveryRoute = require('../model/deliveryRoutesModel');
const Courier = require('../model/courierModel'); 
const Customer = require('../model/customerModel');

const addDeliveryRoute = async (routeData) => {
  const route = new DeliveryRoute(routeData);
  return await route.save();
};

const getAllDeliveryRoutes = async () => {
  return await DeliveryRoute.find({ isDeleted: false }).populate('courier_id', 'name vehicle assigned_region');
};

const getDeliveryRouteById = async (id) => {
  return await DeliveryRoute.findOne({ _id: id, isDeleted: false }).populate('courier_id', 'name vehicle assigned_region');
};

const updateDeliveryRoute = async (id, routeData) => {
  console.log('route Data from Service',routeData);
  const updatedRoute = await DeliveryRoute.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...routeData, updatedAt: new Date() },
    { new: true }
  );
  return updatedRoute;
};

const deleteDeliveryRoute = async (id) => {
  const deletedRoute = await DeliveryRoute.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, updatedAt: new Date() },
    { new: true }
  );
  return deletedRoute;
};

//! Join Delivery Route with Customer (Link Delivery Route to a Customer)
const joinDeliveryRouteAndCustomer = async (routeId, customerId) => {
  try {
    const route = await DeliveryRoute.findById(routeId);
    const customer = await Customer.findById(customerId);

    if (!route || !customer) {
      throw new Error('Delivery route or customer not found');
    }

    route.customer_id = customerId; //? Linking customer to delivery route
    await route.save();

    return { message: 'Delivery route successfully linked to customer', route };
  } catch (error) {
    throw new Error(`Error linking delivery route to customer: ${error.message}`);
  }
};

//! Join Delivery Route with Courier (Link Delivery Route to a Courier)
const joinDeliveryRouteAndCourier = async (routeId, courierId) => {
  try {
    const route = await DeliveryRoute.findById(routeId);
    const courier = await Courier.findById(courierId);

    if (!route || !courier) {
      throw new Error('Delivery route or courier not found');
    }

    route.courier_id = courierId; //? Linking courier to delivery route
    await route.save();

    return { message: 'Delivery route successfully linked to courier', route };
  } catch (error) {
    throw new Error(`Error linking delivery route to courier: ${error.message}`);
  }
};

module.exports = {
  addDeliveryRoute,
  getAllDeliveryRoutes,
  getDeliveryRouteById,
  updateDeliveryRoute,
  deleteDeliveryRoute,
  joinDeliveryRouteAndCustomer,
  joinDeliveryRouteAndCourier
};
