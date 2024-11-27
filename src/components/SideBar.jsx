// src/components/Sidebar.jsx
import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-lg">
      <Container fluid>
        <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/users" className="mb-3">Users</Nav.Link>
            <Nav.Link as={Link} to="/roles" className="mb-3">Roles</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
