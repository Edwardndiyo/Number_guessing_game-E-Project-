// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { ThemeContext } from '../App';
// import './Navbar.css';

// const Navbar = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <nav className={`navbar ${theme}`}>
//       <h1> Diced </h1>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/game">Game</Link>
//         </li>
//         <li>
//           <Link to="/profile">Profile</Link>
//         </li>
//         <li>
//           <Link to="/leaderboard">Leaderboard</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact Us</Link>
//         </li>
//       </ul>
//       <button onClick={toggleTheme} className="theme-toggle">
//         {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
//       </button>
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import './Navbar.css';

// const Navbar = () => {
//   const { isAuthenticated, logout, username } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/game">Game</Link></li>
//         <li><Link to="/profile">Profile</Link></li>
//         <li><Link to="/leaderboard">Leaderboard</Link></li>
//         <li><Link to="/contact">Contact Us</Link></li>
//       </ul>
//       <div className="auth-section">
//         {isAuthenticated ? (
//           <>
//             <span>Welcome, {username}!</span>
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import './Navbar.css';

// const Navbar = () => {
//   const { isAuthenticated, logout, username } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/game">Game</Link></li>
//         <li><Link to="/profile">Profile</Link></li>
//         <li><Link to="/leaderboard">Leaderboard</Link></li>
//         <li><Link to="/contact">Contact Us</Link></li>
//       </ul>
//       <div className="auth-section">
//         {isAuthenticated ? (
//           <>
//             <span>Welcome, {username}!</span>
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  return (
    <nav className={`navbar ${theme}`}>
      <h1>Diced</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <span className="username">{username}</span>
            <button onClick={logout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
