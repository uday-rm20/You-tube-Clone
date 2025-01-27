import express from 'express';
import connectDB from './Connection/config.js';
import userRoutes from './Routes/userRoutes.js';
import videoRoutes from './Routes/videoRoutes.js';
import commentRoutes from './Routes/commentRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express(); /* setting up the express server */
connectDB(); /* connecting to MongoDB */

app.use(cors({
    origin: 'http://localhost:5173', /* React app URL */
    credentials: true
}));

app.use(express.json()); /* middleware for JSON script parsing */
app.use(cookieParser()); /* middleware to parse cookies */

app.use('/auth', userRoutes);  /* maps userRoutes to /auth */
app.use('/api', videoRoutes);  /* maps videoRoutes to /api */
app.use('/commentApi', commentRoutes);  /* maps commentRoutes to /commentApi */

// Use the PORT environment variable or default to 5100
app.listen(process.env.PORT || 5100, () =>
  console.log(`Server running on http://localhost:${process.env.PORT || 5100}`)
);
