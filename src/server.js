import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Import your routes
import materialRoutes from './routes/materialRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Student Portal Backend is running!' });
});

// API Routes
app.use('/api/materials', materialRoutes); // 👈 Use your routes here

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
