#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🍽️  Restaurant Finder Setup');
console.log('============================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  const envTemplate = `# Google Places API Key
# Get your API key from: https://console.cloud.google.com/
# Enable Places API and Maps JavaScript API
GOOGLE_PLACES_API_KEY=your_api_key_here

# Server Configuration
PORT=3001
`;
  fs.writeFileSync(envPath, envTemplate);
  console.log('.env file created!');
  console.log('Please add your Google Places API key to the .env file\n');
} else {
  console.log('.env file already exists\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('Installing dependencies...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed!\n');
  } catch (error) {
    console.log('Failed to install dependencies. Please run: npm install\n');
  }
} else {
  console.log('Dependencies already installed\n');
}

console.log('Setup complete!');
console.log('Next steps:');
console.log('1. Add your Google Places API key to .env file');
console.log('2. Run: npm start');
console.log('3. Open: http://localhost:3001');
console.log('\nFor development: npm run dev');
console.log('For testing: npm test');
