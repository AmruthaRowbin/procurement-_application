import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#D59D80' }}> {/* Light peach color */}
      <Toolbar>
        <Typography variant="h6" sx={{ color: '#4B2E20' }}> {/* Darker text for contrast */}
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
