import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { updateUserProfile, searchUsers, getUserProfile, updateUserProfilePicture, getLeaderboard } from '../controllers/userController.js';
import multer from 'multer';



import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const router = express.Router();

router.get('/dashboard', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ user });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


const storage = multer.diskStorage({ // <-- Changed to diskStorage
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads/profile_pictures/')); // Directory to save files
    },
    filename: function (req, file, cb) {
      // Generate a unique filename - important to avoid collisions and security issues
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // e.g., profilePicture-1678901234567-123456789.jpg
    }
  });
router.get('/search', protect, searchUsers);
router.put('/profile/update', protect, updateUserProfile);
router.get('/profile/:userId', protect, getUserProfile);
router.get('/leaderboard', protect, getLeaderboard);

// Configure multer for file uploads - simplest in-memory storage for now
const upload = multer({ storage: storage }); // Initialize multer with storage config

// PUT route to update user profile picture
router.put('/profile/picture', protect, upload.single('profilePicture'), updateUserProfilePicture); // 'profilePicture' is the field name in FormData

export default router;
