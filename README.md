# The Sacred Drop Leaderboard

A full-stack MERN application for displaying and managing the leaderboard for The Sacred Drop game.

## Project Structure

The project is organized as a monorepo with separate backend and frontend folders:

```
/
├── backend/            # Node.js Express backend
├── frontend/           # React frontend
└── package.json        # Root package.json for managing the monorepo
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup

1. Clone the repository
2. Install all dependencies:
   ```bash
   npm run install:all
   ```

## Configuration

1. The `.env` file in the backend directory should have the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=4001
   ```

2. The frontend environment files:
   - `.env` - Default environment variables
   - `.env.development` - Development environment (used with `npm start`)
   - `.env.production` - Production environment (used with `npm run build`)

   Each should contain:
   ```
   REACT_APP_API_URL=http://localhost:4001  # URL of your backend API
   ```

## Running the Application

1. Start both backend and frontend:
   ```bash
   npm start
   ```

2. Or start them individually:
   ```bash
   # Start backend only
   npm run start:backend
   
   # Start frontend only
   npm run start:frontend
   ```

3. Seed the database with sample data:
   ```bash
   npm run seed
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4001

## Deployment

### Deploying to Render

This project includes a `render.yaml` file for easy deployment to [Render](https://render.com/):

1. Create a new Render account if you don't have one
2. Connect your GitHub/GitLab repository to Render
3. Create a new "Blueprint" and select your repository
4. Render will automatically detect the `render.yaml` file
5. Set up your environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string

The application will automatically build and deploy according to the configuration in `render.yaml`.

## Features

- Display top 10 players in the leaderboard
- Add new player scores
- Real-time updates
- Modern Material-UI design
- Responsive layout
- MongoDB Atlas integration
- Environment-based configuration

## API Endpoints

- GET `/api/leaderboard` - Get top 10 players
- POST `/api/leaderboard` - Add new player score 