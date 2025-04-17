// client/src/User/Components/DashboardHeader.jsx
import React from 'react';
import logo from '../assets/logo.jpg';

const DashboardHeader = ({ searchQuery, handleSearchInputChange, handleSearchSubmit, handleLogout }) => {
  return (
    <div className="h-[12%]">
      {/* Header */}
      <div className=" flex items-center justify-between px-6  py-2 shadow bg-white">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-16 w-16 object-cover" />
          <span className="text-xl font-semibold text-gray-800">
            SkillHub
          </span>
        </div>

        <div className="flex-1 mx-10">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-lg">
            <input
              type="text"
              placeholder="Search skills or people..."
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </form>
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
    </div>
  );
};

export default DashboardHeader;