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
  const { lat, lng, cuisine } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Missing required parameters: lat and lng' 
    });
  }
  
  // Get all restaurants first, then filter client-side for better results
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`;
  
  try {
    console.log(`Fetching restaurants for location: ${lat}, ${lng}${cuisine ? ` with cuisine filter: ${cuisine}` : ''}`);
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error_message) {
      console.error('Google API Error:', data.error_message);
      return res.status(500).json({ 
        error: 'Google Places API error: ' + data.error_message 
      });
    }
    
    let filteredResults = data.results || [];
    
    // Apply cuisine filtering if specified
    if (cuisine) {
      const beforeCount = filteredResults.length;
      filteredResults = filterByCuisine(filteredResults, cuisine);
      console.log(`Filtered from ${beforeCount} to ${filteredResults.length} restaurants matching ${cuisine} cuisine`);
    }
    
    console.log(`Found ${filteredResults.length} restaurants`);
    res.json({ ...data, results: filteredResults });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch restaurants from Google Places API' 
    });
  }
});

// Helper function to filter restaurants by cuisine
function filterByCuisine(restaurants, cuisine) {
  const cuisineKeywords = {
    'italian': ['pizza', 'pasta', 'italian', 'pizzeria', 'trattoria', 'ristorante'],
    'chinese': ['chinese', 'china', 'dim sum', 'cantonese', 'szechuan'],
    'mexican': ['mexican', 'taco', 'burrito', 'mexico', 'mexicana', 'taqueria'],
    'japanese': ['japanese', 'sushi', 'ramen', 'japan', 'sashimi', 'tempura', 'yakitori'],
    'indian': ['indian', 'curry', 'india', 'tandoor', 'masala', 'biryani'],
    'thai': ['thai', 'thailand', 'pad thai', 'tom yum', 'green curry'],
    'american': ['american', 'burger', 'grill', 'bbq', 'steakhouse', 'diner'],
    'french': ['french', 'bistro', 'france', 'brasserie', 'cafe'],
    'mediterranean': ['mediterranean', 'greek', 'lebanese', 'turkish', 'falafel'],
    'korean': ['korean', 'korea', 'bbq', 'kimchi', 'bulgogi'],
    'vietnamese': ['vietnamese', 'pho', 'vietnam', 'banh mi'],
    'greek': ['greek', 'gyro', 'greece', 'souvlaki', 'moussaka'],
    'spanish': ['spanish', 'tapas', 'spain', 'paella', 'sangria'],
    'german': ['german', 'bratwurst', 'germany', 'schnitzel', 'bier'],
    'brazilian': ['brazilian', 'churrascaria', 'brazil', 'rodizio'],
    'middle_eastern': ['middle eastern', 'arabic', 'persian', 'turkish', 'lebanese'],
    'seafood': ['seafood', 'fish', 'oyster', 'lobster', 'crab', 'shrimp'],
    'steakhouse': ['steak', 'steakhouse', 'prime', 'ribeye'],
    'pizza': ['pizza', 'pizzeria', 'pie'],
    'sushi': ['sushi', 'sashimi', 'roll', 'nigiri'],
    'vegetarian': ['vegetarian', 'veggie', 'plant-based'],
    'vegan': ['vegan', 'plant-based'],
    'fast_food': ['fast food', 'quick', 'drive', 'takeout'],
    'cafe': ['cafe', 'coffee', 'espresso', 'latte', 'cappuccino'],
    'bakery': ['bakery', 'bread', 'pastry', 'croissant', 'muffin'],
    'dessert': ['dessert', 'ice cream', 'sweet', 'gelato', 'cake', 'pie']
  };
  
  const keywords = cuisineKeywords[cuisine.toLowerCase()];
  if (!keywords) return restaurants;
  
  return restaurants.filter(restaurant => {
    const name = restaurant.name?.toLowerCase() || '';
    const types = restaurant.types || [];
    
    // Check restaurant name
    if (keywords.some(keyword => name.includes(keyword))) {
      return true;
    }
    
    // Check Google Places types
    if (types.some(type => keywords.some(keyword => type.toLowerCase().includes(keyword)))) {
      return true;
    }
    
    return false;
  });
}

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