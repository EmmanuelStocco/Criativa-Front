import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const capturePayment = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (!token) {
        alert('Error: Missing token!');
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/funds/paypal/capturePayment`, { //'http://localhost:3000/funds/paypal/capturePayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: token
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

    capturePayment();
  }, [location, navigate]);

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
          Processing your donation...
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Please wait while we confirm your payment.
        </Typography>
      </Box>
    </Container>
  );
};

export default Confirmation;
