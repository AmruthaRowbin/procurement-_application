// models/PurchaseOrder.js
const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
  orderNo: { type: String, unique: true },
  orderDate: { type: Date, default: Date.now },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  itemTotal: { type: Number, default: 0 },
  discount: { type: Number},
  netAmount: { type: Number, default: 0 },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      orderQty: { type: Number, required: true },
      itemAmount: Number,
      discount: Number,
      netAmount: Number
    }
  ]
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
