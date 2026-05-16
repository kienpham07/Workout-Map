# Workout Map

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A workout tracking web application built with vanilla JavaScript, featuring interactive map-based workout logging, geolocation, running and cycling activity types, workout selection, deletion, and local browser storage.

## Features

- **User Geolocation**: Loads the map around the user's current location
- **Interactive Workout Map**: Add workouts by clicking directly on the map
- **Running Workouts**: Track distance, duration, cadence, and calculated pace
- **Cycling Workouts**: Track distance, duration, elevation gain, and calculated speed
- **Workout List**: Display all saved workouts in a sidebar with key statistics
- **Map Markers**: Show every workout location with a persistent Leaflet popup
- **Workout Navigation**: Click a workout in the list to move the map to its marker
- **Workout Deletion**: Select and delete an individual workout
- **Reset All Data**: Clear all saved workouts from local storage
- **Persistent Storage**: Save workouts in the browser using localStorage

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Browser APIs**: Geolocation API and localStorage
- **Styling**: Custom CSS with a responsive sidebar and map layout
- **Fonts**: Google Fonts (Manrope)
- **No build tools**: Runs directly in the browser

## Installation

### Option 1: Live Demo

Visit the live application at: `Add your deployed project URL here`

### Option 2: Clone and Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/kienpham07/Workout-Map.git
   cd Workout-Map
   ```

2. Open the project with a local server, then open `index.html` in your browser.

   You can use the Live Server extension in VS Code or any simple static server.

No additional installation or build steps required.

## Usage

1. Open the application in your web browser
2. Allow location access when the browser asks for permission
3. Click anywhere on the map to open the workout form
4. Choose one of the workout types:
   - **Running**: Enter distance, duration, and cadence
   - **Cycling**: Enter distance, duration, and elevation gain
5. Submit the form to save the workout and add a marker to the map
6. Explore features:
   - View saved workouts in the sidebar
   - Click a workout to move the map to its location
   - Select a workout and use the delete button to remove it
   - Use reset all to clear every saved workout

## Project Structure

```text
Workout-Map/
├── index.html                    # Main HTML structure
├── style.css                     # Application styling
├── script.js                     # Application logic and functionality
├── icon.png                      # Browser favicon
├── logo.png                      # Application logo
├── Mapty-flowchart.png           # Application flowchart reference
├── Mapty-architecture-part-1.png # Architecture reference
└── Mapty-architecture-final.png  # Final architecture reference
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Dev: Kien Pham (kienpham07)
