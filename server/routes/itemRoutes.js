// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { createItem, getAllItems,updateItem ,getItemById,deleteItem} = require('../controllers/itemController');

router.post('/additem',upload.single('image'), createItem);
router.get('/all', getAllItems);
router.put('/:id',upload.single('image') ,updateItem);
router.get('/:id', getItemById);
router.delete('/:id', deleteItem);


module.exports = router;
