# Assignment 4 — Polished Portfolio

Live: https://naifalfareed.github.io/assignment-4/

Personal portfolio for SWE 363, refined from Assignment 3 into a production-quality static site with accessibility, responsive design, and API demos. Built with plain HTML, CSS, and JavaScript (no frameworks).

## Highlights
- Semantic layout with skip link, ordered headings, and sticky nav with active-link highlighting.
- Theme toggle (light/dark) using `data-theme`, persisted to localStorage; clear focus states and clamp-based typography.
- Projects grid with filter/search/sort, collapsible details, and empty-state handling.
- API demos: GitHub repos (filter/sort/error states), Open-Meteo weather lookup, Quotable motivation feed with local fallbacks.
- Contact form validation with inline hints and status banner (client-side only).
- Performance touches: deferred JS, WebP + JPEG fallbacks, lazy images, minimal dependencies.
- Lighthouse (desktop): Performance 98 / Accessibility 96 / Best Practices 100 / SEO 100 (see `assets/images/a4-lighthouse.png`).

## Run Locally
- Quick view: open `index.html` in a browser.
- For tooling: `npm install` (first time), then `npm start` and open http://localhost:4173
- Optional: `npm run lighthouse` after `npm start` to regenerate the desktop Lighthouse report (`assets/images/a4-lighthouse.html`).

## Project Structure
```
assignment-4/
├── index.html
├── css/styles.css
├── js/script.js
├── assets/images/
│   ├── profile.jpg/.webp
│   ├── project1-placeholder.jpg/.webp
│   ├── project2-placeholder.jpg/.webp
│   ├── favicon.svg
│   └── a4-lighthouse.png (added after running Lighthouse)
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides-outline.md
│   └── demo-video-script.md
└── README.md
```

## Screenshots
- `assets/images/a4-lighthouse.png` (desktop Lighthouse run)
- Responsive previews: `assets/images/a4-desktop.png`, `assets/images/a4-tablet.png`, `assets/images/a4-mobile.png`

## Docs
- Technical details: `docs/technical-documentation.md`
- AI usage log: `docs/ai-usage-report.md`
- Presentation prep: `presentation/slides-outline.md`, `presentation/demo-video-script.md`

## Deployment
- Hosted on GitHub Pages from `main` (root). If redeploying, ensure Pages is enabled in repo settings.

## Notes on AI
- Brief usage summary is in `docs/ai-usage-report.md`. All code/content was reviewed and finalized by me.
