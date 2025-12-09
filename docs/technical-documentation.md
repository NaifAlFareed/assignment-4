# Technical Documentation — Assignment 4

## Overview
Polished personal portfolio for SWE 363 built with vanilla HTML, CSS, and JavaScript. The site stays static (no backend) but includes API demos (GitHub, Open-Meteo, Quotable), personalization (theme, saved greeting), and responsive layouts suitable for GitHub Pages.

## Architecture
- **HTML**: Single page `index.html` with semantic landmarks (`header`, `main`, `section`, `footer`), skip link, and structured headings (H1 → H2 → H3). Project cards, API widgets, and contact form live in dedicated sections.
- **CSS (`css/styles.css`)**: Mobile-first, CSS variables for color/spacing/typography, clamp-based font sizes, focus-visible styles, and card/grid layouts. Theme switching is driven by `:root[data-theme]` to avoid toggling class names across the tree.
- **JS (`js/script.js`)**: Small, self-contained modules for theme persistence, smooth scrolling, active nav highlighting, stateful widgets (greeting, timer, filters), form validation, and API integrations. State lives in `localStorage` where persistence is helpful (theme, greeting, GitHub username, weather city, favorite quote).

## Component Notes
- **Navigation**: Sticky header, skip link, and IntersectionObserver-based active link highlighting. Anchors include smooth scrolling with focus management for keyboard/screen reader users.
- **About**: Hero copy, CTA buttons, stored greeting, and session timer. Profile image uses `<picture>` with WebP + JPEG fallback.
- **Projects**: Filter, search, and sort controls reorder cards in the DOM; buttons toggle collapsible details with `aria-expanded` updates.
- **GitHub API**: Fetches recent repos, filters by language, sorts (updated/stars/name), and shows friendly errors for 404/403. Caches the last username.
- **Live insights**: Open-Meteo geocoding + forecast for weather; Quotable for motivation with timeout + local fallbacks; saved favorite quote.
- **Contact form**: Client-side validation (name/email/message length) with inline hints and status banner; no backend submission.
- **Theme toggle**: `data-theme` on `<html>`, persisted to `localStorage`, updates meta `theme-color` for browser UI. Colors, borders, and backgrounds read from CSS variables so toggling avoids layout shifts.

## Accessibility Checklist (implemented)
- Skip link to `#main`; semantic landmarks and ordered headings.
- Keyboard-focus outlines via `:focus-visible`; clear button/link targets and scroll margins so sticky header doesn’t occlude anchors.
- Labels for all form controls; `aria-live` regions for status/error messages on API widgets and the contact form.
- Sufficient color contrast in both themes; nav active state reflected with `aria-current`.
- Smooth scroll + focus management on internal anchors to keep context for keyboard and screen reader users.

## Performance Choices
- Images compressed to WebP with JPEG fallbacks; `<picture>` sources and lazy loading on non-hero media.
- CSS preloaded, single deferred script, no external fonts/libraries. Hero image set to `fetchpriority="high"` for a faster LCP.
- Reuse of DOM nodes and document fragments (GitHub list) to minimize reflows; IntersectionObserver for nav instead of scroll polling.
- Live API requests deferred until the insights section is visible; localStorage persists user choices to avoid refetching.
- Latest Lighthouse (desktop) scores: Performance 98 / Accessibility 96 / Best Practices 100 / SEO 100 (`assets/images/a4-lighthouse.png`).

## Limitations & Future Improvements
- No service worker/offline cache; API widgets require connectivity.
- GitHub API rate limits can still hit if refreshed aggressively; could add caching with ETags.
- Projects are inline HTML; a JSON-driven data source would simplify expansion.
- Automated tests are not included; Lighthouse is run manually (see assets/images/a4-lighthouse.png).

## Running Locally
- Open `index.html` directly in a browser for a quick check.
- Or run `npm start` (uses `serve` on port 4173) then open http://localhost:4173 to mirror the Pages environment.
