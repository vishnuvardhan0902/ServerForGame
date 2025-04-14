const mongoose = require('mongoose');
require('dotenv').config();

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

const dummyPlayers = [
  { name: 'Player1', score: 1000 },
  { name: 'Player2', score: 950 },
  { name: 'Player3', score: 900 },
  { name: 'Player4', score: 850 },
  { name: 'Player5', score: 800 },
  { name: 'Player6', score: 750 },
  { name: 'Player7', score: 700 },
  { name: 'Player8', score: 650 },
  { name: 'Player9', score: 600 },
  { name: 'Player10', score: 550 }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Player.deleteMany({});
    console.log('Cleared existing data');

    // Insert dummy data
    await Player.insertMany(dummyPlayers);
    console.log('Added dummy data');

    // Verify the data was inserted
    const count = await Player.countDocuments();
    console.log(`Total players in database: ${count}`);

    // Display the inserted data
    const players = await Player.find().sort({ score: -1 });
    console.log('Current leaderboard:');
    players.forEach((player, index) => {
      console.log(`${index + 1}. ${player.name} - ${player.score}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase(); 