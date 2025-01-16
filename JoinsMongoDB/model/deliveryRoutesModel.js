const mongoose = require('mongoose');

const deliveryRouteSchema = new mongoose.Schema({
    courier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier', required: true },
    route: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
const DeliveryRoute = mongoose.model('DeliveryRoute', deliveryRouteSchema);
// console.log('In deliveryRoutes Model');
module.exports = DeliveryRoute;