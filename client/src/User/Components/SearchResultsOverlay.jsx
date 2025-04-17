// client/src/User/Components/SearchResultsOverlay.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const SearchResultsOverlay = ({ searchResults, searchQuery }) => {
  const searchResultsRef = useRef(null);

  return (
    <>
      {searchResults.length > 0 && (
        <div ref={searchResultsRef} className="absolute top-[28%] left-0 w-full bg-white shadow-lg rounded-md mt-2 z-10 max-h-[300px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2 p-4">Search Results</h3>
          <ul className="p-4">
            {searchResults.map(user => (
              <li key={user._id} className="mb-2">
                <Link to={`/profile/${user._id}`} className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={user.profilePicture || "/src/client/public/default-profile.png"}
                        alt={`${user.name}'s Profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchQuery.trim() && searchResults.length === 0 && (
        <div className="absolute top-[28%] left-0 w-full bg-white shadow-lg rounded-md mt-2 z-10 p-4 text-gray-700">
          <p>No users found matching your search.</p>
        </div>
      )}
    </>
  );
};

export default SearchResultsOverlay;