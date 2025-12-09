# Assignment 3 – Advanced Functionality

Personal portfolio for SWE 363 Assignment 3 with multiple API integrations, stronger state management, and richer UI logic. Built with vanilla HTML, CSS, and JavaScript.

---

## What’s implemented
- **API integrations:** GitHub repos (filter/sort + errors), Open-Meteo weather lookup by city, and live motivation quotes from Quotable (with offline fallback quotes).
- **Complex logic:** Project grid filter + search + sort, collapsible project details, inline contact form validation, session timer, smooth scrolling.
- **State management:** Theme preference, saved greeting name, remembered GitHub username, stored weather city, and saved favorite quote (all via `localStorage`).
- **Performance choices:** Lazy-loaded images, no external libraries, cached data in memory (GitHub repos) and re-used API results (stored selections), minimal DOM writes.
- **Accessibility:** Skip link, ARIA labels/live regions, keyboard-focus friendly controls, descriptive alt text.

---

## Run locally
1. Clone or download the repository.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
3. If you deploy to GitHub Pages/Netlify, no build steps are required.

---

## Project structure
```text
assignment-3/
├── README.md
├── assignment-3.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── profile.jpg
│       ├── project1-placeholder.jpg
│       └── project2-placeholder.jpg
└── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md
```

---

## Feature notes
- **GitHub API:** Enter a username, then filter by language and sort by update date/stars/name. Errors and rate limits are handled with friendly messages.
- **Weather snapshot:** Uses Open-Meteo’s free geocoding + forecast endpoints. Remembers the last city you checked.
- **Motivation feed:** Pulls inspirational quotes from Quotable. You can refresh and save a favorite quote locally.
- **Projects area:** Filters by category, searches text, and sorts by newest/title/complexity. Cards have collapsible details.
- **Contact form:** Validates name, email, and message length with inline hints and a status banner (client-side only).
- **Theme + personalization:** Light/dark toggle, greeting persistence, GitHub username caching, favorite quote, and stored weather city.

---

## Documentation
- Full AI log: `docs/ai-usage-report.md`
- Technical walkthrough: `docs/technical-documentation.md`

---

## Performance tips checked
- Images use `loading="lazy"` and are sized for web.
- Script is deferred, minimal DOM mutations, and reuses cached data where possible.
- No third-party libraries to keep bundle size tiny.

---

## Academic integrity
All code was reviewed and edited by me. AI assistance was used for brainstorming and refactoring; details are documented in `docs/ai-usage-report.md`.
