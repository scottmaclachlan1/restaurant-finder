# 🍽️ Restaurant Finder

A modern, interactive web application that helps users discover and save restaurants near their location using the Google Places API. Built with vanilla JavaScript, featuring a Tinder-like swipe interface for restaurant discovery.

## Features

- Location-Based Search**: Automatically finds restaurants within 1.5km of your current location
- ** Swipe Interface**: Tinder-like swipe gestures to browse through restaurant options
- ** Save Favorites**: Swipe right to save restaurants to your personal collection
- ** Restaurant Photos**: Displays high-quality photos from Google Places API
- ** Ratings Display**: Shows restaurant ratings and reviews
- ** Responsive Design**: Works seamlessly on desktop and mobile devices
- ** Cached Location**: Remembers your location for 10 minutes to reduce API calls
- ** Offline Support**: View saved restaurants even without internet connection
- ** Manual Location Input**: Fallback option for testing when location permissions are blocked
- ** Modern UI**: Toast notifications, smooth animations, and visual swipe feedback

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **APIs**: Google Places API, Google Maps Photo API
- **Libraries**: Hammer.js (touch gestures)
- **Styling**: Custom CSS with Google Fonts
- **Storage**: LocalStorage for caching and saved restaurants
- **Environment**: dotenv for secure API key management
- **Development**: nodemon for auto-restart

## Getting Started

### Prerequisites

- Node.js and npm installed
- Google Places API key
- Modern web browser with geolocation support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/restaurant-finder.git
   cd restaurant-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Places API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Places API and Maps JavaScript API
   - Create an API key

4. **Create environment file**
   ```bash
   # Create a .env file in the root directory
   echo "GOOGLE_PLACES_API_KEY=your_actual_api_key_here" > .env
   ```
   Replace `your_actual_api_key_here` with your real Google Places API key.

5. **Run the application**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3001`
   - Allow location access when prompted
   - Start discovering restaurants!

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## How to Use

1. **Find Restaurants**: Click "Find Restaurant Near Me" to discover nearby restaurants
2. **Browse**: Swipe left to skip, swipe right to save
3. **Save Favorites**: Swipe right on restaurants you like to add them to your saved list
4. **View Saved**: Click "Show Saved Restaurant" to see your collection
5. **Location**: The app will remember your location for 10 minutes to improve performance

### Manual Location Input (Development Feature)

The "Enter Location Manually" button is a **development/testing feature** that allows you to test the app when location permissions are blocked (common on mobile devices with HTTP sites). 

**Popular test coordinates:**
- **New York**: 40.7128, -74.0060
- **London**: 51.5074, -0.1278
- **Tokyo**: 35.6762, 139.6503
- **Paris**: 48.8566, 2.3522

## Project Structure

```
restaurant-finder/
├── index.html          # Main HTML file
├── main.js            # Frontend JavaScript application logic
├── server.js          # Backend Express server
├── styles.css         # CSS styling
├── package.json       # Node.js dependencies and scripts
├── .env               # Environment variables (API keys)
├── .gitignore         # Git ignore file
└── README.md          # Project documentation
```

## Key Features Implementation

### Location Caching
- Implements intelligent location caching to reduce API calls
- Stores location data in localStorage with timestamp validation
- Automatically refreshes location after 10 minutes

### Swipe Gestures
- Uses Hammer.js for touch gesture recognition
- Smooth animations for swipe interactions
- Visual feedback with rotation and opacity effects

### API Integration
- Integrates with Google Places API for restaurant data
- Handles CORS issues with proxy server
- Implements error handling for API failures

### Responsive Design
- Mobile-first approach with touch-friendly interface
- Adaptive card layouts for different screen sizes
- Optimized for both desktop and mobile experiences

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Scott** - Personal Project for CV Portfolio