// controllers/supplierController.js
const Supplier = require('../models/Supplier');

// Create Supplier
exports.createSupplier = async (req, res) => {
  const { supplierName, address, taxNo, country, mobileNo, email, status } = req.body;

  try {
    // Check if supplier with the same name or email exists
    const existingSupplier = await Supplier.findOne({ 
      $or: [{ supplierName }, { email }] 
    });

    if (existingSupplier) {
      return res.status(400).json({ message: 'Supplier with this name or email already exists' });
    }

    
    const existingSuppliers = await Supplier.find({});
    

    // Find the highest existing supplier number and auto-generate the new one
    const lastSupplier = await Supplier.findOne().sort({ supplierNo: -1 })
    

    // Ensure that we start from 1 and increment properly, converting supplierNo to number
    const newSupplierNo = lastSupplier ? parseInt(lastSupplier.supplierNo, 10) + 1 : 1;

    const newSupplier = new Supplier({
      supplierNo: newSupplierNo,
      supplierName,
      address,
      taxNo,
      country,
      mobileNo,
      email,
      status,
    });

    await newSupplier.save();
    res.status(201).json({ message: 'Supplier created successfully', supplier: newSupplier });
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get All Suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Supplier
exports.updateSupplier = async (req, res) => {
  const { id } = req.params; 
  const { supplierName, address, taxNo, country, mobileNo, email, status } = req.body;

  try {
    // Check if the supplier exists
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Update the supplier details
    supplier.supplierName = supplierName || supplier.supplierName;
    supplier.address = address || supplier.address;
    supplier.taxNo = taxNo || supplier.taxNo;
    supplier.country = country || supplier.country;
    supplier.mobileNo = mobileNo || supplier.mobileNo;
    supplier.email = email || supplier.email;
    supplier.status = status || supplier.status;

    await supplier.save(); 

    res.json({ message: 'Supplier updated successfully', supplier });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get Supplier by ID
exports.getSupplierById = async (req, res) => {
  const { id } = req.params; // Get the supplier ID from the request parameters

  try {
    const supplier = await Supplier.findById(id); // Find the supplier by ID
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.json(supplier); // Return the supplier details
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete Supplier
exports.deleteSupplier = async (req, res) => {
  const { id } = req.params; // Get the supplier ID from the request parameters

  try {
    const supplier = await Supplier.findById(id); // Find the supplier by ID
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    await supplier.remove(); // Remove the supplier from the database
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

