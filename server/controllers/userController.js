// server/controllers/userController.js
import User from '../models/User.js';
import path from 'path'; // Import path module for file extensions

// @desc    Update user profile (skills, etc.)
// @route   PUT /api/user/profile/update
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // User is attached to req by protect middleware

    if (user) {
      // For now, let's allow updating name, teachSkills, learnSkills
      user.name = req.body.name || user.name; // Keep existing name if not provided
      user.teachSkills = req.body.teachSkills || user.teachSkills; // Keep existing if not provided
      user.learnSkills = req.body.learnSkills || user.learnSkills; // Keep existing if not provided


      const updatedUser = await user.save();

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          teachSkills: updatedUser.teachSkills,
          learnSkills: updatedUser.learnSkills,
          earnedTime: updatedUser.earnedTime,
          availableTime: updatedUser.availableTime,
        },
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};


const searchUsers = async (req, res) => {
    const { query } = req.query; // Get the search query from request query parameters
  
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
  
    try {
      // MongoDB query to search in name, teachSkills, and learnSkills
      const users = await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // 'i' for case-insensitive search
          { teachSkills: { $regex: query, $options: 'i' } },
          { learnSkills: { $regex: query, $options: 'i' } },
        ],
      }).select('-password'); // Exclude password for security
  
      res.json({
        results: users, // Send the search results back to the client
      });
    } catch (error) {
      console.error('User search error:', error);
      res.status(500).json({ message: 'Server error during user search' });
    }
  };

  const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).select('-password'); // Find user by ID from URL param
  
      if (!user) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.json({ user }); // Send the user profile back
    } catch (error) {
      console.error('Get User Profile Error:', error);
      // Check for ObjectId validity in case of invalid userId format
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
      res.status(500).json({ message: 'Server error fetching user profile' });
    }
  };

// @desc    Update user profile picture
// @route   PUT /api/user/profile/picture
// @access  Private
const updateUserProfilePicture = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Basic file type validation (still recommended)
      const allowedImageTypes = /jpeg|jpg|png|gif/;
      const extname = allowedImageTypes.test(path.extname(req.file.originalname).toLowerCase());
      const mimetype = allowedImageTypes.test(req.file.mimetype);
  
      if (!mimetype || !extname) {
        return res.status(400).json({ message: 'Invalid image type. ...' });
      }
  
      // **Correctly construct the public URL for the saved file:**
      const pictureUrl = `/uploads/profile_pictures/${req.file.filename}`; // req.file.filename from multer
  
      user.profilePicture = pictureUrl;
      await user.save();
  
      res.json({
        message: 'Profile picture updated successfully',
        user: {
          profilePicture: user.profilePicture,
        },
      });
      
      
  
    } catch (error) {
      console.error('Update Profile Picture Error:', error);
      res.status(500).json({ message: 'Server error during profile picture upload' });
    }
  };
  
  // @desc    Get leaderboard (top users by earned time)
// @route   GET /api/user/leaderboard
// @access  Private
const getLeaderboard = async (req, res) => {
    try {
      const users = await User.find()
        .sort({ earnedTime: -1 }) // Sort users by earned time (descending)
        .limit(10)                 // Limit to top 10 users
        .select('name email earnedTime'); // Only select needed fields
  
      res.json({ leaderboard: users });
    } catch (error) {
      console.error('Leaderboard Error:', error);
      res.status(500).json({ message: 'Server error retrieving leaderboard' });
    }
  };
  
  
  export { updateUserProfile, searchUsers, getUserProfile, updateUserProfilePicture, getLeaderboard };