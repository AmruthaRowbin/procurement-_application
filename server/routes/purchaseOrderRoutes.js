// routes/purchaseOrderRoutes.js
const express = require('express');
const router = express.Router();
const { createPurchaseOrder, getAllPurchaseOrders ,getPurchaseOrderById,updatePurchaseOrder,deletePurchaseOrder} = require('../controllers/purchaseOrderController');

router.post('/additem', createPurchaseOrder);
router.get('/all', getAllPurchaseOrders);
router.get('/:id', getPurchaseOrderById);
// Update Purchase Order by ID
router.put('/:id', updatePurchaseOrder);

router.delete('/:id',deletePurchaseOrder);



module.exports = router;
