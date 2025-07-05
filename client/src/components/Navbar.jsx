import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">WealthWise 💰</div>
    <div className="navbar-links">
      <Link to="/">Onboard</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  </nav>
);

export default Navbar;