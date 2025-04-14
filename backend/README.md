# The Sacred Drop Leaderboard - Backend

This is the backend service for The Sacred Drop Leaderboard application. It provides the API for the leaderboard data and serves the frontend static files in production.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose

## Available Scripts

- `npm start` - Starts the server in production mode
- `npm run dev` - Starts the server in development mode with hot reloading (nodemon)

## API Endpoints

- `GET /api/test` - Test endpoint to verify server is running
- `GET /api/leaderboard` - Get top 10 players
- `POST /api/leaderboard` - Add new player score

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster_url/database_name
PORT=4001
```

Replace the values with your actual MongoDB Atlas connection string and desired port. 