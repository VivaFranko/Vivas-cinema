import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/viva.jpg'; // Шлях до вашого логотипа
import './Header.css';

const Header = () => {
  return (
    <header className="global-header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="CinemaBooking Logo" className="logo" />
          <span className="site-name">Кінотеатр лисий пень</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
