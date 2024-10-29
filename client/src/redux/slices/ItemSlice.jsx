import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItem ,createItem,editItem,deleteItem} from '../../api/ItemApi';


export const fetchItemsAsync = createAsyncThunk('items/all', async () => {
    const response = await fetchItem();
    if (response.success) {
        return response.data;
    }
    throw new Error(response.message);
});

export const addItemAsync = createAsyncThunk('/items/additem', async (ItemData) => {
    const response = await createItem(ItemData);
    if (response.success) {
        return response.data;
    }
    throw new Error(response.message);
});



export const updateItemAsync= createAsyncThunk(
    "/items/edit",
    async ({ itemId, updatedData }, { rejectWithValue }) => {
        try {
            
            const response = await editItem(itemId, updatedData);
            console.log(response,"tasksliceeeeeeeeeee")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeItemAsync = createAsyncThunk('/purchase-orders/remove', async (id) => {
    const response = await deleteItem(id);
    if (response.success) {
        return id;
    }
    throw new Error(response.message);
});



const ItemSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItemsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItemsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addItemAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex((items) => items.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(removeItemAsync.fulfilled, (state, action) => {
                state.items = state.items.filter((items) => items.id !== action.payload);
            });
           
        },
    })
 export default ItemSlice.reducer;