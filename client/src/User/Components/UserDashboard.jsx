import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const UserDashboard = () => {
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

  if (!user)
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        Loading dashboard...
      </div>
    );

  return (
    <>
      <div className="bg-gradient-to-r from-primary to-secondary min-h-screen">
        <div className="h-[80px] flex items-center justify-center">
          <ul className="flex gap-10 justify-center items-center text-white font-semibold text-lg">
            <li className="hover:border-b-2">Home</li>
            <li>Search</li>
            <li>Leaderboard</li>
            <li>Skillbucks</li>
            <li>Profile</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
