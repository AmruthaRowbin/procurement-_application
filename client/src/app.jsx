import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SupplierList from './components/SupplierList';
import AddSupplier from './components/AddSupplier';
import EditSupplier from './components/EditSupplier';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import EditItems from './components/EditItems';
import PurchaseorderList from './components/purchaseorderList';
import Addpurchaseorder from './components/Addpurchaseorder';
import Editpurchaseorder from './components/Editpurchaseorder';

const App = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn); // Accessing the login state from Redux

  return (
    <div style={{ display: 'flex' }}>
      {/* Render Sidebar only if logged in */}
      {isLoggedIn && <Sidebar />}
      <main style={{ flexGrow: 1 }}>
        {/* Render Navbar only if the current path is not '/' (login page) */}
        {location.pathname !== '/' && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<DashboardPage />} />
          <Route path="/suppliers/all" element={<SupplierList/>}/>
          <Route path="/suppliers/create" element={<AddSupplier/>}/>
          <Route path="/suppliers/:supplierId" element={<EditSupplier/>}/>
          <Route path="/items/all" element={<ItemList/>}/>
          <Route path="/items/create" element={<AddItem/>}/>
          <Route path="/items/:itemId" element={<EditItems/>}/>
          <Route path="/purchaseorder/all" element={<PurchaseorderList/>}/>
          <Route path="/purchaseorder/create" element={<Addpurchaseorder/>}/>
          <Route path="/purchase-orders/:orderId" element ={<Editpurchaseorder/>}/>
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
