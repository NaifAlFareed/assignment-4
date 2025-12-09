# Slides Outline (5–7 minutes)

1) Intro
- Name, role (CS student at KFUPM), goal of the site.
- Brief mention of tech stack: HTML/CSS/JS, no frameworks.

2) Live Demo
- Desktop walkthrough: hero, theme toggle, skip link, nav highlighting.
- Projects: filter/search/sort + collapsible details.
- API widgets: GitHub repos with filters, weather lookup, quotes with favorites.
- Mobile view: sticky nav, spacing scale, focus states.

3) Tech Overview
- CSS variables + clamp typography, `data-theme` toggle, spacing scale.
- JS modules: IntersectionObserver for active links, localStorage for personalization, API fetch flows.
- Performance choices: deferred JS, WebP images, lazy media.

4) AI Usage
- Where AI helped (planning/refining wording), what was edited manually.
- Ownership statement and link to `docs/ai-usage-report.md`.

5) Challenges
- Balancing polish with plain JS (no frameworks).
- Handling rate limits/offline states for GitHub and weather APIs.
- Cleaning A3 artifacts (encoding issues, dead styles).

6) Future Work
- Add offline caching and JSON-driven projects.
- Expand tests/Lighthouse automation.
- More project content and micro-interactions.
