import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import api from '../services/api';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    description: '',
    unit_amount_value: '',
    currency_code: 'USD', // Valor padrão inicial
    totalBrl: ''
  });
  const [exchangeRate, setExchangeRate] = useState('');

  // Fetch exchange rate when currency code changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`);
        const data = await response.json();
        const currencyKey = `${formData.currency_code}BRL`;
        if (data[currencyKey]) {
          const rate = data[currencyKey].high;
          setExchangeRate(rate);
        } else {
          console.error('Currency not found in the response data');
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [formData.currency_code]);

  // Calculate totalBrl when unit_amount_value or exchangeRate change
  useEffect(() => {
    if (formData.unit_amount_value && exchangeRate) {
      const totalBrl = parseFloat(formData.unit_amount_value) * parseFloat(exchangeRate);
      setFormData(prevState => ({ ...prevState, totalBrl: totalBrl.toFixed(2) }));
    } 
  }, [formData.unit_amount_value, exchangeRate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
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
              quantity: "1",
              unit_amount: {
                currency_code: formData.currency_code,
                value: formData.unit_amount_value
              }
            }
          ],
          amount: {
            currency_code: formData.currency_code,
            value: formData.unit_amount_value,
            breakdown: {
              item_total: {
                currency_code: formData.currency_code,
                value: formData.unit_amount_value
              }
            }
          }
        }
      ],
      application_context: {
        return_url: `${process.env.REACT_APP_FRONT_URL}/confirmation`,
        cancel_url: "https://example.com/cancel"
      }
    };
    try {
      const response = await api.post('/funds/paypal/createOrder', jsonToSend);
      const { data } = response;
      const linkOpen = data.links.find((e: any) => e.rel === "approve");

      if (linkOpen && linkOpen.href) {
        window.open(linkOpen.href, '_blank');
      } else {
        console.log('Approve link not found');
      }
      console.log('formData:', formData);
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error('Error sending data:', error);
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
              label="Unit Amount (Value) - Example: 100.00"
              variant="outlined"
              margin="normal"
              name="unit_amount_value"
              value={formData.unit_amount_value}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Currency</InputLabel>
              <Select
                label="Currency"
                name="currency_code"
                value={formData.currency_code}
                onChange={(e) => handleChange(e as any)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </FormControl>
            {exchangeRate && (
              <Typography variant="body1" color="textSecondary">
                Current Exchange Rate (1 {formData.currency_code} to BRL): {exchangeRate}
              </Typography>
            )}
            {formData.totalBrl && (
              <Typography variant="body1" color="textSecondary">
                Total in BRL: {formData.totalBrl}
              </Typography>
            )}
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
