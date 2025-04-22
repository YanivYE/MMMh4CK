import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Challenge } from '../models/challenge.model';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected!');

    // Seed the database with sample challenges
    await seedChallenges();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const seedChallenges = async () => {
  if (process.env.DB_TEST !== "true") {
    console.log("Skipping seeding — DB_TEST is not true.");
    return;
  }

  const existingChallenges = await Challenge.find();
  if (existingChallenges.length > 0) {
    console.log('Challenges already exist in the database. Skipping seeding.');
    return;
  }

  const sampleChallenges = [
    {
      title: 'Basic SQL Injection',
      description: 'Find the admin password using SQL injection.',
      flag: 'FLAG{SQL_INJECTION_SUCCESS}',
      score: 100,
      category: 'web',
      difficulty: 'easy',
    },
    {
      title: 'Reverse Engineering 101',
      description: 'Analyze the binary to find the hidden flag.',
      flag: 'FLAG{REVERSE_ENGINEERING}',
      score: 200,
      category: 'reverse',
      difficulty: 'medium',
    },
    {
      title: 'XSS Attack',
      description: 'Exploit the XSS vulnerability to steal cookies.',
      flag: 'FLAG{XSS_ATTACK_SUCCESS}',
      score: 150,
      category: 'web',
      difficulty: 'medium',
    },
    {
      title: 'Buffer Overflow',
      description: 'Exploit the buffer overflow vulnerability to gain control.',
      flag: 'FLAG{BUFFER_OVERFLOW}',
      score: 300,
      category: 'pwn',
      difficulty: 'hard',
    },
  ];

  await Challenge.insertMany(sampleChallenges);
  console.log('Sample challenges added to the database.');
};

