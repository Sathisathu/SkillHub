// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url'; // Added `fileURLToPath` import

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // `__dirname` is now defined

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

// Serve static files from the 'public' directory now
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send('SkillHub API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));