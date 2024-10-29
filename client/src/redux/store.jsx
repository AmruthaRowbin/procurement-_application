import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import adminReducer from './slices/adminSlice';
import supplierReducer from './slices/supplierSlice'
import itemReducer from './slices/ItemSlice'
import orderReducer from './slices/purchaseorderSlice'

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    admin: adminReducer,
    suppliers: supplierReducer,
    items: itemReducer,
    orders:orderReducer,

  },
});

export default store;
