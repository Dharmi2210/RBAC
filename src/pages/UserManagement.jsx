// src/pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../services/api';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import Sidebar from '../components/SideBar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    const { username, email, role } = e.target.elements;
    const user = {
      username: username.value,
      email: email.value,
      role: role.value,
    };

    if (currentUser) {
      await updateUser(currentUser.id, user);
    } else {
      await addUser(user);
    }

    setShowModal(false);
    loadUsers();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px' }}>
        <h2>User Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)} className="mb-4">
          Add User
        </Button>

        <div className="d-flex flex-wrap">
          {users.map((user) => (
            <Card key={user.id} style={{ width: '18rem', marginRight: '20px', marginBottom: '20px' }} className="shadow-lg">
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                  Email: {user.email}
                  <br />
                  Role: {user.role}
                </Card.Text>
                <Button variant="warning" onClick={() => { setCurrentUser(user); setShowModal(true); }}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)} className="ms-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Modal for Adding/Editing User */}
        <Modal show={showModal} onHide={() => setShowModal(false)} className="fade">
          <Modal.Header closeButton>
            <Modal.Title>{currentUser ? 'Edit User' : 'Add User'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddOrUpdateUser}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={currentUser ? currentUser.username : ''} required />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={currentUser ? currentUser.email : ''} required />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" defaultValue={currentUser ? currentUser.role : ''}>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">{currentUser ? 'Update' : 'Add'} User</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default UserManagement;
