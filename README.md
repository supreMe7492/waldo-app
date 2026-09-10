# Waldo App

A React + Vite front-end for a playful "Where's Waldo?" style hidden-character game. Players browse a gallery of scenes, find target characters in each image, and submit their score to a leaderboard.

## Features

- Scene gallery with multiple puzzle images
- Interactive image clicks to select a target location
- Character matching and validation logic
- Completion flow with winner name entry
- Leaderboard view for each scene
- Client-side routing for gallery, gameplay, and leaderboard screens

## Tech Stack

- React 19
- Vite
- React Router
- JavaScript
- Custom API integration for scenes, character data, and leaderboard scores

## Project Structure

```text
waldo-app/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Open the local Vite url shown in the terminal, usually:

```text
http://localhost:5173
```

> This frontend expects the Waldo API backend to be running separately, since the app fetches image data and leaderboard data from a local API.

## Available Scripts

```bash
npm run dev      # start the dev server
npm run build    # create a production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint checks
```

## Gameplay Flow

1. Browse the home gallery of scenes.
2. Select a scene to start the hidden-character challenge.
3. Click on the image to mark a location.
4. Choose the matching character from the revealed options.
5. Finish all targets to unlock the score submission form.
6. Enter your name and view the leaderboard for that scene.

## Notes

- Scene URLs are routed with parameters such as `/game/:imgId`.
- The app currently targets a backend served at `http://localhost:3000` for image assets and API calls.
- This project is designed as the frontend companion to the Waldo API service.

## License

This project is for educational/demo purposes.
