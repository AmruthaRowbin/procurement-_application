// controllers/itemController.js
const Item = require('../models/Item');
const Supplier = require('../models/Supplier'); 


// Create Item
exports.createItem = async (req, res) => {
  const { name, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, status } = req.body;

  try {
    // Check if the supplier exists
    const supplierExists = await Supplier.findById(supplier);
    if (!supplierExists) {
      return res.status(400).json({ message: 'Supplier does not exist' });
    }

    // Check if an item with the same name already exists for this supplier
    const existingItem = await Item.findOne({ name, supplier });
    if (existingItem) {
      return res.status(400).json({ message: 'This item already exists for the selected supplier' });
    }

    // Find the last item number and auto-generate the new one
    const lastItem = await Item.findOne().sort({ itemNo: -1 });
    const newItemNo = lastItem ? parseInt(lastItem.itemNo, 10) + 1 : 1;

    // Create the new item, adding the image path from multer
    const newItem = new Item({
      itemNo: newItemNo,
      name,
      inventoryLocation,
      brand,
      category,
      supplier,
      stockUnit,
      unitPrice,
      images: req.file ? req.file.path : '', // Set image path from uploaded file
      status,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get All Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('supplier');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Item
// controllers/itemController.js

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, status } = req.body;
  
  // Retrieve the uploaded image file information
  const image = req.file ? req.file.path : null; // Assuming your multer configuration saves the image and provides a path

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check for duplicate item name with the same supplier (excluding the current item)
    const existingItem = await Item.findOne({ 
      name, 
      supplier, 
      _id: { $ne: id } // Exclude the current item from the check
    });

    if (existingItem) {
      return res.status(400).json({ message: 'An item with this name already exists for the selected supplier' });
    }

    // Update item details
    item.name = name || item.name;
    item.inventoryLocation = inventoryLocation || item.inventoryLocation;
    item.brand = brand || item.brand;
    item.category = category || item.category;
    item.supplier = supplier || item.supplier;
    item.stockUnit = stockUnit || item.stockUnit;
    item.unitPrice = unitPrice || item.unitPrice;
    
    // Update image if a new one is uploaded
    if (image) {
      item.images = image; // Assuming `images` field is meant to hold the path to the uploaded image
    }

    item.status = status || item.status;

    await item.save();
    res.json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete Item
exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Use findByIdAndDelete to delete the item directly
    const deletedItem = await Item.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get Item by ID
exports.getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id).populate('supplier'); // Populate supplier details if needed
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
