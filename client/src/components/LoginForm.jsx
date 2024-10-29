// src/components/LoginForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Snackbar, Alert } from '@mui/material'; // Ensure Alert is imported
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/adminSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login({ email, password })); // Dispatch the login action with credentials

      if (login.fulfilled.match(response)) {
        setNotificationMessage('Login successful');
        setNotificationSeverity('success');
        navigate("/Home");
      } else if (response.payload) {
        setNotificationMessage(response.payload);
        setNotificationSeverity('error');
      } else {
        setNotificationMessage('Unexpected response');
        setNotificationSeverity('error');
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error during login:', error);
      setNotificationMessage('Login failed. Please try again.');
      setNotificationSeverity('error');
      setOpenSnackbar(true);
    }

    // Clear the input fields after handling login
    setEmail('');
    setPassword('');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: '#D59D80', ':hover': { backgroundColor: '#C0754D' } }}
          fullWidth
        >
          Login
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={notificationSeverity} sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default LoginForm;
