// models/Supplier.js
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  supplierNo: { type: String, unique: true },
  supplierName: { type: String, required: true },
  address: String,
  taxNo: String,
  country: String,
  mobileNo: String,
  email: { type: String, unique: true, required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Active' }
});

module.exports = mongoose.model('Supplier', SupplierSchema);
