import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-left">
        <h1 className='logo'>Diced</h1>
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-center ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
        <span className="separator" />
        <li><Link to="/game" onClick={closeMobileMenu}>Game</Link></li>
        <span className="separator" />
        <li><Link to="/profile" onClick={closeMobileMenu}>Profile</Link></li>
        <span className="separator" />
        <li><Link to="/leaderboard" onClick={closeMobileMenu}>Leaderboard</Link></li>
        <span className="separator" />
        <li><Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link></li>
        <button onClick={toggleTheme} className={`theme-toggle ${theme}`}>
          {theme === 'light' ? <FaMoon size={30} /> : <FaSun size={35} />}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
