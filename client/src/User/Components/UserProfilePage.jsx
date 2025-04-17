// client/src/User/Components/UserProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get user ID from URL
import axios from '../api/axios'; // Your axios instance

const UserProfilePage = () => {
  const { userId } = useParams(); // Extract userId from the URL path
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token'); // Assuming you need token for profile access
        const response = await axios.get(`/user/profile/${userId}`, { // Backend route to get profile by ID
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserProfile(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]); // Fetch profile when userId in URL changes

  if (loading) {
    return <div>Loading user profile...</div>; // Or a spinner
  }

  if (error) {
    return <div>Error loading user profile: {error}</div>;
  }

  if (!userProfile) {
    return <div>User profile not found.</div>; // Should ideally not happen if backend is working
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
          <img
            src={userProfile.profilePicture || "/src/client/public/default-profile.png"}
            alt={`${userProfile.name}'s Profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
          <p className="text-gray-600">{userProfile.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Skills to Teach</h3>
        {userProfile.teachSkills && userProfile.teachSkills.length > 0 ? (
          <ul>
            {userProfile.teachSkills.map((skill, index) => (
              <li key={index} className="ml-4 list-disc">{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills listed to teach.</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Skills to Learn</h3>
        {userProfile.learnSkills && userProfile.learnSkills.length > 0 ? (
          <ul>
            {userProfile.learnSkills.map((skill, index) => (
              <li key={index} className="ml-4 list-disc">{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills listed to learn.</p>
        )}
      </div>
      {/* You can add more profile details here as needed */}
    </div>
  );
};

export default UserProfilePage;