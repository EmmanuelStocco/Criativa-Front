import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../services/api';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    description: '',
    unit_amount_value: '',
    currency_code: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jsonToSend = {
      intent: "CAPTURE",
      purchase_units: [
        {
          items: [
            {
              name: "Donation",
              description: formData.description,
              quantity: "1", // Quantidade fixada como 1
              unit_amount: {
                currency_code: formData.currency_code, // Campo de moeda adicionado
                value: formData.unit_amount_value
              }
            }
          ],
          amount: {
            currency_code: formData.currency_code, // Campo de moeda adicionado
            value: formData.unit_amount_value,
            breakdown: {
              item_total: {
                currency_code: formData.currency_code, // Campo de moeda adicionado
                value: formData.unit_amount_value
              }
            }
          }
        }
      ],
      application_context: {
        return_url: "http://localhost:3001/confirmation",
        cancel_url: "https://example.com/cancel"
      }
    };

    try {
      const response = await api.post('/funds/paypal/createOrder', jsonToSend);
      console.log('response', response)

      const { data } = response;
      console.log('data',data)
      const linkOpen = data.links.find((e: any) => e.rel === "approve");

      if (linkOpen && linkOpen.href) {
        window.open(linkOpen.href, '_blank');
      } else {
        console.log('Approve link not found');
      }

      console.log('linkOpen', linkOpen);
      console.log('response', response);
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar dados!');
    }
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
          Make Your Donation to Criativa!
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Thank you for your support. Please write your message below:
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
              fullWidth
              label="Write your message"
              variant="outlined"
              margin="normal"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Unit Amount (Value)"
              variant="outlined"
              margin="normal"
              name="unit_amount_value"
              value={formData.unit_amount_value}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Currency Code"
              variant="outlined"
              margin="normal"
              name="currency_code"
              value={formData.currency_code}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Donate
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default Form;
