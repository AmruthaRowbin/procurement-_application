// models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemNo: { type: String, unique: true },
  name: { type: String, required: true },
  inventoryLocation: String,
  brand: String,
  category: String,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  stockUnit: String,
  unitPrice: Number,
  images: [String],
  status: { type: String, enum: ['Enabled', 'Disabled'], default: 'Enabled' }
});

module.exports = mongoose.model('Item', ItemSchema);
