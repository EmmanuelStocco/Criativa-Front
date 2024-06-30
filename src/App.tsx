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
        <img src={`/banner.jpg`} alt="Banner" style={{ maxWidth: '100%', width: '50%', height: 'auto', marginBottom: 20 }} />

          <Typography variant="h2" component="h1" gutterBottom>
            Visa - Criativa integration
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
