import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSuppliers ,createSupplier,editSupplier,deleteSupplier} from '../../api/supplierApi';


export const fetchSuppliersAsync = createAsyncThunk('suppliers/all', async () => {
    const response = await fetchSuppliers();
    if (response.success) {
        return response.data;
    }
    throw new Error(response.message);
});

export const addSupplierAsync = createAsyncThunk('suppliers/create', async (supplierData) => {
    const response = await createSupplier(supplierData);
    if (response.success) {
        return response.data;
    }
    throw new Error(response.message);
});



export const updateSupplierAsync= createAsyncThunk(
    "/suppliers/edit",
    async ({ supplierId, updatedData }, { rejectWithValue }) => {
        try {
            console.log(supplierId, updatedData ,"supplierId, updatedData supplierId, updatedData ")
            const response = await editSupplier(supplierId, updatedData);
            console.log(response,"tasksliceeeeeeeeeee")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeSupplierAsync = createAsyncThunk('suppliers/removeSupplier', async (id) => {
    const response = await deleteSupplier(id);
    if (response.success) {
        return id;
    }
    throw new Error(response.message);
});


const supplierSlice = createSlice({
    name: 'suppliers',
    initialState: {
        suppliers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliersAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSuppliersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.suppliers = action.payload;
            })
            .addCase(fetchSuppliersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addSupplierAsync.fulfilled, (state, action) => {
                state.suppliers.push(action.payload);
            })
            .addCase(updateSupplierAsync.fulfilled, (state, action) => {
                const index = state.suppliers.findIndex((supplier) => supplier.id === action.payload.id);
                if (index !== -1) {
                    state.suppliers[index] = action.payload;
                }
            })
            .addCase(removeSupplierAsync.fulfilled, (state, action) => {
                state.suppliers = state.suppliers.filter((supplier) => supplier.id !== action.payload);
            });
        },
    })
 export default supplierSlice.reducer;