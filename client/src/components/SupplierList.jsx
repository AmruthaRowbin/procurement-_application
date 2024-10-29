import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliersAsync } from '../redux/slices/supplierSlice';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SupplierList = () => {
    const dispatch = useDispatch();
    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const loading = useSelector((state) => state.suppliers.loading);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(fetchSuppliersAsync());
    }, [dispatch]);

    const handleEdit = (id) => {
        console.log(`Navigating to edit page for supplier with ID: ${id}`); // Debugging log
        navigate(`/suppliers/${id}`);
    };

    const handleDelete = (id) => {
        // Placeholder for delete function
        console.log(`Delete supplier with ID: ${id}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Supplier List</h2>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/suppliers/create')}
                style={{ marginBottom: '20px', backgroundColor: '#1976d2', color: '#fff' }}
            >
                Add Supplier
            </Button>
            {loading ? (
                <p>Loading suppliers...</p>
            ) : (
                <TableContainer component={Paper} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Table style={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell style={{ fontWeight: 'bold' }}>Supplier No</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Supplier Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Tax No</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Country</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Mobile No</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers.map((supplier) => (
                                <TableRow key={supplier._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <TableCell>{supplier.supplierNo}</TableCell>
                                    <TableCell>{supplier.supplierName}</TableCell>
                                    <TableCell>{supplier.address}</TableCell>
                                    <TableCell>{supplier.taxNo}</TableCell>
                                    <TableCell>{supplier.country}</TableCell>
                                    <TableCell>{supplier.mobileNo}</TableCell>
                                    <TableCell>{supplier.email}</TableCell>
                                    <TableCell>{supplier.status}</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(supplier._id)} // Ensure this matches the supplier's ID
                                            style={{ marginRight: '5px' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDelete(supplier._id)} // Also ensure to use the correct ID
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

export default SupplierList;
