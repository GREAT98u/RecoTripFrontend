# RecoTrip - AI Tourist Recommendation App

RecoTrip is a React Native mobile application that recommends nearby tourist attractions based on your current GPS location using AI-powered backend recommendations.

## Features

### Core Features
- **Location-Based Recommendations**: Get personalized tourist attraction suggestions based on your current location
- **Smart Search**: Search and filter through recommended places
- **Nearby Hotels**: Find hotels within 5km using OpenStreetMap data
- **Reviews System**: Write, edit, and delete reviews with star ratings
- **Favorites**: Save your favorite places for quick access
- **Travel Information**: View distance, estimated travel time, and suggested transport mode

### Technical Features
- Bottom tab navigation with 5 sections
- AsyncStorage for offline data persistence
- Real-time location tracking
- Integration with Flask backend API
- Clean, modern UI with React Native Paper
- Comprehensive error handling and loading states

## Project Structure

```
recotrip/
├── app/
│   ├── (tabs)/           # Tab navigation screens
│   │   ├── index.tsx     # Home tab
│   │   ├── recommendations.tsx
│   │   ├── hotels.tsx
│   │   ├── reviews.tsx
│   │   └── favorites.tsx
│   └── _layout.tsx       # Root layout with navigation
├── screens/              # Screen components
│   ├── HomeScreen.tsx
│   ├── RecommendationsScreen.tsx
│   ├── HotelsScreen.tsx
│   ├── ReviewsScreen.tsx
│   └── FavoritesScreen.tsx
├── components/           # Reusable components
│   ├── PlaceCard.tsx
│   ├── ReviewCard.tsx
│   ├── HotelCard.tsx
│   ├── EmptyState.tsx
│   └── LoadingScreen.tsx
├── services/             # API and storage services
│   ├── api.ts
│   └── storage.ts
├── utils/                # Utility functions
│   └── distance.ts
└── constants/            # App constants
    ├── api.ts
    └── colors.ts
```

## Setup Instructions

### Prerequisites
- Node.js installed
- Expo CLI installed (`npm install -g expo-cli`)
- Flask backend running (see Backend Setup below)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Backend API:
   - Open `constants/api.ts`
   - Replace `192.168.1.5` with your machine's local IP address where Flask backend is running:
   ```typescript
   export const API_BASE_URL = 'http://YOUR_LOCAL_IP:5000';
   ```

### Backend Setup

Your Flask backend should be running at `http://YOUR_LOCAL_IP:5000` and have the following endpoint:

**POST /recommend**
```json
Request:
{
  "lat": 40.7128,
  "lon": -74.0060,
  "prefs": ""
}

Response:
[
  {
    "name": "Place Name",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "rating": 4.5,
    "final_score": 0.85
  }
]
```

## Running the App

### Web (Development)
```bash
npm run dev
```
Then press `w` to open in web browser.

### iOS Simulator
```bash
npm run dev
```
Then press `i` to open in iOS simulator (macOS only).

### Android Emulator
```bash
npm run dev
```
Then press `a` to open in Android emulator.

### Physical Device
1. Install Expo Go app on your device
2. Run `npm run dev`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## Usage Guide

### 1. Home Screen
- Tap "Find Nearby Attractions" to get location-based recommendations
- The app will request location permissions (required)
- Wait while the app fetches recommendations from the backend

### 2. Recommendations Screen
- View all recommended places in a scrollable list
- Use the search bar to filter places
- Each card shows:
  - Place name and rating
  - Distance from your location
  - Estimated travel time and suggested transport
- Tap heart icon to add/remove from favorites
- Tap "View on Map" to see location
- Tap "Add Review" to leave feedback

### 3. Hotels Screen
- Automatically loads nearby hotels within 5km
- Shows hotel name, address, and distance
- Tap "View on Map" to see location

### 4. Reviews Screen
- Add new reviews with place name, comment, and 1-5 star rating
- View all your submitted reviews
- Edit or delete existing reviews
- Reviews are saved locally using AsyncStorage

### 5. Favorites Screen
- View all places you've marked as favorites
- See distance from current location
- Remove places from favorites
- Access saved places even without internet

## Configuration

### Update Backend URL
Edit `constants/api.ts`:
```typescript
export const API_BASE_URL = 'http://YOUR_IP:5000';
```

### Customize Colors
Edit `constants/colors.ts` to change the app's color scheme.

### Adjust Travel Speed
Edit `utils/distance.ts`:
```typescript
const speedKmH = 40; // Change travel speed assumption
```

## Permissions

The app requires the following permissions:

**iOS**: Location When In Use
- Configured in `app.json` under `ios.infoPlist`

**Android**:
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION
- Configured in `app.json` under `android.permissions`

## Data Storage

All data is stored locally on the device using AsyncStorage:
- Favorites: `@recotrip_favorites`
- Reviews: `@recotrip_reviews`

Data persists between app sessions but is device-specific.

## Troubleshooting

### "Failed to fetch recommendations"
- Ensure Flask backend is running
- Check that API_BASE_URL in `constants/api.ts` matches your backend IP
- Verify your device/emulator can reach the backend (same network)

### "Location not available"
- Enable location services on your device
- Grant location permissions when prompted
- For web: ensure browser has location access

### "No hotels found"
- Some areas may not have hotels in OpenStreetMap
- Try a different location or increase search radius

### Maps not loading
- Map features are configured for native platforms
- Web version shows alerts instead of native maps

## Build for Production

### Web
```bash
npm run build:web
```

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tooling
- **Expo Router**: File-based routing
- **React Native Paper**: Material Design components
- **Lucide React Native**: Icon library
- **AsyncStorage**: Local data persistence
- **Axios**: HTTP client
- **Expo Location**: GPS and location services
- **React Native Maps**: Map integration (native only)

## API Integrations

1. **Flask Backend**: Custom AI recommendation service
2. **OpenStreetMap Overpass API**: Hotel location data

## Future Enhancements

- Full map view with markers for all locations
- Offline caching of recommendations
- Dark mode support
- Multi-language support
- Social sharing features
- Trip planning and itinerary builder
- Photo uploads for reviews
- Weather information integration

## License

Private project - All rights reserved

## Support

For issues or questions, contact the development team.
