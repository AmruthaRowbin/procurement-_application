import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemAsync } from '../redux/slices/ItemSlice';
import { TextField, Button, Box, Grid, Typography, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSuppliersAsync } from '../redux/slices/supplierSlice';

const EditItems = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const item = useSelector((state) => state.items.items.find(item => item._id === itemId));

    const [name, setName] = useState('');
    const [inventoryLocation, setInventoryLocation] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [stockUnit, setStockUnit] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [status, setStatus] = useState('Enabled');
    const [image, setImage] = useState(null); // New state for image
    const [imagePreview, setImagePreview] = useState(''); // State for image preview

    useEffect(() => {
        dispatch(fetchSuppliersAsync());
    }, [dispatch]);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setInventoryLocation(item.inventoryLocation);
            setBrand(item.brand);
            setCategory(item.category);
            setSupplier(item.supplier);
            setStockUnit(item.stockUnit);
            setUnitPrice(item.unitPrice);
            setStatus(item.status);
            setImagePreview(item.image || ''); // Set preview from existing image
        } else {
            console.error('Item not found');
        }
    }, [item]);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedItemData = {
            itemId,
            updatedData: {
                name,
                inventoryLocation,
                brand,
                category,
                supplier,
                stockUnit,
                unitPrice,
                status,
                image, // Include the image file
            }
        };
        const result = await dispatch(updateItemAsync(updatedItemData));

        console.log(result);

        if (updateItemAsync.fulfilled.match(result)) {
            navigate('/items/all');
        } else {
            console.error('Failed to update item');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, boxShadow: 3, backgroundColor: '#f9f9f9', borderRadius: 2, marginTop: 10 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
                Edit Item
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Inventory Location"
                            value={inventoryLocation}
                            onChange={(e) => setInventoryLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Supplier"
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            select
                            required
                        >
                            {suppliers.map((sup) => (
                                <MenuItem key={sup._id} value={sup._id}>
                                    {sup.supplierName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Stock Unit"
                            value={stockUnit}
                            onChange={(e) => setStockUnit(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Unit Price"
                            type="number"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            select
                        >
                            <MenuItem value="Enabled">Enabled</MenuItem>
                            <MenuItem value="Disabled">Disabled</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: 100, height: 100, objectFit: 'cover', marginTop: 10 }}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update Item
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default EditItems;
