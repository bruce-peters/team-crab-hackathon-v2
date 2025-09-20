# Canvas Dashboard Extension

A simple browser extension that injects a React-based dashboard into Canvas (instructure.com) pages.

## Features

- 🎯 **Welcome Widget**: Displays current time and a welcome message
- 📊 **Quick Stats**: Shows course and assignment statistics (demo data)
- ⚡ **Quick Actions**: Interactive buttons for common Canvas tasks (demo functionality)

## MVP Components

This extension demonstrates a minimal viable product with three main dashboard components:

1. **WelcomeWidget.jsx** - Time-based welcome message
2. **StatsWidget.jsx** - Course and assignment statistics
3. **QuickActions.jsx** - Interactive buttons for Canvas navigation

## Development

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the React app:
   ```bash
   npm run build
   ```

3. Test locally:
   ```bash
   npm run dev
   # Or open test.html in a browser after building
   ```

### Browser Extension Installation
1. Build the project (`npm run build`)
2. Open Chrome/Edge extensions page (`chrome://extensions/`)
3. Enable "Developer mode"
4. Click "Load unpacked" and select this directory
5. Visit any Canvas site (*.instructure.com) to see the dashboard

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Main dashboard container
│   │   ├── WelcomeWidget.jsx  # Welcome message component
│   │   ├── StatsWidget.jsx    # Statistics display
│   │   └── QuickActions.jsx   # Interactive buttons
│   ├── App.jsx               # Root React component
│   └── main.jsx              # React entry point
├── dist/                     # Built files (generated)
├── content.js               # Extension content script
├── manifest.json           # Extension manifest
└── test.html              # Local testing page
```

## Technology Stack

- **React** - UI components
- **Vite** - Build tool and bundler
- **Browser Extension APIs** - Content script injection
- **Vanilla CSS** - Inline styling for simplicity

## Demo

The extension adds a responsive dashboard with three widgets above the Canvas content:

![Dashboard Screenshot](https://github.com/user-attachments/assets/1d322ce5-b677-43bb-8d79-7177cd9583f9)

---

*This is an MVP implementation demonstrating React integration with browser extensions for Canvas LMS.*
