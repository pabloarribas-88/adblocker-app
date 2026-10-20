# AdBlocker App

Simple HTML/CSS/JS prototype of an ad-blocker browser extension UI (popup panel).
No build step — plain static files, deployed as-is to Vercel.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server.

## Structure

- `index.html` — popup markup
- `styles.css` — dark-theme styling
- `script.js` — toggle state, filter list, simulated blocked-count ticker (persisted to `localStorage`)
