import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const { theme } = useContext(ThemeContext);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(' https://edwardndiyoo.pythonanywhere.com/get_leaderboard');
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  // Sort the leaderboard data and recalculate ranks
  const sortedLeaderboard = leaderboardData
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((player, index) => ({
      ...player,
      rank: index + 1 // Calculate rank starting from 1
    }));

  return (
    <div className={`leaderboard-page ${theme}`}>
      <h1 className='bounce'>Global Leadership Board</h1>

      <table className={`leaderboard-table ${theme}`}>
  <thead>
    <tr>
      <th>Rank</th>
      <th>Username</th>
      <th>Beginner</th>
      <th>Amateur</th>
      <th>Pro</th>
      <th>Total Score</th>
    </tr>
  </thead>
  <tbody>
    {sortedLeaderboard.map((player) => (
      <tr key={player.username}>
        <td data-label="Rank">{player.rank}</td>
        <td data-label="Username">{player.username}</td>
        <td data-label="Beginner">{player.beginnerScore}</td>
        <td data-label="Amateur">{player.amateurScore}</td>
        <td data-label="Pro">{player.proScore}</td>
        <td data-label="Total Score">{player.totalScore}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default LeaderboardPage;
