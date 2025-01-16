const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vehicle: { type: String, required: true },
  assigned_region: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: String, required: true },
  updatedBy: { type: String, required: true }
}, { timestamps: true }); //! Automatically adds createdAt and updatedAt fields

// Middleware to handle updatedAt on update
courierSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Courier', courierSchema);