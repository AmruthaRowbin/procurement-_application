import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderByIdAsync } from '../redux/slices/purchaseorderSlice'; // Assuming you have an action to fetch order by ID
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const PurchaseOrderDetail = () => {
    const { id } = useParams(); // Get the ID from the URL
    const dispatch = useDispatch();
    const order = useSelector((state) => state.orders.currentOrder); // Assuming you have a slice for the current order
    const loading = useSelector((state) => state.orders.loading);

    useEffect(() => {
        dispatch(fetchOrderByIdAsync(id)); // Fetch the order details by ID
    }, [dispatch, id]);

    if (loading) {
        return <p>Loading order details...</p>;
    }

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h4">Order Details</Typography>
            <Typography variant="h6">Order No: {order.orderNo}</Typography>
            <Typography variant="body1">Order Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
            <Typography variant="body1">Supplier: {order.supplier}</Typography>
            <Typography variant="body1">Item Total: ${order.itemTotal}</Typography>
            <Typography variant="body1">Discount: ${order.discount}</Typography>
            <Typography variant="body1">Net Amount: ${order.netAmount}</Typography>

            <Typography variant="h6" style={{ marginTop: '20px' }}>Purchased Items:</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Order Quantity</TableCell>
                        <TableCell>Item Amount</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Net Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.items.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.item}</TableCell>
                            <TableCell>{item.orderQty}</TableCell>
                            <TableCell>${item.itemAmount}</TableCell>
                            <TableCell>${item.discount}</TableCell>
                            <TableCell>${item.netAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default PurchaseOrderDetail;
