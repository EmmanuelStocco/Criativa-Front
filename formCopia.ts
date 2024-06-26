import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../services/api';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    recipientPrimaryAccountNumber: '',
    transactionIdentifier: '',
    acquiringBin: '',
    retrievalReferenceNumber: '',
    systemsTraceAuditNumber: '',
    senderName: '',
    businessApplicationId: '',
    transactionCurrencyCode: '',
    recipientName: '',
    sourceAmount: '',
    senderCountryCode: '',
    senderAccountNumber: '',
    amount: '',
    localTransactionDateTime: '',
    purposeOfPayment: '',
    cardAcceptor: {
      address: {
        country: '',
        zipCode: '',
        county: '',
        state: ''
      },
      idCode: '',
      name: '',
      terminalId: ''
    },
    senderReference: '',
    acquirerCountryCode: '',
    sourceCurrencyCode: '',
    senderCity: '',
    senderStateCode: '',
    sourceOfFundsCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('cardAcceptor.address.')) {
      const addressField = name.split('.')[2];
      setFormData(prevState => ({
        ...prevState,
        cardAcceptor: {
          ...prevState.cardAcceptor,
          address: {
            ...prevState.cardAcceptor.address,
            [addressField]: value
          }
        }
      }));
    } else if (name.includes('cardAcceptor.')) {
      const cardAcceptorField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        cardAcceptor: {
          ...prevState.cardAcceptor,
          [cardAcceptorField]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('e', e)
      const response = await api.post('/funds', formData);
      console.log('response', response)
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
          Formulário
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                <TextField
                  fullWidth
                  label="Recipient Primary Account Number"
                  variant="outlined"
                  margin="normal"
                  name="recipientPrimaryAccountNumber"
                  value={formData.recipientPrimaryAccountNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Transaction Identifier"
                  variant="outlined"
                  margin="normal"
                  name="transactionIdentifier"
                  value={formData.transactionIdentifier}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Acquiring Bin"
                  variant="outlined"
                  margin="normal"
                  name="acquiringBin"
                  value={formData.acquiringBin}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Retrieval Reference Number"
                  variant="outlined"
                  margin="normal"
                  name="retrievalReferenceNumber"
                  value={formData.retrievalReferenceNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Systems Trace Audit Number"
                  variant="outlined"
                  margin="normal"
                  name="systemsTraceAuditNumber"
                  value={formData.systemsTraceAuditNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Sender Name"
                  variant="outlined"
                  margin="normal"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Business Application ID"
                  variant="outlined"
                  margin="normal"
                  name="businessApplicationId"
                  value={formData.businessApplicationId}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Transaction Currency Code"
                  variant="outlined"
                  margin="normal"
                  name="transactionCurrencyCode"
                  value={formData.transactionCurrencyCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Recipient Name"
                  variant="outlined"
                  margin="normal"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Source Amount"
                  variant="outlined"
                  margin="normal"
                  name="sourceAmount"
                  value={formData.sourceAmount}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Sender Country Code"
                  variant="outlined"
                  margin="normal"
                  name="senderCountryCode"
                  value={formData.senderCountryCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Sender Account Number"
                  variant="outlined"
                  margin="normal"
                  name="senderAccountNumber"
                  value={formData.senderAccountNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Amount"
                  variant="outlined"
                  margin="normal"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Local Transaction Date Time"
                  variant="outlined"
                  margin="normal"
                  name="localTransactionDateTime"
                  value={formData.localTransactionDateTime}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Purpose of Payment"
                  variant="outlined"
                  margin="normal"
                  name="purposeOfPayment"
                  value={formData.purposeOfPayment}
                  onChange={handleChange}
                />

              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Card Acceptor
                </Typography>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  margin="normal"
                  name="cardAcceptor.address.country"
                  value={formData.cardAcceptor.address.country}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Zip Code"
                  variant="outlined"
                  margin="normal"
                  name="cardAcceptor.address.zipCode"
                  value={formData.cardAcceptor.address.zipCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="County"
                  variant="outlined"
                  margin="normal"
                  name="cardAcceptor.address.county"
                  value={formData.cardAcceptor.address.county}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  margin="normal"
                  name="cardAcceptor.address.state"
                  value={formData.cardAcceptor.address.state}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="ID Code"
                  variant="outlined"
                  margin="normal"
                  name="cardAcceptor.idCode"
                  value={formData.cardAcceptor.idCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  name="cardAcceptor.name"
                  value={formData.cardAcceptor.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Terminal ID"
                  variant="outlined"
                  margin="normal"
                  name="cardAcceptor.terminalId"
                  value={formData.cardAcceptor.terminalId}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Sender Reference"
                  variant="outlined"
                  margin="normal"
                  name="senderReference"
                  value={formData.senderReference}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Acquirer Country Code"
                  variant="outlined"
                  margin="normal"
                  name="acquirerCountryCode"
                  value={formData.acquirerCountryCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Source Currency Code"
                  variant="outlined"
                  margin="normal"
                  name="sourceCurrencyCode"
                  value={formData.sourceCurrencyCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Sender City"
                  variant="outlined"
                  margin="normal"
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Sender State Code"
                  variant="outlined"
                  margin="normal"
                  name="senderStateCode"
                  value={formData.senderStateCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Source of Funds Code"
                  variant="outlined"
                  margin="normal"
                  name="sourceOfFundsCode"
                  value={formData.sourceOfFundsCode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Enviar
            </Button>
          </div>

        </form>
      </Box>
    </Container>
  );
};

export default Form;
