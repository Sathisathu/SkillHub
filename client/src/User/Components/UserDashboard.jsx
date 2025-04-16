import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { HomeCards } from "../Pages/HomeCards";
import logo from "../assets/logo.jpg";
import HomeImage from "../assets/HomeImage.avif";
import LeaderBoard from "./LeaderBoard";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Explore":
        return (
          <div>
            <div className="flex">
            <div className="flex justify-center my-6 w-[50%]">
              <img src={HomeImage} width="550px" height="550px" />
            </div>
            <div className="w-[50%]">
            <div className=" mt-32 font-semibold text-3xl text-center">
              Collaborative Skill Sharing Hub
            </div>
            <div className="text-lg px-14 mt-10">Connect, share, and grow your skills with a vibrant community of learners and mentors.
            Teach what you know, learn what you love — all in one place.</div></div>
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
            Skillbucks Content Coming Soon...
          </div>
        );
      case "Profile":
        return (
          <div className="text-center mt-10 text-xl text-gray-700">
            Profile Details Here
          </div>
        );
      default:
        return (
          <div className="text-center mt-10 text-xl text-gray-700">
            Welcome to SkillHub!
          </div>
        );
    }
  };

  if (!user)
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        Loading dashboard...
      </div>
    );

  return (
    <div className="flex flex-col h-screen">
      {/* Top 20% Navbar */}
      <div className="h-[20%]">
        {/* Header */}
        <div className=" flex items-center justify-between px-6  py-2 shadow bg-white">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-16 w-16 object-cover" />
            <span className="text-xl font-semibold text-gray-800">
              SkillHub
            </span>
          </div>

          <div className="flex-1 mx-10">
            <input
              type="text"
              placeholder="Search skills or people..."
              className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 border bg-secondary text-white rounded-full hover:bg-primary transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Sub-header */}
        <div className=" flex items-center justify-center  py-4">
          <ul className="flex justify-center items-center rounded-full">
            {["Explore", "Leaderboard", "Skillbucks", "Profile"].map((tab) => (
              <li
                key={tab}
                className={`hover:cursor-pointer p-2 rounded-full px-4 mx-2 ${
                  activeTab === tab ? "bg-secondary text-white" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom 80% Main Content */}
      <div className="h-[80%] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
