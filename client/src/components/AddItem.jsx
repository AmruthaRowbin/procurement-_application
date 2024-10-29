import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSuppliersAsync } from '../redux/slices/supplierSlice';
import { addItemAsync } from '../redux/slices/ItemSlice';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';

const AddItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [itemData, setItemData] = useState({
        itemNo: '',
        name: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplier: '', // supplier ID
        stockUnit: '',
        unitPrice: '',
        status: 'Enabled', // default value for status
        image: null, // Initialize image as null
    });

    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const loading = useSelector((state) => state.suppliers.loading);

    useEffect(() => {
        dispatch(fetchSuppliersAsync());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setItemData({
            ...itemData,
            image: e.target.files[0], // Set the selected file as image
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Using FormData to send item data along with image
        const formData = new FormData();
        Object.keys(itemData).forEach((key) => {
            formData.append(key, itemData[key]);
        });

        await dispatch(addItemAsync(formData)); // Assuming addItemAsync handles FormData
        navigate('/items/all'); // Redirect to item list page after adding item
    };

    return (
        <Paper style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>Add New Item</Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                
                <TextField
                    label="Name"
                    name="name"
                    value={itemData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Inventory Location"
                    name="inventoryLocation"
                    value={itemData.inventoryLocation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Brand"
                    name="brand"
                    value={itemData.brand}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Category"
                    name="category"
                    value={itemData.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                
                <FormControl fullWidth margin="normal">
                    <InputLabel id="supplier-label">Supplier</InputLabel>
                    <Select
                        labelId="supplier-label"
                        name="supplier"
                        value={itemData.supplier}
                        onChange={handleChange}
                        required
                    >
                        {loading ? (
                            <MenuItem disabled><CircularProgress size={24} /></MenuItem>
                        ) : (
                            suppliers.map((supplier) => (
                                <MenuItem key={supplier._id} value={supplier._id}>
                                    {supplier.supplierName}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>

                <TextField
                    label="Stock Unit"
                    name="stockUnit"
                    value={itemData.stockUnit}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Unit Price"
                    name="unitPrice"
                    type="number"
                    value={itemData.unitPrice}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        name="status"
                        value={itemData.status}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Enabled">Enabled</MenuItem>
                        <MenuItem value="Disabled">Disabled</MenuItem>
                    </Select>
                </FormControl>

                {/* Image upload field */}
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Upload Image
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    fullWidth
                >
                    Add Item
                </Button>
            </form>
        </Paper>
    );
};

export default AddItem;
