// src/App.js
import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import ProfilePage from './components/ProfilePage';
import LeaderboardPage from './components/LeaderboardPage';
import ContactUsPage from './components/ContactUsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { AuthContext, AuthProvider } from './context/AuthContext';

import './App.css';

export const ThemeContext = createContext();

const AppContent = () => {
  const [theme, setTheme] = useState('light');
  const { isAuthenticated, loading } = useContext(AuthContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (loading) {
    // You can return a loading spinner or any loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme}`}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/game" element={isAuthenticated ? <GamePage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login" />} />
            <Route path="/contact" element={isAuthenticated ? <ContactUsPage /> : <Navigate to="/login" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
