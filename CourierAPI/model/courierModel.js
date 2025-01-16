const mongoose = require('mongoose');
const courierSchema = require('./courierSchema');
const logger = require('../logs/logger');

logger.info('[courierModel.js] Courier model initialized');

module.exports = mongoose.model('CourierSystem', courierSchema);