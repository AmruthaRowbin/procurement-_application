import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderAsync, fetchOrderAsync } from '../redux/slices/purchaseorderSlice';
import { fetchSuppliersAsync } from '../redux/slices/supplierSlice';
import { fetchItemsAsync } from '../redux/slices/ItemSlice';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';

const Editpurchaseorder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orderId } = useParams();

    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const items = useSelector((state) => state.items.items);
    const order = useSelector((state) => state.orders.orders.find(order => order._id === orderId));
   

    const [supplierId, setSupplierId] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [orderItems, setOrderItems] = useState([{ itemId: '', orderQty: 0 }]);
    const [itemTotal, setItemTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);

    useEffect(() => {
        dispatch(fetchSuppliersAsync());
        dispatch(fetchItemsAsync());
        if (order) {
            setSupplierId(order.supplier._id);
            setOrderDate(order.orderDate.split('T')[0]); // Format date to YYYY-MM-DD
            setOrderItems(order.items.map(item => ({
                itemId: item.item._id, // Ensure this path is correct
                orderQty: item.orderQty
            })));
            setDiscount(order.discount);
            setItemTotal(order.itemTotal);
            setNetAmount(order.netAmount); // Set initial net amount from the order
        }
    }, [dispatch, order]);

    useEffect(() => {
        const total = orderItems.reduce((acc, curr) => {
            const item = items.find((item) => item._id === curr.itemId);
            if (item) {
                const itemAmount = item.unitPrice * curr.orderQty;
                return acc + itemAmount;
            }
            return acc;
        }, 0);
        setItemTotal(total);
        setNetAmount(total - discount);
    }, [orderItems, items, discount]);

    const handleAddItem = () => {
        setOrderItems([...orderItems, { itemId: '', orderQty: 0 }]);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(updatedItems);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = orderItems.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setOrderItems(updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare items with detailed amounts
        const preparedItems = orderItems.map((item) => {
            const itemData = items.find((i) => i._id === item.itemId);
            const orderQty = item.orderQty || 0; // Default to 0 if not set
            const itemAmount = itemData ? itemData.unitPrice * orderQty : 0;

            return {
                item: item.itemId,
                orderQty,
                itemAmount,
                discount: discount, // Apply overall discount or can be item-specific
                netAmount: itemAmount - (discount * orderQty / itemTotal), // Proportional discount based on item total
            };
        });

        const orderData = {
            orderNo: order.orderNo, // Keep the same order number
            supplier: supplierId,
            orderDate,
            itemTotal,
            discount,
            netAmount,
            items: preparedItems,
        };
console.log(orderData,"orderdataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        dispatch(updateOrderAsync({ orderId, orderData })).then(() => {
            navigate('/purchaseorder/all');
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edit Purchase Order</h2>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="supplier-label">Supplier</InputLabel>
                    <Select
                        labelId="supplier-label"
                        value={supplierId}
                        onChange={(e) => setSupplierId(e.target.value)}
                        required
                    >
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier._id} value={supplier._id}>
                                {supplier.supplierName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Order Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    required
                />

                <h3>Order Items</h3>
                {orderItems.map((orderItem, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl style={{ marginRight: '10px', flex: 1 }}>
                            <InputLabel id={`item-label-${index}`}>Item</InputLabel>
                            <Select
                                labelId={`item-label-${index}`}
                                value={orderItem.itemId}
                                onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                                required
                            >
                                {items.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={orderItem.orderQty}
                            onChange={(e) => handleItemChange(index, 'orderQty', Number(e.target.value))}
                            style={{ width: '100px', marginRight: '10px' }}
                            required
                        />
                        <IconButton color="secondary" onClick={() => handleRemoveItem(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddItem}
                    startIcon={<AddIcon />}
                    style={{ margin: '10px 0' }}
                >
                    Add Item
                </Button>

                <TextField
                    label="Discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                    required
                />

                <h3>Item Total: ${itemTotal.toFixed(2)}</h3>
                <h3>Net Amount: ${netAmount.toFixed(2)}</h3>

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Update Purchase Order
                </Button>
            </form>
        </div>
    );
};

export default Editpurchaseorder;
