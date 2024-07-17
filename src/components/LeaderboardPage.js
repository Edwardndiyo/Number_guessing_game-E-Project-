// import React, { useState, useEffect, useContext } from 'react';
// import { ThemeContext } from '../App';
// import './LeaderboardPage.css';

// const LeaderboardPage = () => {
//   const { theme } = useContext(ThemeContext);
//   const [leaderboardData, setLeaderboardData] = useState([]);

//   const dummyLeaderboardData = [
//     { username: 'JohnDoe', beginnerScore: 150, amateurScore: 200, proScore: 300 },
//     { username: 'JaneSmith', beginnerScore: 180, amateurScore: 210, proScore: 290 },
//     { username: 'AliceJohnson', beginnerScore: 170, amateurScore: 220, proScore: 310 },
//   ];

//   useEffect(() => {
//     fetchLeaderboardData();
//   }, []);

//   const fetchLeaderboardData = () => {
//     setTimeout(() => {
//       setLeaderboardData(dummyLeaderboardData);
//     }, 1000);
//   };

//   const sortedLeaderboard = leaderboardData.map(player => ({
//     ...player,
//     totalScore: player.beginnerScore + player.amateurScore + player.proScore,
//   })).sort((a, b) => b.totalScore - a.totalScore);

//   return (
//     <div className={`leaderboard-page ${theme}`}>
//       <h1>Leaderboard</h1>
//       <table className="leaderboard-table">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Username</th>
//             <th>Beginner</th>
//             <th>Amateur</th>
//             <th>Pro</th>
//             <th>Total Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedLeaderboard.map((player, index) => (
//             <tr key={player.username}>
//               <td>{index + 1}</td>
//               <td>{player.username}</td>
//               <td>{player.beginnerScore}</td>
//               <td>{player.amateurScore}</td>
//               <td>{player.proScore}</td>
//               <td>{player.totalScore}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeaderboardPage;



import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';
// import { ThemeContext } from '../ThemeContext';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const { theme } = useContext(ThemeContext);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_leaderboard');
      const data = await response.json();
      // Add rank to each player based on total score
      const rankedData = data.map((player, index) => ({
        ...player,
        rank: index + 1 // Calculate rank starting from 1
      }));
      setLeaderboardData(rankedData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  const sortedLeaderboard = leaderboardData.sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className={`leaderboard-page ${theme}`}>
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
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
          {sortedLeaderboard.map((player, index) => (
            <tr key={player.username}>
              <td>{player.rank}</td>
              <td>{player.username}</td>
              <td>{player.beginnerScore}</td>
              <td>{player.amateurScore}</td>
              <td>{player.proScore}</td>
              <td>{player.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
