require('dotenv').config();
const logger = require('../logs/logger');

const CL_COURIER = process.env.CL_COURIER;
const CL_CUSTOMER = process.env.CL_CUSTOMER;
const CL_PACKAGE = process.env.CL_PACKAGE;
const CL_DELIVERY = process.env.CL_DELIVERY;

const getCustomerWithPackages = async () => {
  // const db = 
  const result = await db.collection(CL_PACKAGE).aggregate([
    {
      $lookup: {
        from: CL_CUSTOMER,
        localField: 'customer_id',
        foreignField: '_id',
        as: 'customerDetails'
      }
    },
    {
      $unwind: '$customerDetails'
    }
  ]).toArray();
  logger.info(`[joinsService.js] fetched ${result.length} packages with customer details`);
  return result;
};

const getPackagesWithCourierDetails = async () => {
  const result = await db.collection(CL_PACKAGE).aggregate([
    {
      $lookup: {
        from: CL_COURIER,
        localField: 'courier_id',
        foreignField: '_id',
        as: 'courierDetails'
      }
    },
    {
      $unwind: '$courierDetails'
    }
  ]).toArray();
  logger.info(`[joinsService.js] fetched ${result.length} packages with courier details`);
  return result;
};

const getDeliveryRouteWithCourier = async () => {
  const result = await db.collection(CL_DELIVERY).aggregate([
    {
      $lookup: {
        from: CL_COURIER,
        localField: 'courier_id',
        foreignField: '_id',
        as: 'courierDetails'
      }
    },
    {
      $unwind: {
        path: '$courierDetails',
        preserveNullAndEmptyArrays: true // In case no courier is assigned
      }
    }
  ]).toArray();
  logger.info(`[joinsService.js] fetched ${result.length} delivery routes with courier details`);
  return result;
};

const getCompletePackageDetails = async () => {
  const result = await db.collection(CL_PACKAGE).aggregate([
    {
      $lookup: {
        from: CL_CUSTOMER,
        localField: 'customer_id',
        foreignField: '_id',
        as: 'customerDetails'
      }
    },
    {
      $unwind: '$customerDetails'
    },
    {
      $lookup: {
        from: CL_COURIER,
        localField: 'courier_id',
        foreignField: '_id',
        as: 'courierDetails'
      }
    },
    {
      $unwind: '$courierDetails'
    }
  ]).toArray();
  logger.info(`[joinsService.js] fetched ${result.length} complete package details`);
  return result;
};

module.exports = {
  getCustomerWithPackages,
  getPackagesWithCourierDetails,
  getDeliveryRouteWithCourier,
  getCompletePackageDetails
};