import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Unauthorized: No token found.');
        }

        const response = await axios.get('/user/leaderboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeaderboardData(response.data.leaderboard || []);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to load leaderboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-lg font-medium text-gray-600">Loading Leaderboard...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-4xl font-extrabold text-center text-secondary mb-2">🏆 SkillHub Leaders</h2>
      <p className="text-gray-500 text-center mb-8 text-lg">Top contributors ranked by Skillbucks earned.</p>

      <ul className="space-y-6">
        {leaderboardData.map((user, index) => {
          const profilePic = user.profilePicture
            ? `${backendUrl}${user.profilePicture.startsWith('/') ? '' : '/'}${user.profilePicture}`
            : `${backendUrl}/uploads/profile_pictures/default-profile.png`;

          return (
            <li
              key={user._id || index}
              className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Rank Badge + Profile Image */}
              <div className="relative w-16 h-16 mr-4">
                <div className="absolute -top-2 -left-2 bg-secondary text-white font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                  {index + 1}
                </div>
                <img
                  src={profilePic}
                  alt={`${user.name}'s Profile`}
                  className="w-16 h-16 rounded-full border-2 border-indigo-200 object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>

              {/* Skillbucks */}
              <div className="text-right">
                <span className="text-xl font-bold text-secondary">{user.earnedTime || 0}</span>
                <p className="text-xs text-gray-400">SkillBucks</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeaderBoard;
