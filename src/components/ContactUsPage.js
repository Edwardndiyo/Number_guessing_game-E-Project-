import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import axios from 'axios';
import './ContactUsPage.css';
import developerImage from '../images/Rpg_Dice_Drawing.jpg';


const ContactUsPage = () => {
  const { theme } = useContext(ThemeContext);
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = `Hello Edward, I am ${formData.name} with email address ${formData.email}. I just checked out your application and I liked it. Here's my message - ${formData.message}.`;
    const whatsappUrl = `https://wa.me/2348073342004?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    try {
      const response = await axios.post('http://localhost:5000/contact', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your message.');
    }

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className={`contact-us-page ${theme}`}>
       <h1 className="bounce">Contact Us</h1>
      <div className="card-container">
        <div className="contact-form card">
          <h2>Like this project? Contact the developer!</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="details-card card">
          {/* <img src='./images/Rpg_Dice_Drawing.jpg' alt="Developer" /> */}
          <img src={developerImage} alt="Developer" />
          <p>This App was developed by Edward Ndiyo, 
Student of APTECH.<br></br> The technologies 
Employed here are REACT, MySQL and <br></br> Flask
(Python). if you liked this project do well to 
contact the <br></br>developer and leave an awesome 
feedback ! thank you</p>
          <p><i className="fas fa-envelope"></i> Ndiyoedward@gmail.com</p>
          <p><i className="fas fa-phone"></i> 08073342004</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
