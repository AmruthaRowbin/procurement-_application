import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders ,createOrder,editOrder,deleteOrder} from '../../api/purchaseorderApi';


export const fetchOderAsync = createAsyncThunk('purchase-orders/all', async () => {
    const response = await fetchOrders();
    if (response.success) {
        return response.data;
    }
    throw new Error(response.message);
});

export const addOrderAsync = createAsyncThunk('/purchase-orders/additem', async (ItemData,supplierId) => {
    const response = await createOrder(ItemData,supplierId);
    if (response.success) {
        return response.data;
    }
    throw new Error(response.message);
});



export const updateOrderAsync= createAsyncThunk(
    "/purchase-orders/edit",
    async ({ orderId, orderData }, { rejectWithValue }) => {
        try {
            console.log(orderId,orderData,"iddddddddddddddddddddddd")
            const response = await editOrder(orderId, orderData);
            console.log(response,"tasksliceeeeeeeeeee")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeOrderAsync = createAsyncThunk('/purchase-orders/remove', async (id) => {
    const response = await deleteOrder(id);
    if (response.success) {
        return id;
    }
    throw new Error(response.message);
});




const purchaseorderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOderAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOderAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOderAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addOrderAsync.fulfilled, (state, action) => {
                state.orders.push(action.payload);
            })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                const index = state.orders.findIndex((orders) => orders.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(removeOrderAsync.fulfilled, (state, action) => {
                state.orders = state.orders.filter((orders) => orders.id !== action.payload);
            });

            
           
        },
    })
 export default purchaseorderSlice.reducer;