// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ThemeContext } from '../App';
// import './HomePage.css';
// import diceImage from '../images/f683dbe4-5290-4692-8e2e-5f4695df85ee.jpg';

// const HomePage = () => {
//   const { theme } = useContext(ThemeContext);
//   const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(() => {
//     // Fetch initial feedbacks from the server
//     fetch('http://localhost:5000/get_feedbacks')
//       .then(response => response.json())
//       .then(data => setFeedbacks(data))
//       .catch(error => console.error('Error fetching feedbacks:', error));
//   }, []);

//   return (
//     <div className={`homepage ${theme}`}>
//       <section className="hero">
//         {/* <img src={diceImage} alt="Dice" className="hero-image" /> */}
//         <h1>Guess the Number</h1>
//         <p>Think you can guess the number? Put your skills to the test!</p>
//         <Link to="/game" className="cta-button">Play Now</Link>
//       </section>

//       <section className="description">
//         <h2>About the Game</h2>
//         <div className="card">
//           <p>
//             The Number Guessing Game is a fun and challenging game where you try to guess a randomly generated number within a certain range. The fewer guesses you make, the higher your score!
//           </p>
//         </div>
//       </section>

//       <section className="how-to-play">
//         <h2>How to Play</h2>
//         <div className="card">
//           <p>1. Choose a difficulty level.</p>
//           <p>2. The system will generate a random number within the range.</p>
//           <p>3. Enter your guess and click 'Submit'.</p>
//           <p>4. Receive hints to help you guess the correct number.</p>
//           <p>5. Continue guessing until you find the correct number.</p>
//         </div>
//       </section>

//       <section className="features">
//         <h2>Game Features</h2>
//         <div className="feature-card leaderboard">
//           <h3>Leaderboard</h3>
//           <p>Compete with players around the world and see your rank on the global leaderboard.</p>
//         </div>
//         <div className="feature-card difficulty">
//           <h3>Difficulty Levels</h3>
//           <p>Choose from different difficulty levels to match your skill level. Start easy and work your way up to expert!</p>
//         </div>
//       </section>

//       <section className="feedback">
//         <h2>User Feedback</h2>
//         <div className="feedback-container">
//           {feedbacks.map((feedback, index) => (
//             <div key={index} className="feedback-card">
//               <h3>{feedback.name}</h3>
//               <p>{feedback.comment}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;





import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { AuthContext } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const { username } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch initial feedbacks from the server
    fetch('http://localhost:5000/get_feedbacks')
      .then(response => response.json())
      .then(data => setFeedbacks(data))
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, []);

  return (
    <div className={`homepage ${theme}`}>
      <section className="hero">
        <h1>Guess the Number</h1>
        <p>Think you can guess the number? Put your skills to the test!</p>
        <Link to="/game" className="cta-button">Play Now</Link>
      </section>

      <section className="description">
        <h2>About the Game</h2>
        <div className="card">
          <p>
            The Number Guessing Game is a fun and challenging game where you try to guess a randomly generated number within a certain range. The fewer guesses you make, the higher your score!
          </p>
        </div>
      </section>

      <section className="how-to-play">
        <h2>How to Play</h2>
        <div className="card">
          <p>1. Choose a difficulty level.</p>
          <p>2. The system will generate a random number within the range.</p>
          <p>3. Enter your guess and click 'Submit'.</p>
          <p>4. Receive hints to help you guess the correct number.</p>
          <p>5. Continue guessing until you find the correct number.</p>
        </div>
      </section>

      <section className="features">
        <h2>Game Features</h2>
        <div className="feature-card leaderboard">
          <h3>Leaderboard</h3>
          <p>Compete with players around the world and see your rank on the global leaderboard.</p>
        </div>
        <div className="feature-card difficulty">
          <h3>Difficulty Levels</h3>
          <p>Choose from different difficulty levels to match your skill level. Start easy and work your way up to expert!</p>
        </div>
      </section>

      <section className="feedback">
        <h2>User Feedback</h2>
        <div className="feedback-container">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-card">
              <h3>{feedback.name}</h3>
              <p>{feedback.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="welcome">
        <h2>Welcome, {username}!</h2>
      </section>
    </div>
  );
};

export default HomePage;
