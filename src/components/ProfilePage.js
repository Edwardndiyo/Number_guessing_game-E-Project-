import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../App';
import { AuthContext } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    number: '',
    username: '',
    password: ''
  });
  const [gameRecords, setGameRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage
        const profileResponse = await axios.get(`https://edwardndiyoo.pythonanywhere.com/get_profile/${username}`);
        

        setFormData(profileResponse.data);
  
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchGameRecords = async () => {
      try {
        const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage
       
        const gameRecordsResponse = await axios.get(`https://edwardndiyoo.pythonanywhere.com/get_game_records/${username}`);

    
        setGameRecords(gameRecordsResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchGameRecords ();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (isEditing) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      try {
        const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage
        const response = await axios.post('https://edwardndiyoo.pythonanywhere.com/update_profile', {
          ...formData,
          username,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        });

        if (response.data.success) {
          setIsEditing(false);
          localStorage.setItem('formData', JSON.stringify(formData));
          setError('');
        } else {
          setError('Update failed. Please check your old password.');
        }
      } catch (error) {
        console.error('Error saving profile data:', error);
        setError('Update failed. Please try again.');
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
  };

  return (
    <div className={`profile-page ${theme} ${isEditing ? 'editing' : ''}`}>
      <div className="navbarss">
        <div className="navbar-left">
          <h1 className='bounce '>User Profile</h1>
        </div>
        <div className="navbar-right">
          {isAuthenticated ? (
            <button onClick={logout} className="logout-button">Logout</button>
          ) : (
            <Link to="/login">Logout</Link>
          )}
        </div>
      </div>
      <div className="content">
        <div className={`profile-card ${isEditing ? 'centered' : ''} position-relative`}>
         <div className='top-header'>
          <h2>Registration Details</h2>
          {isEditing && (
            <FaArrowLeft className="back-button" onClick={handleBackClick} />
          )} </div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="text"
                name="number"
                placeholder="Phone"
                value={formData.number}
                onChange={handleInputChange}
              />
              <button type="submit" className="save-button" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Full Name:   </strong> <span>{formData.full_name}</span></p>
              <p><strong>Username:   </strong> <span>{formData.username}</span></p>
              <p><strong>Email:   </strong> <span>{formData.email}</span></p>
              <p><strong>Phone:   </strong> <span>{formData.number}</span></p>
              <button onClick={handleEditClick} className="edit-button">Edit</button>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
        {!isEditing && (
          <div className="game-records-card position-relative">
            <div className='top-header'>
            <h2>Game Records</h2>
            </div>
            <div className="scrollable-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Beginner</th>
                    <th>Amateur</th>
                    <th>Pro</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {gameRecords.length > 0 ? (
                    gameRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.beginner}</td>
                        <td>{record.amateur}</td>
                        <td>{record.pro}</td>
                        <td>{record.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No game records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
