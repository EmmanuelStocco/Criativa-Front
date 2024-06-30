import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Variável para armazenar o token da URL
  let token = '';

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    token = searchParams.get('token') || '';
    console.log('token', token)
    if (!token) {
      alert('Error: Missing token!');
      navigate('/');
    }
  }, [location, navigate]);

  const handleCapturePayment = async () => {
    try {
      const response = await fetch('https://back-criativa-doations-635d356bed7c.herokuapp.com/funds/paypal/capturePayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: '8NT98921BE581530K' // Substitua pelo orderId correto, se aplicável
        })
      });

      if (response.ok) {
        alert('Payment confirmed successfully!');
        navigate('/');
      } else {
        throw new Error('Failed to capture payment');
      }
    } catch (error) {
      console.error(error);
      alert('Error capturing payment!');
      navigate('/');
    }
  };

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
        <Button variant="contained" color="primary" onClick={handleCapturePayment}>
          Confirm Payment
        </Button>
        <Button variant="contained" color="primary" onClick={handleBackToHome} style={{ marginTop: '1rem' }}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Confirmation;
