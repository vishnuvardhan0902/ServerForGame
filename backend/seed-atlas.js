const mongoose = require('mongoose');
require('dotenv').config();

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

const dummyPlayers = [
  { name: 'Atlas_Player1', score: 1200 },
  { name: 'Atlas_Player2', score: 1150 },
  { name: 'Atlas_Player3', score: 1100 },
  { name: 'Atlas_Player4', score: 1050 },
  { name: 'Atlas_Player5', score: 1000 },
  { name: 'Atlas_Player6', score: 950 },
  { name: 'Atlas_Player7', score: 900 },
  { name: 'Atlas_Player8', score: 850 },
  { name: 'Atlas_Player9', score: 800 },
  { name: 'Atlas_Player10', score: 750 }
];

async function seedAtlasDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    console.log('Using connection string:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('Connected to MongoDB Atlas');

    // Clear existing data
    await Player.deleteMany({});
    console.log('Cleared existing data');

    // Insert dummy data
    await Player.insertMany(dummyPlayers);
    console.log('Added dummy data to Atlas');

    // Verify the data was inserted
    const count = await Player.countDocuments();
    console.log(`Total players in Atlas database: ${count}`);

    // Display the inserted data
    const players = await Player.find().sort({ score: -1 });
    console.log('Current leaderboard in Atlas:');
    players.forEach((player, index) => {
      console.log(`${index + 1}. ${player.name} - ${player.score}`);
    });

  } catch (error) {
    console.error('Error seeding Atlas database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
  }
}

seedAtlasDatabase(); 