

import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './GamePage.css';

const difficulties = {
  beginner: { range: 100, scoreIncrement: 5, penalty: 5 },
  amateur: { range: 1000, scoreIncrement: 10, penalty: 10 },
  pro: { range: 10000, scoreIncrement: 15, penalty: 15 },
};

const getRandomNumber = (max) => Math.floor(Math.random() * max);

const GamePage = () => {
  const { theme } = useContext(ThemeContext);
  const { username } = useContext(AuthContext);
  const [difficulty, setDifficulty] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [trials, setTrials] = useState(0);
  const [hint, setHint] = useState('');
  const [scores, setScores] = useState({
    beginner: 0,
    amateur: 0,
    pro: 0,
    total: 0,
  });

  const [buttonNumbers, setButtonNumbers] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const [gamePlayed, setGamePlayed] = useState(false);

  useEffect(() => {
    const fetchHighestScore = async () => {
      if (username) {
        try {
          const response = await axios.get(`http://localhost:5000/get_highest_score/${username}`);
          setHighestScore(response.data.highestScore || 0);
        } catch (error) {
          console.error('Error fetching highest score:', error);
        }
      }
    };

    fetchHighestScore();
  }, [username]);

  const handleDifficultySelect = (level) => {
    const randomNum = getRandomNumber(difficulties[level].range);
    setDifficulty(level);
    setRandomNumber(randomNum);
    setTrials(0);
    setHint('');
    setShowMessage(false);
    generateButtonNumbers(randomNum, difficulties[level].range);
  };

  const generateButtonNumbers = (correctNumber, range) => {
    const numbers = new Set();
    numbers.add(correctNumber);
    while (numbers.size < 8) {
      numbers.add(getRandomNumber(range));
    }
    setButtonNumbers(Array.from(numbers).sort(() => Math.random() - 0.5));
  };

  const handleGuess = (num) => {
    setTrials(trials + 1);
    setGamePlayed(true);
    if (num === randomNumber) {
      const newScore = scores[difficulty] + difficulties[difficulty].scoreIncrement;
      setScores({
        ...scores,
        [difficulty]: newScore,
        total: scores.total + difficulties[difficulty].scoreIncrement,
      });
      setMessage('You guessed right!');
      setShowMessage(true);
      setTimeout(resetGame, 2000);
    } else {
      setHint(num > randomNumber ? 'It is lower' : 'It is higher');
      if (trials >= 9) {
        setMessage('You are out of trials!');
        setShowMessage(true);
        if (scores[difficulty] > 0) {
          const penalty = difficulties[difficulty].penalty;
          const newScore = Math.max(0, scores[difficulty] - penalty);
          setScores({
            ...scores,
            [difficulty]: newScore,
            total: Math.max(0, scores.total - penalty),
          });
        }
        setTimeout(resetGame, 2000);
      } else {
        generateButtonNumbers(randomNumber, difficulties[difficulty].range);
      }
    }
  };

  const resetGame = () => {
    setDifficulty(null);
    setRandomNumber(null);
    setTrials(0);
    setHint('');
    setButtonNumbers([]);
    setShowMessage(false);
  };

  const handleEndGame = async () => {
    try {
      // Fetch the existing highest score from the backend
      const response = await axios.get(`http://localhost:5000/get_highest_score/${username}`);
      const existingHighestScore = response.data.highestScore || 0;
  
      // Compare the new total score with the existing highest score
      if (scores.total > existingHighestScore) {
        // If the new score is higher, update the database with the new scores
        await axios.post('http://localhost:5000/update_scores', {
          username,
          beginner: scores.beginner,
          amateur: scores.amateur,
          pro: scores.pro,
          totalscore: scores.total,
        });
      }
  
      // Reset scores and game state
      setScores({
        beginner: 0,
        amateur: 0,
        pro: 0,
        total: 0,
      });
      setGamePlayed(false);
      window.location.href = '/game';
    } catch (error) {
      console.error('Error handling end game:', error);
    }
  };
  

  return (
    <div className={`game-page ${theme}`}>
      <div className="highest-score">
        <p>Highest Score: {highestScore}</p>
      </div>
      <h1>Select Difficulty level</h1>
      {difficulty === null ? (
        <div className="difficulty-selection">
          <button onClick={() => handleDifficultySelect('beginner')} className="beginner">Beginner (0-99)</button>
          <button onClick={() => handleDifficultySelect('amateur')} className="amateur">Amateur (0-999)</button>
          <button onClick={() => handleDifficultySelect('pro')} className="pro">Pro (0-9999)</button>
          <p>Beginner Score: {scores.beginner}, Amateur Score: {scores.amateur}, Pro Score: {scores.pro}</p>
          <p>Total Score: {scores.total}</p>
          {gamePlayed && (
            <button className="end-game-button" onClick={handleEndGame}>End Game</button>
          )}
        </div>
      ) : (
        <div className="gameplay">
          <p>Guess a number between 0 and {difficulties[difficulty].range - 1}</p>
          <div className="hint-system">
            <p>{hint}</p>
          </div>
          <div className="number-buttons">
            {buttonNumbers.map((num, i) => (
              <button
                key={i}
                className="number-button"
                onClick={() => handleGuess(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p>Trials: {trials}/10</p>
          <div>
            <p>Beginner Score: {scores.beginner}, Amateur Score: {scores.amateur}, Pro Score: {scores.pro}</p>
          </div>
          <p>Total Score: {scores.total}</p>
        </div>
      )}
      {showMessage && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default GamePage;
