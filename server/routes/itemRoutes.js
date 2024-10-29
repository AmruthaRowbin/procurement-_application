// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { createItem, getAllItems,updateItem ,getItemById,deleteItem} = require('../controllers/itemController');
const authMiddleware = require('../middleware/auth');
router.post('/additem',upload.single('image'), createItem);
router.get('/all',authMiddleware, getAllItems);
router.put('/:id',upload.single('image') ,updateItem);
router.get('/:id', authMiddleware,getItemById);
router.delete('/:id',authMiddleware, deleteItem);


module.exports = router;
