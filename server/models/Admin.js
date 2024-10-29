// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},

email: {
    type: String,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true
},

status: {
    type: Boolean,
    default: true
},
  role: { type: String, default: 'admin' }
});



module.exports = mongoose.model('Admin', AdminSchema);
