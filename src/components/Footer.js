import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { AuthContext } from '../context/AuthContext';
import { FaGithub, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const { username } = useContext(AuthContext);

  const [feedback, setFeedback] = useState({
    username: username || '', // Pre-fill the username field with the logged-in user's username
    email: '',
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/feedback', feedback);
      alert(response.data.message);
      setFeedback({
        username: username || '', // Reset the username field after submission
        email: '',
        feedback: ''
      });
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting feedback.');
    }
  };

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="feedback-section">
          <h3> {username}, LEAVE A FEEDBACK</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={feedback.username} // Username field is pre-filled
              onChange={handleChange}
              required
              readOnly // Make the username field read-only if you don't want it to be editable
            />
            <textarea
              name="feedback"
              placeholder="Comment"
              value={feedback.feedback}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="separators"></div>
        <div className="links-section">
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/game">Game</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="social-links">
            <a href="https://github.com/Edwardndiyo" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} /> {/* GitHub Icon */}
            </a>
            <a href="https://linkedin.com/in/edward-ndiyo-a349b918b" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} /> {/* LinkedIn Icon */}
            </a>
            <a href="https://twitter.com/@_ed__Ward_" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} /> {/* Twitter Icon */}
            </a>
            <a href="https://wa.me/08073342004" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={30} /> {/* WhatsApp Icon */}
            </a>
          </div>
          <div className="contact-info">
            <p>Email: <a href="mailto:Ndiyoedward@gmail.com">Ndiyoedward@gmail.com</a></p>
            <p>Phone: <a href="tel:+2348073342004">08073342004</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
