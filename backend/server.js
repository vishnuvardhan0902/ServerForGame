const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Other middleware
app.use(express.json());

// Add testing route to verify server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

// MongoDB Atlas Connection
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Please check your Atlas connection string and network connection');
});

// Player Schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

// Routes
app.get('/api/leaderboard', async (req, res) => {
  try {
    const players = await Player.find().sort({ score: -1 }).limit(10);
    console.log('Fetched leaderboard:', players.length, 'players');
    res.json(players);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  try {
    const { name, score } = req.body;
    console.log('Received data:', { name, score });
    
    // Validate input
    if (!name || typeof score !== 'number') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const player = new Player({
      name,
      score
    });

    const newPlayer = await player.save();
    console.log('New player added:', newPlayer);
    
    // Get updated leaderboard
    const players = await Player.find().sort({ score: -1 }).limit(10);
    res.status(201).json(players);
  } catch (err) {
    console.error('Error adding player:', err);
    res.status(400).json({ message: err.message });
  }
});

// Serve static files from the React frontend app
const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));

// For any request that doesn't match an API route, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 4001;
console.log(`Server configured to run on port ${PORT}`);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend is served at: http://localhost:${PORT}`);
  console.log(`API is available at: http://localhost:${PORT}/api`);
}); 