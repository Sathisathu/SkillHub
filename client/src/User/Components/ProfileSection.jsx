import React from 'react';

const ProfileSection = ({
  user,
  profileFormData,
  handleInputChange,
  handleUpdateProfile,
  handleProfilePictureChange,
  profilePictureError,
  uploadSuccessMessage
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const getProfilePictureUrl = () => {
    const defaultPath = '/uploads/profile_pictures/default-profile.png';
  
    if (!user?.profilePicture || user.profilePicture === '' || user.profilePicture === defaultPath) {
      return `${backendUrl}${defaultPath}`;
    }
  
    return user.profilePicture.startsWith('http')
      ? user.profilePicture
      : `${backendUrl}${user.profilePicture.startsWith('/') ? '' : '/'}${user.profilePicture}`;
  };
  
  

  const handleImageError = (e) => {
    // Fallback to default image on error
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = `${backendUrl}/uploads/profile_pictures/default-profile.png`;
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h2> */}

      {user ? (
        <form className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Profile Picture */}
          <div className="mb-6 text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-2 border border-gray-300">
            <img
  src={getProfilePictureUrl()}
  alt="Profile Picture"
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = `${backendUrl}/uploads/profile_pictures/default-profile.png`;
  }}
/>


            </div>

            <label htmlFor="profilePictureInput" className="cursor-pointer text-secondary hover:text-primary">
              Upload new picture
            </label>

            <input
              type="file"
              id="profilePictureInput"
              name="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />

            {profilePictureError && (
              <p className="text-red-500 text-sm mt-1">{profilePictureError}</p>
            )}

            {uploadSuccessMessage && (
              <p className="text-green-500 text-sm mt-1">{uploadSuccessMessage}</p>
            )}
          </div>

          {/* Name (disabled) */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          {/* Email (disabled) */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          {/* Skills to Teach */}
          <div className="mb-4">
            <label htmlFor="teachSkills" className="block text-gray-700 text-sm font-bold mb-2">
              Skills you can teach (comma-separated):
            </label>
            <input
              type="text"
              id="teachSkills"
              name="teachSkills"
              value={profileFormData.teachSkills}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Skills to Learn */}
          <div className="mb-6">
            <label htmlFor="learnSkills" className="block text-gray-700 text-sm font-bold mb-2">
              Skills you want to learn (comma-separated):
            </label>
            <input
              type="text"
              id="learnSkills"
              name="learnSkills"
              value={profileFormData.learnSkills}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <button
              type="button"
              className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </form>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default ProfileSection;
