# Technical Documentation – Assignment 3

## 1) Overview
Portfolio site enhanced for Assignment 3 with multiple APIs, stronger state management, and more complex UI logic. The stack is plain HTML, CSS, and JavaScript (no frameworks) to keep the footprint small and transparent.

---

## 2) File Map
```text
index.html                 # Markup for all sections and widgets
css/styles.css             # Layout, theming, components, accessibility helpers
js/script.js               # Theme, filters, validation, API integrations, state
docs/technical-documentation.md
docs/ai-usage-report.md
assets/images/             # Profile + project placeholders
```

---

## 3) Core Features & Logic
- **Theme toggle + persistence:** `body.light` vs dark, stored in `localStorage` so the preferred theme loads on refresh. The toggle updates aria-pressed and button text.
- **Session timer:** Counts time on page (hh:mm:ss) to demonstrate basic state + timers.
- **Greeting memory:** Saves visitor name in `localStorage` and rehydrates the UI on load.
- **Project controls:** Category filter buttons, free-text search, and sort (newest/title/complexity). Cards are re-ordered in the DOM and the empty state toggles when nothing matches.
- **Collapsible project details:** Each card has a show/hide button with `aria-expanded` updates.
- **Contact validation:** Client-side checks for name length, email format, and minimum message length with inline hints and a status banner (no backend submission).
- **GitHub API:** Fetches latest repos for a username, caches them in memory, filters by language, sorts by updated/stars/name, and surfaces friendly errors (404, 403/rate limit).
- **Weather API:** Uses Open-Meteo geocoding to resolve a city, then fetches current temperature/humidity/wind. Remembers the last city searched. Handles missing city or service errors gracefully.
- **Quotes API:** Pulls inspirational quotes from Quotable with a 5s timeout; falls back to local quotes if blocked/offline. Supports refresh and saving a favorite quote to `localStorage`.

---

## 4) State Management
- `theme`, `greetingName`, `githubUser`, `weatherCity`, and `favoriteQuote` persist in `localStorage`.
- GitHub repo responses are cached in memory (`reposCache`) for client-side filtering and sorting without refetching.
- UI controls (filters, selects) read from saved values on load to keep the experience consistent.

---

## 5) Performance & UX Notes
- All images use `loading="lazy"` and are modest in size.
- Scripts are deferred; DOM updates batch via document fragments where needed (GitHub list).
- No third-party libraries to keep payload small.
- Smooth scrolling and keyboard-friendly skip links improve navigation; aria-live regions announce status changes for forms and API widgets.

---

## 6) API Endpoints
- **GitHub:** `https://api.github.com/users/{username}/repos?sort=updated&per_page=20`
- **Open-Meteo Geocoding:** `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1`
- **Open-Meteo Forecast:** `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...`
- **Quotable:** `https://api.quotable.io/random?tags=inspirational|success`

All are public/no-key APIs; each request has error handling and user feedback.

---

## 7) How to Run
Open `index.html` in any modern browser. No build tools or server are required. If deploying to GitHub Pages, push to the repo and enable Pages; the static files will work as-is.

---

## 8) Manual Test Checklist
- Theme toggle switches and persists across reload.
- Greeting form saves and restores the entered name.
- Project filters/search/sort hide/show cards correctly; “No projects found” shows when nothing matches.
- Contact form blocks empty/invalid fields and shows success after valid input.
- GitHub section loads repos for a valid user; shows clear errors for 404/403; language filter and sort work.
- Weather widget accepts city input, shows temperature/details, and surfaces errors for unknown cities.
- Quote widget loads a new quote and saves a favorite to `localStorage`.

---

## 9) Future Enhancements
- Add offline caching for API calls.
- Provide a compact “print/export” view of the resume section.
- Expand project data to load dynamically from JSON or a headless CMS.
