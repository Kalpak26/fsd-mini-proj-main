/*.src/components/Header.jsx*/

import React, { useState, useEffect } from 'react';
import './Header.css'; // Separate CSS for header styles

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src="./src/assets/mitwpu_logo.png" alt="MITWPU Logo" className="logo-img" />
        <span className="logo-text">MITWPU</span>
      </div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/events">Events</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
