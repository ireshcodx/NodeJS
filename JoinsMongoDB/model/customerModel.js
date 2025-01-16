const { required } = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  delivery_route_id:{type: String,required:true},
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: String, required: true },
  updatedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Customer = mongoose.model('Customer', customerSchema);
// console.log('IN Customer Model');
module.exports = Customer;