// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const { createSupplier, getAllSuppliers ,updateSupplier,getSupplierById,deleteSupplier } = require('../controllers/supplierController');
const authMiddleware = require('../middleware/auth');
router.post('/create',authMiddleware, createSupplier);
router.get('/all',authMiddleware, getAllSuppliers);
router.put('/:id',authMiddleware, updateSupplier);
router.get('/:id',authMiddleware, getSupplierById);
router.delete('/:id',authMiddleware, deleteSupplier);

module.exports = router;
