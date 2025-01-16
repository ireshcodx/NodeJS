const mongoose = require('mongoose');
const logger = require('../logs/logger');

const addressSchema = new mongoose.Schema({
  office: { type: String, maxlength: 200, required: true },
  permanent: { type: String, maxlength: 200, required: true }
});

const courierSchema = new mongoose.Schema({
  from_CustomerName: { type: String, required: true },
  to_CustomerName: { type: String, required: true },
  address: { type: addressSchema, required: true },
  primary_No: { type: String, required: true },
  secondary_No: { type: String },
  created_Date: { type: Date, default: Date.now },
  expectedDate: { type: Date },
  isDeleted: { type: Boolean, default: false }
});

courierSchema.pre('save', function(next) {
  if (!this.expectedDate) {
    this.expectedDate = new Date(this.created_Date.getTime() + 5 * 24 * 60 * 60 * 1000);
  }
  next();
});

logger.info('[courierModel.js] Courier schema initialized');

module.exports = courierSchema;