import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Confirmation from './components/Confirmation';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <header className="App-header">
          <Typography variant="h2" component="h1" gutterBottom>
            Visa - Criativa Integração
          </Typography>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </header>
      </Container>
    </Router>
  );
}

export default App;
