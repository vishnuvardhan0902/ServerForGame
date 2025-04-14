# The Sacred Drop Leaderboard - Frontend

This is the frontend application for The Sacred Drop Leaderboard. It's built with React and Material UI.

## Tech Stack

- React
- Material UI
- Axios for API calls

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production to the `build` folder
- `npm test` - Launches the test runner
- `npm run eject` - Ejects the app from create-react-app

## Environment Variables

The app uses the following environment variables:

- `REACT_APP_API_URL` - URL of the backend API

These are configured in the following files:
- `.env` - Default environment variables
- `.env.development` - Development environment (used with `npm start`)
- `.env.production` - Production environment (used with `npm run build`)

## Features

- Display top 10 players in the leaderboard
- Add new player scores
- Modern Material-UI design
- Responsive layout 