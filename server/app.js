const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Route imports
const supplierRoutes = require('./routes/supplierRoutes')
const itemRoutes = require('./routes/itemRoutes')
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const adminRoutes = require('./routes/adminroutes');

// MongoDB connection

connectDB();

// Routes
// Routes
app.use('/api/admin', adminRoutes);            // Admin login
app.use('/api/suppliers', supplierRoutes);     // Protected routes
app.use('/api/items', itemRoutes);             // Protected routes
app.use('/api/purchase-orders', purchaseOrderRoutes);

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
