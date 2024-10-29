// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const { createSupplier, getAllSuppliers ,updateSupplier,getSupplierById,deleteSupplier } = require('../controllers/supplierController');

router.post('/create', createSupplier);
router.get('/all', getAllSuppliers);
router.put('/:id', updateSupplier);
router.get('/:id', getSupplierById);
router.delete('/:id', deleteSupplier);

module.exports = router;
