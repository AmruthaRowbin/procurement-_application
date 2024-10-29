import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsAsync ,removeItemAsync} from '../redux/slices/ItemSlice';
import { fetchSuppliersAsync } from '../redux/slices/supplierSlice';
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
    Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);
    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const loading = useSelector((state) => state.suppliers.loading);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchItemsAsync());
        dispatch(fetchSuppliersAsync());
    }, [dispatch]);

    const handleEdit = (id) => {
        console.log(`Navigating to edit page for item with ID: ${id}`);
        navigate(`/items/${id}`);
    };

    const handleDelete = async (id) => {
        const result = await dispatch(removeItemAsync(id)); // Dispatch removeTask action
        if (removeItemAsync.fulfilled.match(result)) {
            console.log('Task deleted successfully');
        } else {
            console.error('Failed to delete the task');
        }
    };
    // Function to get the supplier name by ID
    const getSupplierName = (supplierId) => {
        const supplier = suppliers.find((s) => s._id === supplierId);
        return supplier ? supplier.supplierName : 'Unknown Supplier';
    };

    // Base URL for the images
    const BASE_URL = 'http://localhost:5000/'; // Change this to your actual server URL if needed

    return (
        <div style={{ padding: '20px' }}>
            <h2>Item List</h2>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/items/create')}
                style={{ marginBottom: '20px', backgroundColor: '#1976d2', color: '#fff' }}
            >
                Add Item
            </Button>
            {loading ? (
                <p>Loading items...</p>
            ) : (
                <TableContainer component={Paper} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Table style={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Item No</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Inventory Location</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Brand</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Supplier</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Stock Unit</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Unit Price</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <TableCell>
                                        {Array.isArray(item.images) && item.images.length > 0 ? ( // Check if images is an array
                                            <img
                                                alt={item.name}
                                                src={`${BASE_URL}${item.images[0].replace(/\\/g, '/')}`} // Replace backslashes with forward slashes
                                                style={{ width: 50, height: 50, objectFit: 'cover' }} // Style the image
                                            />
                                        ) : (
                                            <Avatar alt={item.name} style={{ width: 50, height: 50 }} />
                                        )}
                                    </TableCell>
                                    <TableCell>{item.itemNo}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.inventoryLocation}</TableCell>
                                    <TableCell>{item.brand}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.supplier ? getSupplierName(item.supplier._id) : 'No Supplier'}</TableCell>
                                    <TableCell>{item.stockUnit}</TableCell>
                                    <TableCell>{item.unitPrice}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(item._id)}
                                            style={{ marginRight: '5px' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDelete(item._id)}
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
        </div>
    );
};

export default ItemList;
