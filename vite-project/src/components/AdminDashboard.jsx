// src/components/AdminDashboard.jsx
import React from 'react';
import ClubManagement from './ClubManagement';
import AdminManagement from './AdminManagement';
import './AdminDashboard.css';
import EventManagement from './EventManagement';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="module-section">
        <ClubManagement />
      </div>
      <div className="module-section">
        <EventManagement />
      </div>
      <div className="module-section">
        <AdminManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;
