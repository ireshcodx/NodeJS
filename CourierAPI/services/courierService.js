const logger = require('../logs/logger');
  const { ObjectId } = require('mongodb');

require('dotenv').config();
const clName = process.env.CL_NAME;
//todo Create a courier
// const createCourier = async (data, db) => {
//   data.isDeleted = false;                 //! adding isDeleted for softDelete
//   const date = new Date();
//   const month = date.getMonth() + 1;
//   const dates = date.getDate();
//   const year = date.getFullYear();
//   data.created_Date = `${dates}/${month}/${year}`;
//   const createDateObject = new date(date.getDate() + 5);
//   data.expectedDate = createDateObject.toISOString().split('T')[0];
//   const result = await db.collection(clName).insertOne(data);         //? Using MongoDB library method
//   logger.info('[courierService.js] Courier saved to database');
//   return {
//     result: result, date: {
//       created_Date: data.created_Date,
//       expectedDate: data.expectedDate
//     }
//   };
// };

//todo Update a courier
// const updateCourier = async (data, db) => {
//   const result = await db.collection('couriers').findOneAndUpdate(
//     { _id: new ObjectId(data._id) },
//     {
//       $set: {
//         created_Date: data.created_Date,

//         expectedDate: new Date(new Date(data.created_Date).getTime() + 5 * 24 * 60 * 60 * 1000),
//         primary_No: data.primary_No,
//         secondary_No: data.secondary_No
//       }
//     },
//     { returnOriginal: false }
//   );
//   logger.info('Courier updated in database');
//   console.log('from service',result.value);
//   return result.value;
// };

const createCourier = async (data, db) => {
  data.isDeleted = false;  
  const date = new Date();                                         //todo adding Current date
  const month = date.getMonth() + 1;
  const dates = date.getDate();
  const year = date.getFullYear();
  data.created_Date = `${dates}/${month}/${year}`;                  //? Saving as string
  const createdDateObject = new Date(date);                         //! Cloning the current date
  createdDateObject.setDate(date.getDate() + 5);                    //todo Adding 5 days
  data.expectedDate = createdDateObject.toISOString().split('T')[0]; 

  //! some default fields in DB
  data.createdAt = `${dates}/${month}/${year}`;
  data.createdBy = 'admin';
  data.updatedAt = `Not updated till now`;
  data.updatedBy = 'Not updated till now'
  const result = await db.collection(clName).insertOne(data);       //? Using MongoDB library method
  logger.info('[courierService.js] Courier saved to database');
  return result;
};


const updateCourier = async (data, db) => {
  const updateFields = {};
  const now = new Date();
  updateFields.updatedAt = now;
  updateFields.updatedBy = 'admin';
  if (data.created_Date) {
    updateFields.created_Date = data.created_Date;
  }
  if (data.expectedDate) {
    updateFields.expectedDate = data.expectedDate;
  }
  if (data.primary_No) {
    updateFields.primary_No = data.primary_No;
  }
  if (data.secondary_No) {
    updateFields.secondary_No = data.secondary_No;
  }
  //! Handled nested address update
  if (data.address) {
    if (data.address.office) {
      updateFields['address.office'] = data.address.office || updateFields['address.office'];
    }
    if (data.address.permanent) {
      updateFields['address.permanent'] = data.address.permanent || updateFields['address.permanent'];
    }
  }

  const result = await db.collection(clName).findOneAndUpdate(
    { _id: new ObjectId(data._id) },
    { $set: updateFields },
    { returnDocument: 'after' }
  );

  logger.info('[courierService.js] Courier updated in database');
  // console.log('from service ', result);
  return result;
};


//todo Delete a courier (soft deleting courier)
const deleteCourier = async (id, db) => {
  const result = await db.collection(clName).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { isDeleted: true } },
    { returnOriginal: false }
  );
  console.log('from service ', result);
  logger.info('[courierService.js] Courier soft deleted in database');
  return `Deleted ID ${id}`; //! returning deleted ID
};

//todo Fetch all couriers (non-deleted)
const getAllCouriers = async (db) => {
  const result = await db.collection(clName).find({ isDeleted: false }).toArray(); //! restricting softDeleted courier
  logger.info('[courierService.js] Fetched non-deleted couriers from database');
  return result;
};

//todo Fetch a courier by ID
const getCourierById = async (id, db) => {
  try {
    const result = await db.collection(clName).findOne({ _id: new ObjectId(id), isDeleted: false });
    
    if (!result) {
      logger.warn('[courierService.js] No courier found with the given ID');
      return { message: 'Courier not found' };
    }

    logger.info('[courierService.js] Fetched courier by ID from database');
    return result;
  } catch (error) {
    logger.error(`[courierService.js] Error fetching courier by ID: ${error.message}`);
    throw error;
  }
};
module.exports = {
  createCourier,
  updateCourier,
  getAllCouriers,
  deleteCourier,
  getCourierById
}