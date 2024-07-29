import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { AuthContext } from '../context/AuthContext';
import aboutGameImage from '../images/717fd4d6f85a77a6eaebc9eec0dfcd69.jpg';
import howToPlayImage from '../images/Rpg_Dice_Drawing.jpg';
import './HomePage.css';

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const { username } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  
  useEffect(() => {
    // Fetch initial feedbacks from the server
    fetch('http://localhost:5000/get_feedbacks')
      .then(response => response.json())
      .then(data => setFeedbacks(data))
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex(prevIndex => (prevIndex + 1) % feedbacks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [feedbacks]);

  return (
    <div className={`homepage ${theme}`}>
      <section className="hero">
        <h1>Welcome, {username}</h1>
        <h2>Guess the Number !!</h2>
        <p>Think you can guess the number? Put your skills to the test!</p>
        <Link to="/game" className="cta-button">Play Now</Link>
      </section>

      <section className="description">
        <div className="header-design">
          <div className="line top"></div>
          ABOUT THE GAME
          <div className="line bottom"></div>
        </div>
        <div className="card">
          <img src={aboutGameImage} alt="About the Game" className="hero-image" />
          <p>
            The Number Guessing Game is a fun and challenging game where you try to guess a randomly generated number within a certain range. The fewer guesses you make, the higher your score!
          </p>
        </div>
      </section>

      <section className="how-to-play">
        <div className="header-design">
          <div className="line top"></div>
          How to Play
          <div className="line bottom"></div>
        </div>
        <div className="card how-to-play-card">
          <div className="how-to-play-content">
            <p>
              1. Choose a difficulty level.<br /> <br />
              2. The system will generate a random number within the range.<br />
              3. Enter your guess and click 'Submit'.<br /> <br />
              4. Receive hints to help you guess the correct number.<br /> <br />
              5. Continue guessing until you find the correct number. <br /> <br />
              6. Save your score to compete with players globally 
            </p>
            <img src={howToPlayImage} alt="How to Play" className="how-to-play-image" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="header-design">
          <div className="line top"></div>
          GAME FEATURES
          <div className="line bottom"></div>
        </div>
        <div className="card features-container">
          <div className="feature-card leaderboard">
            <div className="feature-overlay">
              <h3>LEADERBOARD</h3>
              <p>Compete with players around the world and see your rank on the global leaderboard.</p>
            </div>
          </div>
          <div className="feature-card difficulty">
            <div className="feature-overlay">
              <h3>DIFFICULTY LEVELS</h3>
              <p>Choose different difficulty levels to match your skill. Start easy and work your way up to Pro!</p>
            </div>
          </div>
        </div>
      </section>


      <section className="feedback">
        <div className="header-design">
          <div className="line top"></div>
          User Feedback
          <div className="line bottom"></div>
        </div>
        <div className="card feedback-container">
          <div className="feedback-inner" style={{ transform: `translateX(-${scrollIndex * 33.33}%)` }}>
            {feedbacks.concat(feedbacks).map((feedback, index) => (
              <div key={index} className="feedback-card">
                <h3>{feedback.name}</h3>
                <p>{feedback.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
