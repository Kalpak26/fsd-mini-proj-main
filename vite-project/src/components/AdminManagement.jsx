// src/components/AdminManagement.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AdminManagement = () => {
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const addAdmin = async () => {
    try {
      await axios.post('/api/auth/register', { ...newAdmin, role: 'admin' }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setNewAdmin({ username: '', password: '' });
      setError(null);
    } catch (error) {
      setError('Failed to create admin.');
    }
  };

  return (
    <div>
      <h2>Add New Admin</h2>
      <input type="text" value={newAdmin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} placeholder="Username" />
      <input type="password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} placeholder="Password" />
      <button onClick={addAdmin}>Add Admin</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminManagement;
