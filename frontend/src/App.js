import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// Configure axios defaults with proper CORS credentials
// For production, this will be the backend Render URL
const API_URL = process.env.REACT_APP_API_URL || '';
console.log('Using API URL:', API_URL);
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
// Don't use credentials for cross-origin requests to Render
axios.defaults.withCredentials = false;

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiEndpoint = '/api/leaderboard';
      console.log('Fetching from:', API_URL + apiEndpoint);
      const response = await axios.get(apiEndpoint, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Failed to load leaderboard data. Please try again later.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/leaderboard', {
        name,
        score: parseInt(score)
      }, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setName('');
      setScore('');
      fetchLeaderboard();
    } catch (error) {
      console.error('Error submitting score:', error);
      setError('Failed to submit score. Please try again.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.delete(`/api/leaderboard/${id}`, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      fetchLeaderboard();
    } catch (error) {
      console.error('Error deleting player:', error);
      setError('Failed to delete player. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Sacred Drop Leaderboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add New Score
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Player Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
            <Button variant="contained" type="submit" disabled={loading}>
              Submit
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>

        <Typography variant="h5" gutterBottom>
          Leaderboard
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Player Name</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player, index) => (
                  <TableRow key={player._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell align="right">{player.score}</TableCell>
                    <TableCell>{new Date(player.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton 
                        aria-label="delete" 
                        color="error"
                        onClick={() => handleDelete(player._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}

export default App; 