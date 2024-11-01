// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css'; // Ensure CSS file is properly imported

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src="./src/assets/mitwpu_logo.png" alt="MITWPU Logo" className="logo-img" />
        <span className="logo-text">MITWPU</span>
      </div>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li className="welcome-text">Welcome, {user.username}</li>
              {user.role === 'admin' && (
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
              )}
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
