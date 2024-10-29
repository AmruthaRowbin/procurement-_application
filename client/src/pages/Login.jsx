// src/pages/LoginPage.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Admin Login
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Enter your credentials to access the dashboard.
        </Typography>
      </Box>
      <LoginForm />
    </Container>
  );
};

export default Login;
