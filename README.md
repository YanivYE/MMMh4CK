
![Logo](https://i.postimg.cc/ncbn2yj8/logo-2.png)


# MMMh4CK CTF Platform

A Capture The Flag (CTF) web application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **TypeScript**.

Users can register, solve challenges across various categories, monitor their progress in real-time using visual analytics, view the leaderboard, and even display all challenges on a world map view.



## Badges

![MERN Stack](https://img.shields.io/badge/Stack-MERN-informational?style=flat&logo=mongodb&logoColor=white&color=4CAF50)
![Built with TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)



## Tech Stack

**Client:** React, Tailwind CSS

**Server:** Node.js, Express

**Database**: MongoDB (with Mongoose)

**Authentication**: JWT-based

## Technologies

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
## Features

- 🔒 Secure JWT-based authentication
- 🧠 Solve challenges across multiple categories(Web, Crypto, Forensics, Reverse, Pwn, Misc and Osint)
- 🏆 Dynamic leaderboard and player rankings
- 👤 User profile with avatar, user details and submissions history
- 📈 Dashboard with visual analytics (points over time graph, category breakdown)
- 🌍 World map challenges display
- 📜 Recent challenge submissions tracking
- ⚙️ Admin panel to manage users and challenges
- 🛡️ Input validation and security practices


## Run Locally

Clone the project

```bash
  git clone https://github.com/YanivYE/MMMh4CK.git
```

Go to the project directory

```bash
  cd MMMh4CK
```

Install dependencies

```bash
  npm install
```

Start both server and client

```bash
  cd server
  npm run dev
  cd ../client
  npm run dev
```

Server runs at: `http://localhost:3000`

Client runs at: `http://localhost:5173`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file inside /server/env/. You can use .env.example file to help you

`MONGO_URI`

`JWT_SECRET`

* Update values based on your environment.


## Screenshots

![App Screenshot](https://i.postimg.cc/YCp9M5xc/Screenshot3-dashboard.png)

![App Screenshot](https://i.postimg.cc/2S2560H1/Screenshot2-challenges.png)

![App Screenshot](https://i.postimg.cc/W4z1J0KX/Screenshot1-map.png)

