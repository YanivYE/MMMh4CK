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

// Function to seed the database with sample challenges
const seedChallenges = async () => {
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
      category: 'Web Exploitation',
    },
    {
      title: 'Reverse Engineering 101',
      description: 'Analyze the binary to find the hidden flag.',
      flag: 'FLAG{REVERSE_ENGINEERING}',
      score: 200,
      category: 'Reverse Engineering',
    },
    {
      title: 'XSS Attack',
      description: 'Exploit the XSS vulnerability to steal cookies.',
      flag: 'FLAG{XSS_ATTACK_SUCCESS}',
      score: 150,
      category: 'Web Exploitation',
    },
    {
      title: 'Buffer Overflow',
      description: 'Exploit the buffer overflow vulnerability to gain control.',
      flag: 'FLAG{BUFFER_OVERFLOW}',
      score: 300,
      category: 'Binary Exploitation',
    },
  ];

  await Challenge.insertMany(sampleChallenges);
  console.log('Sample challenges added to the database.');
};
