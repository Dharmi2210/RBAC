import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', role: 'Admin' },
  { id: 2, name: 'Jane Smith', role: 'User' },
];

let roles = ['Admin', 'User', 'Editor'];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend API! Use /users or /roles to interact.');
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: 'Name and role are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, role } = req.body;

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    role: role || users[userIndex].role,
  };

  res.json({ message: 'User updated successfully', user: users[userIndex] });
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
});

// Get all roles
app.get('/roles', (req, res) => {
  res.json(roles);
});

// Add a new role
app.post('/roles', (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: 'Role is required' });
  }

  if (roles.includes(role)) {
    return res.status(409).json({ message: 'Role already exists' });
  }

  roles.push(role);
  res.status(201).json({ message: 'Role added successfully', role });
});

// Update a role by index
app.put('/roles/:id', (req, res) => {
  const roleId = parseInt(req.params.id);
  const { role } = req.body;

  if (roleId < 0 || roleId >= roles.length) {
    return res.status(404).json({ message: 'Role not found' });
  }

  if (!role) {
    return res.status(400).json({ message: 'Role is required' });
  }

  roles[roleId] = role;
  res.json({ message: 'Role updated successfully', role });
});

// Delete a role by index
app.delete('/roles/:id', (req, res) => {
  const roleId = parseInt(req.params.id);

  if (roleId < 0 || roleId >= roles.length) {
    return res.status(404).json({ message: 'Role not found' });
  }

  const deletedRole = roles.splice(roleId, 1);
  res.json({ message: 'Role deleted successfully', role: deletedRole });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

