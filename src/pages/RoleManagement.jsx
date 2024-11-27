// src/pages/RoleManagement.jsx
import React, { useState, useEffect } from 'react';
import { getRoles, addRole, updateRole, deleteRole } from '../services/api';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import Sidebar from '../components/SideBar';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const response = await getRoles();
    setRoles(response.data);
  };

  const handleAddOrUpdateRole = async (e) => {
    e.preventDefault();
    const { name, permissions } = e.target.elements;
    const role = {
      name: name.value,
      permissions: permissions.value
        .split(',')
        .map((perm) => perm.trim())
        .filter((perm) => perm.length > 0),
    };

    if (currentRole) {
      await updateRole(currentRole.id, role);
    } else {
      await addRole(role);
    }

    setShowModal(false);
    loadRoles();
  };

  const handleDeleteRole = async (id) => {
    await deleteRole(id);
    loadRoles();
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px' }}>
        <h2>Role Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)} className="mb-4">
          Add Role
        </Button>

        <div className="d-flex flex-wrap">
          {roles.map((role) => (
            <Card key={role.id} style={{ width: '18rem', marginRight: '20px', marginBottom: '20px' }} className="shadow-lg">
              <Card.Body>
                <Card.Title>{role.name}</Card.Title>
                <Card.Text>
                  Permissions: {Array.isArray(role.permissions) ? role.permissions.join(', ') : ''}
                </Card.Text>
                <Button variant="warning" onClick={() => { setCurrentRole(role); setShowModal(true); }}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteRole(role.id)} className="ms-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Modal for Adding/Editing Role */}
        <Modal show={showModal} onHide={() => setShowModal(false)} className="fade">
          <Modal.Header closeButton>
            <Modal.Title>{currentRole ? 'Edit Role' : 'Add Role'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddOrUpdateRole}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue={currentRole ? currentRole.name : ''} required />
              </Form.Group>
              <Form.Group controlId="permissions">
                <Form.Label>Permissions</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentRole ? (Array.isArray(currentRole.permissions) ? currentRole.permissions.join(', ') : '') : ''}
                  placeholder="Read, Write, Delete"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">{currentRole ? 'Update' : 'Add'} Role</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default RoleManagement;
