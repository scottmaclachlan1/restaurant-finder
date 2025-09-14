# Restaurant Finder

A web app that finds restaurants near you with a Tinder-like swipe interface. Built with vanilla JavaScript and Node.js.

## Features

- Find restaurants within 1.5km of your location
- Swipe interface to browse restaurants (left to skip, right to save)
- Filter by cuisine type (Italian, Chinese, Mexican, etc.)
- Save favorites to view later
- Works on mobile and desktop

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **APIs**: Google Places API
- **Testing**: Jest
- **Libraries**: Hammer.js (touch gestures)

## Quick Start

```bash
git clone <your-repo>
cd restaurant-finder
npm run setup
```

Add your Google Places API key to the `.env` file, then:

```bash
npm start
```

Open `http://localhost:3001` in your browser.

## Development

```bash
npm run dev    # Auto-restart on changes
npm test       # Run tests
npm run setup  # Initial setup
```

## Project Structure

```
restaurant-finder/
├── index.html          # Main page
├── main.js            # Frontend logic
├── server.js          # Backend API
├── styles.css         # Styling
├── utils/             # Utility functions
├── __tests__/         # Test files
└── setup.js           # Setup script
```

## Key Implementation Details

- **Cuisine Filtering**: Server-side filtering with comprehensive keyword matching
- **Location Caching**: 10-minute cache to reduce API calls
- **Security**: Basic security headers and error handling
- **Testing**: Unit tests for core functionality
- **Performance**: Static file caching and ETag support
