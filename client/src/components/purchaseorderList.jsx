import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOderAsync,removeOrderAsync } from '../redux/slices/purchaseorderSlice';
import { fetchSuppliersAsync } from '../redux/slices/supplierSlice';
import { fetchItemsAsync } from '../redux/slices/ItemSlice';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as XLSX from 'xlsx'; // Importing xlsx for Excel export
import { jsPDF } from 'jspdf'; // Importing jsPDF for printing

const PurchaseorderList = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const items = useSelector((state) => state.items.items);
    const loading = useSelector((state) => state.suppliers.loading);
    const navigate = useNavigate();
console.log(orders,"ppppppppppppppppppp")
    const [open, setOpen] = useState(false);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);

    useEffect(() => {
        dispatch(fetchOderAsync());
        dispatch(fetchSuppliersAsync());
        dispatch(fetchItemsAsync());
    }, [dispatch]);

    const handleEdit = (id) => {
        navigate(`/purchase-orders/${id}`);
    };

 
    const handleDelete = async (id) => {
        const result = await dispatch(removeOrderAsync(id)); // Dispatch removeTask action
        if (removeOrderAsync.fulfilled.match(result)) {
            console.log('Task deleted successfully');
        } else {
            console.error('Failed to delete the task');
        }
    };

    const handleViewItems = (order) => {
        const matchedItems = order.items.map((orderItem) => {
            const itemDetails = items.find((item) => item._id === orderItem.item._id);
            return itemDetails
                ? { ...orderItem, ...itemDetails }
                : { ...orderItem, name: 'Unknown Item' };
        });
        setSelectedOrderItems(matchedItems);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrderItems([]);
    };

    const getSupplierName = (supplierId) => {
        const supplier = suppliers.find((s) => s._id === supplierId);
        return supplier ? supplier.supplierName : 'Unknown Supplier';
    };

    // Export to Excel function
    const exportToExcel = () => {
        const data = orders.map(order => {
            const supplierName = getSupplierName(order.supplier?._id);
            return {
                'Order No': order.orderNo,
                'Order Date': new Date(order.orderDate).toLocaleDateString(),
                'Supplier': supplierName,
                'Item Total': order.itemTotal,
                'Discount': order.discount,
                'Net Amount': order.netAmount,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchase Orders');

        // Export to file
        XLSX.writeFile(workbook, 'PurchaseOrders.xlsx');
    };

    // Print function
    const printPurchaseOrder = () => {
        if (selectedOrderItems.length === 0) {
            alert("No items to print. Please view items first.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Purchase Order Details", 20, 20);
        let yOffset = 30;

        // Adding table headers
        doc.setFontSize(12);
        doc.text("Item Name", 20, yOffset);
        doc.text("Brand", 60, yOffset);
        doc.text("Category", 100, yOffset);
        doc.text("Unit Price", 140, yOffset);
        doc.text("Order Quantity", 180, yOffset);
        yOffset += 10;

        selectedOrderItems.forEach((item) => {
            doc.text(item.name || 'N/A', 20, yOffset);
            doc.text(item.brand || 'N/A', 60, yOffset);
            doc.text(item.category || 'N/A', 100, yOffset);
            doc.text(item.unitPrice ? `$${item.unitPrice.toFixed(2)}` : 'N/A', 140, yOffset);
            doc.text(item.orderQty ? item.orderQty.toString() : 'N/A', 180, yOffset);
            yOffset += 10; // Move down for the next item
        });

        doc.save("PurchaseOrderDetails.pdf");
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Purchase Order List</h2>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/purchaseorder/create')}
                style={{ marginBottom: '20px', backgroundColor: '#1976d2', color: '#fff' }}
            >
                Add Purchase Order
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={exportToExcel}
                style={{ marginBottom: '20px', marginLeft: '10px' }}
            >
                Export to Excel
            </Button>
          
            {loading ? (
                <p>Loading purchase orders...</p>
            ) : (
                <TableContainer component={Paper} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Table style={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell style={{ fontWeight: 'bold' }}>Order No</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Order Date</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Supplier</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Item Total</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Discount</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Net Amount</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Purchased Items</TableCell>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <TableCell>{order.orderNo}</TableCell>
                                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.supplier ? getSupplierName(order.supplier._id) : 'No Supplier'}</TableCell>
                                    <TableCell>{order.itemTotal}</TableCell>
                                    <TableCell>{order.discount}</TableCell>
                                    <TableCell>{order.netAmount}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleViewItems(order)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(order._id)}
                                            style={{ marginRight: '5px' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDelete(order._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for displaying purchased items */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Purchased Items</DialogTitle>
                <DialogContent>
                    {selectedOrderItems.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Order Quantity</TableCell>
                                    <TableCell>Item Amount</TableCell>
                                    <TableCell>Discount</TableCell>
                                    <TableCell>Net Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrderItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.brand}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.unitPrice}</TableCell>
                                        <TableCell>{item.orderQty}</TableCell>
                                        <TableCell>{item.itemAmount}</TableCell>
                                        <TableCell>{item.discount}</TableCell>
                                        <TableCell>{item.netAmount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No items found.</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={printPurchaseOrder} color="primary">Print</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PurchaseorderList;
 