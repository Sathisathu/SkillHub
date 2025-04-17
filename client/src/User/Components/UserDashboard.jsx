import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { HomeCards } from "../Pages/HomeCards";
import HomeImage from "../assets/HomeImage.avif";
import LeaderBoard from "./LeaderBoard";
import DashboardHeader from "./DashboardHeader";
import DashboardTabs from "./DashboardTabs";
import ProfileSection from "./ProfileSection";
import SearchResultsOverlay from "./SearchResultsOverlay";
import SkillbucksSection from "./SkillbucksSection";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileFormData, setProfileFormData] = useState({
    teachSkills: '',
    learnSkills: '',
    name: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      alert("Session expired or unauthorized!");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileFormData({
        teachSkills: user.teachSkills ? user.teachSkills.join(', ') : '',
        learnSkills: user.learnSkills ? user.learnSkills.join(', ') : '',
        name: user.name || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleInputChange = (e) => {
    setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    setProfilePictureError(null);
    setUploadSuccessMessage(null);
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setProfilePictureError('Please select a valid image file.');
        setSelectedProfilePicture(null);
        return;
      }
      setSelectedProfilePicture(file);
    } else {
      setSelectedProfilePicture(null);
    }
  };

  const handleUpdateProfile = async () => {
    setUploadSuccessMessage(null);
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const skillsToTeach = profileFormData.teachSkills
        .split(',')
        .map(skill => skill.trim())
        .filter(Boolean);

      const skillsToLearn = profileFormData.learnSkills
        .split(',')
        .map(skill => skill.trim())
        .filter(Boolean);

      const updatedProfileData = {
        teachSkills: skillsToTeach,
        learnSkills: skillsToLearn,
        name: profileFormData.name
      };

      // Upload profile picture first if one is selected
      if (selectedProfilePicture) {
        const formData = new FormData();
        formData.append('profilePicture', selectedProfilePicture);

        const pictureUploadRes = await axios.put('/user/profile/picture', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setUser(prevUser => ({
          ...prevUser,
          profilePicture: pictureUploadRes.data.user.profilePicture, // Make sure backend returns full user
        }));

        setUploadSuccessMessage('Profile picture updated!');
        setProfilePictureError(null);
      }

      const res = await axios.put('/user/profile/update', updatedProfileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Profile updated successfully!');
      setUser(res.data.user); // Set updated user state
    } catch (error) {
      console.error("Profile update error:", error);
      setProfilePictureError('Profile update failed.');
    }
  };

  const handleSearchInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    if (!newQuery.trim()) {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const res = await axios.get(`/user/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSearchResults(res.data.results);
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed.');
      setSearchResults([]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Explore":
        return (
          <div>
            <div className="flex">
              <div className="flex justify-center my-6 w-[50%]">
                <img src={HomeImage} width="550px" height="500px" alt="Explore" />
              </div>
              <div className="w-[50%]">
                <div className="mt-32 font-semibold text-3xl text-center">
                  Collaborative Skill Sharing Hub
                </div>
                <div className="text-lg px-14 mt-10">
                  Connect, share, and grow your skills with a vibrant community of learners and mentors.
                  Teach what you know, learn what you love — all in one place.
                </div>
              </div>
            </div>

            <div className="grid grid-rows-2 grid-cols-5 gap-8 bg-secondary px-48 py-14 mt-10">
              {HomeCards.map((item) => (
                <div
                  key={item.id}
                  className="bg-white flex flex-col justify-center items-center p-4 rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="w-[100px] h-[100px]">
                    <img src={item.imgico} alt={item.course} />
                  </div>
                  <div className="text-lg font-semibold">{item.course}</div>
                  <div>{item.members} Teaching</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Leaderboard":
        return <LeaderBoard />;
      case "Skillbucks":
        return (
          <div className="text-center mt-10 text-xl text-gray-700">
            <SkillbucksSection/>
          </div>
        );
      case "Profile":
        return (
          <ProfileSection
            user={user}
            profileFormData={profileFormData}
            handleInputChange={handleInputChange}
            handleUpdateProfile={handleUpdateProfile}
            handleProfilePictureChange={handleProfilePictureChange}
            profilePictureError={profilePictureError}
            uploadSuccessMessage={uploadSuccessMessage}
          />
        );
      default:
        return (
          <div className="text-center mt-10 text-xl text-gray-700">
            Welcome to SkillHub!
          </div>
        );
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen relative">
      <DashboardHeader
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchSubmit={handleSearchSubmit}
        handleLogout={handleLogout}
      />
      <DashboardTabs activeTab={activeTab} handleTabClick={handleTabClick} />
      <div className="h-[80%] overflow-y-auto">
        {renderContent()}
      </div>
      <SearchResultsOverlay
        searchResults={searchResults}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default UserDashboard;
