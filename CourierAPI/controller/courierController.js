const { createCourierValidation, updateCourierValidation, IdCourierValidation } = require('../middleware/validation');
const courierService = require('../services/courierService');
const logger = require('../logs/logger');

//todo Create a courier
const createCourier = async (req, res) => {
  const { error } = createCourierValidation(req.body);
  if (error) {
    // console.log('from Controller ',error);
    logger.error(`[courierController.js] Validation Error: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // console.log(req.body);
    const db = req.app.locals.db;         //! Access db instance from app locals
    const result = await courierService.createCourier(req.body, db);
    logger.info('Courier created successfully');
    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    logger.error(`[courierController.js] Creation Error: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }
};

//todo Update a courier
const updateCourier = async (req, res) => {
  const { error } = updateCourierValidation(req.body);
  // console.log('from validation',error);
  if (error) {
    logger.error(`[courierController.js] Validation Error: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const db = req.app.locals.db;
    const result = await courierService.updateCourier(req.body, db);
    logger.info('[courierController.js] Courier updated successfully');
    // console.log('from controller ',result);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`[courierController.js] Update Error: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }
};

//todo Soft delete a courier
const deleteCourier = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.body.id;
    // console.log('from controller ',req.body.id);
    const result = await courierService.deleteCourier(id, db);
    logger.info('[courierController.js] Courier soft deleted successfully');
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`[courierController.js] Deletion Error: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }
};

//todo Get all couriers
const getAllCouriers = async (req, res) => {
  if(req.body && Object.keys(req.body).length > 0){
    logger.error('[courierController.js] Received request body');
    return res.status(400).json({ error: 'Request body is not allowed' });
  }
  try {
    const db = req.app.locals.db;
    const result = await courierService.getAllCouriers(db);
    logger.info('[courierController.js] Fetched all couriers');
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`[courierController.js] Fetch Error: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }
};

//todo Get courier by id
const getCourierById = async (req,res) => {
  const { error } = IdCourierValidation(req.body.id);
  if(error){
    logger.error('[courierController.js] Validation Error: ', error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const db = req.app.locals.db;
    const id = req.body._id;
    const result = await courierService.getCourierById(id, db);
    logger.info('[courierController.js] Fetched courier by id');
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`[courierController.js] Fetch Error: ${error.message}`);
    return res.status(400).json({error: error.message})
  }
}
module.exports = {
  getAllCouriers,
  deleteCourier,
  createCourier,
  updateCourier,
  getCourierById
}