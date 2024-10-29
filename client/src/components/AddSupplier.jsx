import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSupplierAsync } from '../redux/slices/supplierSlice';
import { TextField, Button, Box, Grid, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {
    const [supplierName, setSupplierName] = useState('');
    const [address, setAddress] = useState('');
    const [taxNo, setTaxNo] = useState('');
    const [country, setCountry] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Active');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationSeverity, setNotificationSeverity] = useState('success');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(addSupplierAsync({ supplierName, address, taxNo, country, mobileNo, email, status }));

        // Check if the action was fulfilled and handle success/error
        if (addSupplierAsync.fulfilled.match(resultAction)) {
            setNotificationMessage('Supplier added successfully!');
            setNotificationSeverity('success');
            navigate('/suppliers/all');
        } else {
            setNotificationMessage(resultAction.payload || 'Failed to add supplier. Please try again.');
            setNotificationSeverity('error');
        }
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // List of countries for the dropdown
    const countries = ["United States", "Canada", "United Kingdom", "India", "Australia", "Germany", "France", "China", "Japan", "Brazil"];

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, boxShadow: 3, backgroundColor: '#f9f9f9', borderRadius: 2, marginTop: 10 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
                Add Supplier
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
                        <FormControl fullWidth>
                            <InputLabel>Country</InputLabel>
                            <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                label="Country"
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                            Add Supplier
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Success/Error Notification Snackbar */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={notificationSeverity} sx={{ width: '100%' }}>
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddSupplier;
