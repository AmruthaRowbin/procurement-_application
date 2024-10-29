import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Added new icon for purchase orders
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import logout icon
import { useDispatch} from 'react-redux';
import { logout } from '../redux/slices/adminSlice';
const Sidebar = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();  // Hook for navigation

  const handleLogout = () => {
    dispatch(logout()) // Dispatch the logout action
    navigate('/'); // Redirect to login page
};

  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0 }}
      PaperProps={{ sx: { width: 240, backgroundColor: '#C0754D', color: '#fff' } }} // Rich brownish-orange
    >
      <List>
        <ListItem button component={Link} to="/Home" sx={{ padding: '16px 24px' }}>
          <ListItemIcon><DashboardIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary={<Typography style={{ color: '#fff' }}>Dashboard</Typography>} />
        </ListItem>
        <ListItem button component={Link} to="/suppliers/all" sx={{ padding: '16px 24px' }}>
          <ListItemIcon><PeopleIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary={<Typography style={{ color: '#fff' }}>Suppliers</Typography>} />
        </ListItem>
        <ListItem button component={Link} to="/items/all" sx={{ padding: '16px 24px' }}>
          <ListItemIcon><PeopleIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary={<Typography style={{ color: '#fff' }}>Items</Typography>} />
        </ListItem>
        <ListItem button component={Link} to="/purchaseorder/all" sx={{ padding: '16px 24px' }}>
          <ListItemIcon><ShoppingCartIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary={<Typography style={{ color: '#fff' }}>Purchase Order</Typography>} />
        </ListItem>
        
        {/* Logout List Item */}
        <ListItem button onClick={handleLogout} sx={{ padding: '16px 24px' }}>
          <ListItemIcon><ExitToAppIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary={<Typography style={{ color: '#fff' }}>Logout</Typography>} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
