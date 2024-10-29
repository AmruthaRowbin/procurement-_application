// controllers/purchaseOrderController.js
const PurchaseOrder = require('../models/PurchaseOrder');
const Item = require('../models/Item');
const Supplier = require('../models/Supplier');

exports.createPurchaseOrder = async (req, res) => {
  const { supplier: supplierId, items } = req.body;  // Rename supplier to supplierId
  console.log(req.body, "ooooooooooooooooooooo");

  try {
    // Validate supplier
    const foundSupplier = await Supplier.findById(supplierId);  // Use foundSupplier instead of supplier
    if (!foundSupplier || foundSupplier.status !== 'Active') {
      return res.status(400).json({ message: 'Invalid supplier' });
    }

    let itemTotal = 0;
    let discountTotal = 0;
    const invalidItems = [];  // Track items that don’t belong to the supplier

    // Validate items and ensure they belong to the specified supplier
    const purchaseItems = await Promise.all(items.map(async (itemss) => {
      const foundItem = await Item.findById(itemss.item);
      console.log(foundItem,"777777777777777777777")
      
      // Check if the item exists and is associated with the correct supplier
      if (!foundItem) {
        invalidItems.push({ itemId: itemss.item, reason: 'Item not found' });
        return null;
      }
      if (foundItem.supplier.toString() !== foundSupplier._id.toString()) {
        invalidItems.push({ itemId: itemss.item, reason: 'Item does not belong to the specified supplier' });
        return null;
      }

      // Calculate amounts
      const itemAmount = itemss.orderQty * foundItem.unitPrice;
      const netAmount = itemAmount - itemss.discount;

      // Update totals
      itemTotal += itemAmount;
      discountTotal += itemss.discount;

      return {
        item: foundItem._id,
        itemNo: foundItem.itemNo,
        itemName: foundItem.name,
        stockUnit: foundItem.stockUnit,
        unitPrice: foundItem.unitPrice,
        packingUnit: itemss.packingUnit,
        orderQty: itemss.orderQty,
        itemAmount,
        discount: itemss.discount,
        netAmount,
      };
    }));

    // Filter out invalid (null) items from purchaseItems
    const validPurchaseItems = purchaseItems.filter(i => i !== null);

    // Check if any valid items exist
    if (validPurchaseItems.length === 0) {
      return res.status(400).json({ message: 'No valid items for the specified supplier', invalidItems });
    }

    // Create the purchase order
    const purchaseOrder = new PurchaseOrder({
      orderNo: await PurchaseOrder.countDocuments() + 1, // Auto-generate order number
      supplier: foundSupplier._id,  // Use foundSupplier instead of supplier
      items: validPurchaseItems,
      itemTotal,
      discountTotal,
      netAmount: itemTotal - discountTotal,
      discount:discountTotal
     
    });

    await purchaseOrder.save();

    // Return response with details about invalid items, if any
    const responseMessage = invalidItems.length > 0
      ? `Purchase Order created successfully with some items excluded. Check details for invalid items.`
      : 'Purchase Order created successfully';

    res.status(201).json({ message: responseMessage, purchaseOrder, invalidItems });
  } catch (error) {
    console.error('Error creating Purchase Order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get Purchase Order by ID
exports.getPurchaseOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const purchaseOrder = await PurchaseOrder.findById(id).populate('supplier').populate('items.item');
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    res.json({ purchaseOrder });
  } catch (error) {
    console.error('Error fetching Purchase Order by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Purchase Order
exports.updatePurchaseOrder = async (req, res) => {
  const { id } = req.params;
  const { supplier: supplierId, items } = req.body;

  console.log(id, "Purchase Order ID");
  console.log(req.body, "Request Body");

  try {
    const purchaseOrder = await PurchaseOrder.findById(id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier || supplier.status !== 'Active') {
      return res.status(400).json({ message: 'Invalid supplier' });
    }

    let itemTotal = 0;
    let discountTotal = 0;
    const invalidItems = [];

    const purchaseItems = await Promise.all(items.map(async (item) => {
      const foundItem = await Item.findById(item.item);
      if (!foundItem) {
        invalidItems.push({ itemId: item.item, reason: 'Item not found' });
        return null;
      }

      if (foundItem.supplier.toString() !== supplier._id.toString()) {
        invalidItems.push({ itemId: item.item, reason: 'Item does not belong to the specified supplier' });
        return null;
      }

      const itemAmount = item.orderQty * foundItem.unitPrice;
      const netAmount = itemAmount - item.discount;

      // Calculate totals
      itemTotal += itemAmount;
      discountTotal += item.discount;

      console.log(`Item ID: ${item.item}, Item Amount: ${itemAmount}, Discount: ${item.discount}, Net Amount: ${netAmount}`);

      return {
        item: foundItem._id,
        itemNo: foundItem.itemNo,
        itemName: foundItem.name,
        stockUnit: foundItem.stockUnit,
        unitPrice: foundItem.unitPrice,
        packingUnit: item.packingUnit,
        orderQty: item.orderQty,
        itemAmount,
        discount: item.discount,
        netAmount,
      };
    }));

    const validPurchaseItems = purchaseItems.filter(i => i !== null);
    if (validPurchaseItems.length === 0) {
      return res.status(400).json({ message: 'No valid items for the specified supplier', invalidItems });
    }

    // Log totals before saving
    console.log(`Total Item Amount: ${itemTotal}, Total Discount: ${discountTotal}`);

    purchaseOrder.supplier = supplier._id;
    purchaseOrder.items = validPurchaseItems;
    purchaseOrder.itemTotal = itemTotal;
    purchaseOrder.discountTotal = discountTotal; 
    purchaseOrder.netAmount = itemTotal - discountTotal;
    purchaseOrder.discount = discountTotal;

    await purchaseOrder.save();

    const responseMessage = invalidItems.length > 0
      ? 'Purchase Order updated successfully with some items excluded. Check details for invalid items.'
      : 'Purchase Order updated successfully';

    res.json({ message: responseMessage, purchaseOrder, invalidItems });
  } catch (error) {
    console.error('Error updating Purchase Order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete Purchase Order
exports.deletePurchaseOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }


    res.json({ message: 'Purchase Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting Purchase Order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get All Purchase Orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().populate('supplier').populate('items.item');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
