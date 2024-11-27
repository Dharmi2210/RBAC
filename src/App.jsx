// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Add BrowserRouter import
import { Container } from 'react-bootstrap';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';

function App() {
  return (
    <Router> {/* Wrap the entire app with Router */}
      <Container>
        <UserManagement />
        <RoleManagement />
      </Container>
    </Router>
  );
}

export default App;
