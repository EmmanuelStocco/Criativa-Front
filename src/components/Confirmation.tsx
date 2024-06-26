import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');

    if (!transactionId || !amount) {
      alert('Error: Missing parameters!');
      navigate('/');
    } else {
      console.log('Transaction ID:', transactionId);
      console.log('Amount:', amount);
    }
  }, [location, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Donation Confirmed!
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Thank you for your generous donation. Your support helps us make a difference!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Confirmation;
