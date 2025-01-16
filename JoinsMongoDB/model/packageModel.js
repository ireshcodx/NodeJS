const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  courier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier', required: true },
  weight: { type: Number, required: true },
  status: { type: String, enum: ['In Transit', 'Delivered', 'Pending'], required: true },
  delivery_date: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: String, required: true },
  updatedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Package = mongoose.model('Package', packageSchema);
// console.log('In packageModel');
module.exports = Package;