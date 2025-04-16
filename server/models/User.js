import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  earnedTime: {
    type: Number,
    default: 0
  },
  availableTime: {
    type: Number,
    default: 0
  },
  teachSkills: {
    type: [String],
    default: []
  },
  learnSkills: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
