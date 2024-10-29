// routes/purchaseOrderRoutes.js
const express = require('express');
const router = express.Router();
const { createPurchaseOrder, getAllPurchaseOrders ,getPurchaseOrderById,updatePurchaseOrder,deletePurchaseOrder} = require('../controllers/purchaseOrderController');
const authMiddleware = require('../middleware/auth');
router.post('/additem',authMiddleware, createPurchaseOrder);
router.get('/all',authMiddleware, getAllPurchaseOrders);
router.get('/:id',authMiddleware, getPurchaseOrderById);
// Update Purchase Order by ID
router.put('/:id', authMiddleware, updatePurchaseOrder);

router.delete('/:id',authMiddleware, deletePurchaseOrder);



module.exports = router;
