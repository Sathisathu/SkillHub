// client/src/User/Components/DashboardTabs.jsx
import React from 'react';

const DashboardTabs = ({ activeTab, handleTabClick }) => {
  return (
    <div className="h-[8%]"> {/* Adjusted height to 8% */}
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
  );
};

export default DashboardTabs;