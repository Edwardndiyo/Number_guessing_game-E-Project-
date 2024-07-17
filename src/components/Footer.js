
// export default Footer;
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const [feedback, setFeedback] = useState({
    username: '',
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
        username: '',
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
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="social-links">
        <a href="https://github.com/Edwardndiyo" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://twitter.com/@_ed__Ward_" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://wa.me/08073342004" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
      <div className="contact-info">
        <p>Email: <a href="mailto:Ndiyoedward@gmail.com">Ndiyoedward@gmail.com</a></p>
        <p>Phone: <a href="tel:+2348073342004">08073342004</a></p>
      </div>
      <div className="feedback-form">
        <h3>Feedback</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Name"
            value={feedback.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={feedback.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="feedback"
            placeholder="Comment"
            value={feedback.feedback}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
