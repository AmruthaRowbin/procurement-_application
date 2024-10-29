import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSupplierAsync } from '../redux/slices/supplierSlice';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditSupplier = () => {
    const { supplierId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selecting the supplier from Redux store
    const supplier = useSelector((state) => 
        state.suppliers.suppliers.find(supplier => supplier._id === supplierId)
    );

    // State variables for supplier fields
    const [supplierName, setSupplierName] = useState('');
    const [address, setAddress] = useState('');
    const [taxNo, setTaxNo] = useState('');
    const [country, setCountry] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Active');

    // Initialize form fields with supplier data if available
    useEffect(() => {
        if (supplier) {
            setSupplierName(supplier.supplierName);
            setAddress(supplier.address);
            setTaxNo(supplier.taxNo);
            setCountry(supplier.country);
            setMobileNo(supplier.mobileNo);
            setEmail(supplier.email);
            setStatus(supplier.status);
        } else {
            console.error('Supplier not found');
            // Optionally redirect or show an error message
        }
    }, [supplier]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSupplierData = {
            supplierId, // Pass the supplierId directly
            updatedData: { // Updated data should be wrapped in an object
                supplierName,
                address,
                taxNo,
                country,
                mobileNo,
                email,
                status
            }
        };
        const result = await dispatch(updateSupplierAsync(updatedSupplierData));
        
        console.log(result); // Check result for debugging
        
        if (updateSupplierAsync.fulfilled.match(result)) {
            navigate('/suppliers/all'); // Redirect after successful update
        } else {
            console.error('Failed to update supplier');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, boxShadow: 3, backgroundColor: '#f9f9f9', borderRadius: 2, marginTop: 10 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
                Edit Supplier
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Supplier Name"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Tax No"
                            value={taxNo}
                            onChange={(e) => setTaxNo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Mobile No"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            select
                            SelectProps={{ native: true }}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blocked">Blocked</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update Supplier
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default EditSupplier;
