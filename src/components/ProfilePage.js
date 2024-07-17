
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { ThemeContext } from '../App';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const { theme } = useContext(ThemeContext);
//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     number: '',
//     username: '',
//     password: ''
//   });
//   const [gameRecords, setGameRecords] = useState({
//     beginner: 0,
//     amateur: 0,
//     pro: 0,
//     total: 0
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [passwords, setPasswords] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage
//         const profileResponse = await axios.get(`http://localhost:5000/get_profile/${username}`);
//         const gameRecordsResponse = await axios.get(`http://localhost:5000/get_game_records/${username}`);

//         setFormData(profileResponse.data);
//         setGameRecords(gameRecordsResponse.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswords(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSave = async () => {
//     if (isEditing) {
//       if (passwords.newPassword !== passwords.confirmPassword) {
//         setError('New passwords do not match');
//         return;
//       }

//       try {
//         const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage
//         const response = await axios.post('http://localhost:5000/update_profile', {
//           ...formData,
//           username,
//           oldPassword: passwords.oldPassword,
//           newPassword: passwords.newPassword
//         });

//         if (response.data.success) {
//           setIsEditing(false);
//           localStorage.setItem('formData', JSON.stringify(formData));
//           setError('');
//         } else {
//           setError('Update failed. Please check your old password.');
//         }
//       } catch (error) {
//         console.error('Error saving profile data:', error);
//         setError('Update failed. Please try again.');
//       }
//     } else {
//       setIsEditing(true);
//     }
//   };

//   return (
//     <div className={`profile-page ${theme}`}>
//       <h1>Profile Page</h1>
//       <div className="profile-section">
//         <div className="profile-card">
//           <h2>Profile Details</h2>
//           <div className="form-group">
//             <label htmlFor="fullname">Full Name:</label>
//             <input type="text" id="fullname" name="full_name" value={formData.full_name} onChange={handleInputChange} readOnly={!isEditing} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="username">Username:</label>
//             <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} readOnly />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditing} />
//           </div>
//           {isEditing && (
//             <>
//               <div className="form-group">
//                 <label htmlFor="oldPassword">Old Password:</label>
//                 <input type="password" id="oldPassword" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="newPassword">New Password:</label>
//                 <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="confirmPassword">Confirm New Password:</label>
//                 <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} />
//               </div>
//             </>
//           )}
//           <div className="form-group">
//             <label htmlFor="phone">Phone:</label>
//             <input type="text" id="phone" name="number" value={formData.number} onChange={handleInputChange} readOnly={!isEditing} />
//           </div>
//           <button onClick={handleSave}>{isEditing ? 'Update' : 'Edit'}</button>
//           {error && <p className="error-message">{error}</p>}
//         </div>

//         <div className="game-records-card">
//           <h2>Game Records</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Level</th>
//                 <th>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Beginner</td>
//                 <td>{gameRecords.beginner}</td>
//               </tr>
//               <tr>
//                 <td>Amateur</td>
//                 <td>{gameRecords.amateur}</td>
//               </tr>
//               <tr>
//                 <td>Pro</td>
//                 <td>{gameRecords.pro}</td>
//               </tr>
//               <tr>
//                 <td>Total</td>
//                 <td>{gameRecords.total}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../App';
import './ProfilePage.css';

const ProfilePage = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    number: '',
    username: '',
    password: ''
  });
  const [gameRecords, setGameRecords] = useState({
    beginner: 0,
    amateur: 0,
    pro: 0,
    total: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage

    // Fetch user profile
    axios.get(`http://localhost:5000/get_profile/${username}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile', error);
      });

    // Fetch game records
    axios.get(`http://localhost:5000/get_game_records/${username}`)
      .then(response => {
        setGameRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching game records', error);
      });
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
        const response = await axios.post('http://localhost:5000/update_profile', {
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

  return (
    <div className={`profile-page ${theme}`}>
      <h1>Profile Page</h1>
      <div className="profile-section">
        <div className="profile-card">
          <h2>Profile Details</h2>
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" name="full_name" value={formData.full_name} onChange={handleInputChange} readOnly={!isEditing} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditing} />
          </div>
          {isEditing && (
            <>
              <div className="form-group">
                <label htmlFor="oldPassword">Old Password:</label>
                <input type="password" id="oldPassword" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="number" value={formData.number} onChange={handleInputChange} readOnly={!isEditing} />
          </div>
          <button onClick={handleSave}>{isEditing ? 'Update' : 'Edit'}</button>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="game-records-card">
          <h2>Game Records</h2>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Beginner</td>
                <td>{gameRecords.beginner}</td>
              </tr>
              <tr>
                <td>Amateur</td>
                <td>{gameRecords.amateur}</td>
              </tr>
              <tr>
                <td>Pro</td>
                <td>{gameRecords.pro}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{gameRecords.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
