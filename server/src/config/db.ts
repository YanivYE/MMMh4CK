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
      file_url: 'https://example.com/binaries/reverse101.zip',
    },
    {
      title: 'XSS Attack',
      description: 'Exploit the XSS vulnerability to steal cookies.',
      flag: 'FLAG{XSS_ATTACK_SUCCESS}',
      score: 150,
      category: 'web',
      difficulty: 'medium',
      hint: 'Try injecting into the comment form!',
    },
    {
      title: 'Buffer Overflow',
      description: 'Exploit the buffer overflow vulnerability to gain control.',
      flag: 'FLAG{BUFFER_OVERFLOW}',
      score: 300,
      category: 'pwn',
      difficulty: 'hard',
      server_details: 'nc bof.mmmh4ck.il 31337',
    },
    {
      title: 'Crypto Puzzle',
      description: 'Break the Caesar cipher to find the flag.',
      flag: 'FLAG{CAESAR_CRACKED}',
      score: 120,
      category: 'crypto',
      difficulty: 'easy',
      hint: 'It’s just a simple rotation...',
    },
    {
      title: 'Steganography Secrets',
      description: 'Extract the hidden message from the image.',
      flag: 'FLAG{HIDDEN_PIXELS}',
      score: 180,
      category: 'forensics',
      difficulty: 'medium',
      file_url: 'https://example.com/files/image.jpg',
    },
    {
      title: 'Heap Exploitation Fun',
      description: 'Perform heap spraying and get the flag.',
      flag: 'FLAG{HEAP_CONTROLLED}',
      score: 250,
      category: 'pwn',
      difficulty: 'hard',
      server_details: 'nc heap.mmmh4ck.il 4000',
    },
    {
      title: 'Miscellaneous Madness',
      description: 'Use everything you know to break this one.',
      flag: 'FLAG{RANDOM_STUFF}',
      score: 175,
      category: 'misc',
      difficulty: 'medium',
    },
  ];
  

  await Challenge.insertMany(sampleChallenges);
  console.log('Sample challenges added to the database.');
};

