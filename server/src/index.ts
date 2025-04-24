import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import challengeRoutes from './routes/challenge.routes';
import submissionRoutes from './routes/submission.routes'; 

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);   
app.use('/api/challenge', challengeRoutes);
app.use('/api/submission', submissionRoutes); 

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
