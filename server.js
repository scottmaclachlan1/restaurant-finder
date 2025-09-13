// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory


const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('GOOGLE_PLACES_API_KEY environment variable is not set');
  process.exit(1);
}

app.get('/api/restaurants', async (req, res) => {
  const { lat, lng } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Missing required parameters: lat and lng' 
    });
  }
  
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`;
  
  try {
    console.log(`Fetching restaurants for location: ${lat}, ${lng}`);
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error_message) {
      console.error('Google API Error:', data.error_message);
      return res.status(500).json({ 
        error: 'Google Places API error: ' + data.error_message 
      });
    }
    
    console.log(`Found ${data.results?.length || 0} restaurants`);
    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch restaurants from Google Places API' 
    });
  }
});

// API endpoint for photos
app.get('/api/photo', async (req, res) => {
  const { photoreference } = req.query;
  
  if (!photoreference) {
    return res.status(400).json({ error: 'Missing photoreference parameter' });
  }
  
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${GOOGLE_API_KEY}`;
  
  try {
    const response = await fetch(photoUrl);
    
    if (!response.ok) {
      throw new Error(`Photo fetch failed: ${response.status}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    res.set('Content-Type', contentType);
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Photo fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Mobile access: http://192.168.1.184:${PORT}`);
  console.log(`Open your browser and navigate to the URL above`);
  console.log(`API key loaded: ${GOOGLE_API_KEY ? 'Success' : 'Error'}`);
});