import mongoose from 'mongoose';
import { Challenge } from '../models/challenge.model';

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

  // thse challenges exist for testing the UI and should not be used in production
  // or in the final version of the game. They are not part of the game and should be removed.
  // they are only here to help the developers test the game and the UI.
  // challenges titles are set to coutries names to fit the world map page feature. 
  // this can be changed later on when the map is disabled
  const sampleChallenges = [
    {
      title: 'Russia',
      description: 'Find the admin password using SQL injection.',
      flag: 'MMMh4CK{SQL_INJECTION_SUCCESS}',
      score: 100,
      category: 'web',
      difficulty: 'easy',
    },
    {
      title: 'China',
      description: 'Analyze the binary to find the hidden flag.',
      flag: 'MMMh4CK{REVERSE_ENGINEERING}',
      score: 200,
      category: 'reverse',
      difficulty: 'medium',
      file_url: 'https://example.com/binaries/reverse101.zip',
    },
    {
      title: 'Canada',
      description: 'Exploit the XSS vulnerability to steal cookies.',
      flag: 'MMMh4CK{XSS_ATTACK_SUCCESS}',
      score: 150,
      category: 'web',
      difficulty: 'medium',
      hint: 'Try injecting into the comment form!',
    },
    {
      title: 'United States of America',
      description: 'Exploit the buffer overflow vulnerability to gain control.',
      flag: 'MMMh4CK{BUFFER_OVERFLOW}',
      score: 300,
      category: 'pwn',
      difficulty: 'hard',
      server_details: 'nc bof.mmmh4ck.il 31337',
    },
    {
      title: 'Brazil',
      description: 'Break the Caesar cipher to find the flag.',
      flag: 'MMMh4CK{CAESAR_CRACKED}',
      score: 120,
      category: 'crypto',
      difficulty: 'easy',
      hint: 'It’s just a simple rotation...',
    },
    {
      title: 'Australia',
      description: 'Extract the hidden message from the image.',
      flag: 'MMMh4CK{HIDDEN_PIXELS}',
      score: 180,
      category: 'forensics',
      difficulty: 'medium',
      file_url: 'https://example.com/files/image.jpg',
    },
    {
      title: 'India',
      description: 'Perform heap spraying and get the flag.',
      flag: 'MMMh4CK{HEAP_CONTROLLED}',
      score: 250,
      category: 'pwn',
      difficulty: 'hard',
      server_details: 'nc heap.mmmh4ck.il 4000',
    },
    {
      title: 'Argentina',
      description: 'Use everything you know to break this one.',
      flag: 'MMMh4CK{RANDOM_STUFF}',
      score: 175,
      category: 'misc',
      difficulty: 'medium',
    },
    {
      title: 'Saudi Arabia',
      description: 'Find the arabs.',
      flag: 'MMMh4CK{YOU_FOUND_AN_ARAB}',
      score: 250,
      category: 'osint',
      difficulty: 'hard',
    },
  ];
  
  await Challenge.insertMany(sampleChallenges);
  console.log('Sample challenges added to the database.');
};

