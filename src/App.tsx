import React from 'react';
import './App.css';
import Form from './components/Form';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <header className="App-header">
        <Typography variant="h2" component="h1" gutterBottom>
          Visa - Criativa Integração
        </Typography>
        <Form />
      </header>
    </Container>
  );
}

export default App;
