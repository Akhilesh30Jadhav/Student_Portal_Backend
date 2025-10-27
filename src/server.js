import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import materialRoutes from './routes/materialRoutes.js';

dotenv.config();

const app = express();

// ✅ CORS Configuration - FIX
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://student-portal-one-phi.vercel.app', // Your Vercel domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Middleware - ✅ CORS must be BEFORE routes
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Student Portal Backend is running!' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
