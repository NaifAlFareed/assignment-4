// =====================================
// THEME TOGGLE (light / dark)
// =====================================
const bodyEl = document.body;
const themeBtn = document.getElementById("themeToggle");

function updateThemeButton() {
  const isLight = bodyEl.classList.contains("light");
  if (themeBtn) {
    themeBtn.textContent = isLight ? "Switch to Dark" : "Switch to Light";
    themeBtn.setAttribute("aria-pressed", isLight ? "false" : "true");
  }
}

function applyTheme(theme, skipSave) {
  if (theme === "dark") {
    bodyEl.classList.remove("light");
  } else {
    bodyEl.classList.add("light");
  }
  if (!skipSave) {
    localStorage.setItem("theme", theme);
  }
  updateThemeButton();
}

(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initial, true);
})();

themeBtn?.addEventListener("click", () => {
  const isLight = bodyEl.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
});

updateThemeButton();

// =====================================
// SESSION TIMER
// =====================================
const sessionTimerEl = document.getElementById("sessionTimer");
if (sessionTimerEl) {
  const start = Date.now();
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins >= 60) {
      const hours = Math.floor(mins / 60);
      const remMins = mins % 60;
      return `${hours}h ${remMins}m ${secs.toString().padStart(2, "0")}s`;
    }
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  const updateTimer = () => {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    sessionTimerEl.textContent = `Time on page: ${formatTime(elapsed)}`;
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

// =====================================
// USER GREETING (persisted)
// =====================================
const greetingForm = document.getElementById("greetingForm");
const greetingInput = document.getElementById("greetingInput");
const greetingMessage = document.getElementById("greetingMessage");

function renderGreeting(name) {
  if (!greetingMessage) return;
  if (name) {
    greetingMessage.textContent = `Welcome back, ${name}!`;
    if (greetingInput) {
      greetingInput.value = name;
    }
  } else {
    greetingMessage.textContent = "Welcome! Tell me your name so I can greet you next time.";
  }
}

const storedName = localStorage.getItem("greetingName") || "";
renderGreeting(storedName);

greetingForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = greetingInput?.value.trim() || "";
  if (name.length < 2) {
    greetingMessage.textContent = "Please enter at least 2 characters.";
    return;
  }
  localStorage.setItem("greetingName", name);
  renderGreeting(name);
});

// =====================================
// COLLAPSIBLE PROJECT DETAILS
// =====================================
document.querySelectorAll(".project-card").forEach((card) => {
  const btn = card.querySelector(".toggle-details");
  const details = card.querySelector(".details");

  if (!btn || !details) return;

  btn.addEventListener("click", () => {
    const nowHidden = details.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", nowHidden ? "false" : "true");
    btn.textContent = nowHidden ? "Show Details" : "Hide Details";
  });
});

// =====================================
// PROJECT FILTERING + SEARCH + SORT
// =====================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const projectsGrid = document.getElementById("projectsGrid");
const noResultsMsg = document.getElementById("noResultsMsg");
const projectSearchInput = document.getElementById("projectSearch");
const projectSortSelect = document.getElementById("projectSort");
const complexityRank = { advanced: 3, intermediate: 2, beginner: 1 };

function getActiveCategory() {
  const active = document.querySelector(".filter-btn.active");
  return active ? active.getAttribute("data-filter") || "all" : "all";
}

function cardMatches(card, category, query) {
  const cardCat = card.getAttribute("data-category");
  const matchesCategory = category === "all" || category === cardCat;
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return matchesCategory;

  const text = card.textContent.toLowerCase();
  return matchesCategory && text.includes(normalizedQuery);
}

function sortCards(cards, sortBy) {
  const copy = [...cards];
  if (sortBy === "title") {
    copy.sort((a, b) => a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent));
  } else if (sortBy === "complexity") {
    copy.sort((a, b) => {
      const aLevel = complexityRank[a.dataset.level] || 0;
      const bLevel = complexityRank[b.dataset.level] || 0;
      return bLevel - aLevel;
    });
  } else {
    copy.sort((a, b) => (Number(b.dataset.year) || 0) - (Number(a.dataset.year) || 0));
  }
  return copy;
}

function refreshProjects() {
  const category = getActiveCategory();
  const query = projectSearchInput?.value || "";
  const sortBy = projectSortSelect?.value || "newest";
  const matching = [];

  projectCards.forEach((card) => {
    const visible = cardMatches(card, category, query);
    card.classList.toggle("hidden", !visible);
    if (visible) matching.push(card);
  });

  if (projectsGrid && matching.length > 1) {
    const sorted = sortCards(matching, sortBy);
    sorted.forEach((card) => projectsGrid.appendChild(card));
  }

  if (matching.length === 0) {
    noResultsMsg?.classList.remove("hidden");
  } else {
    noResultsMsg?.classList.add("hidden");
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    refreshProjects();
  });
});

projectSearchInput?.addEventListener("input", refreshProjects);
projectSortSelect?.addEventListener("change", refreshProjects);

refreshProjects();

// =====================================
// CONTACT FORM VALIDATION / FEEDBACK
// =====================================
const formEl = document.querySelector(".form");
const formStatusBox = document.querySelector(".form-status");
const MIN_MESSAGE_LENGTH = 10;

function setFieldState(fieldName, message, ok) {
  const hint = document.querySelector(`.input-hint[data-for="${fieldName}"]`);
  if (!hint) return;
  hint.textContent = message || "";
  if (ok) {
    hint.classList.add("ok");
  } else {
    hint.classList.remove("ok");
  }
}

function validateEmailFormat(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

function resetFormStatus() {
  if (!formStatusBox) return;
  formStatusBox.textContent = "";
  formStatusBox.classList.remove("error");
  formStatusBox.classList.remove("success");
}

if (formEl) {
  formEl.addEventListener("input", resetFormStatus);

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    resetFormStatus();

    const nameInput = formEl.querySelector("#name");
    const emailInput = formEl.querySelector("#email");
    const msgInput = formEl.querySelector("#message");

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const msgVal = msgInput.value.trim();

    let valid = true;

    if (!nameVal) {
      valid = false;
      setFieldState("name", "Please enter your name.", false);
    } else if (nameVal.length < 2) {
      valid = false;
      setFieldState("name", "Name must be at least 2 characters.", false);
    } else {
      setFieldState("name", "Looks good.", true);
    }

    if (!emailVal) {
      valid = false;
      setFieldState("email", "Please enter your email.", false);
    } else if (!validateEmailFormat(emailVal)) {
      valid = false;
      setFieldState("email", "Please enter a valid email address.", false);
    } else {
      setFieldState("email", "Looks good.", true);
    }

    if (!msgVal) {
      valid = false;
      setFieldState("message", "Please enter a message.", false);
    } else if (msgVal.length < MIN_MESSAGE_LENGTH) {
      valid = false;
      setFieldState("message", `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`, false);
    } else {
      setFieldState("message", "Thanks for the details.", true);
    }

    if (!valid) {
      if (formStatusBox) {
        formStatusBox.textContent = "Please fix the errors and try again.";
        formStatusBox.classList.remove("success");
        formStatusBox.classList.add("error");
      }
      return;
    }

    if (formStatusBox) {
      formStatusBox.textContent = "Thanks! Your message has been recorded locally.";
      formStatusBox.classList.remove("error");
      formStatusBox.classList.add("success");
    }

    nameInput.value = "";
    emailInput.value = "";
    msgInput.value = "";

    setFieldState("name", "", false);
    setFieldState("email", "", false);
    setFieldState("message", "", false);
  });
}

// =====================================
// FOOTER YEAR
// =====================================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// =====================================
// SMOOTH SCROLL FALLBACK
// =====================================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// =====================================
// GITHUB API: FETCH + FILTER + SORT
// =====================================
const githubUserForm = document.getElementById("githubUserForm");
const githubUsernameInput = document.getElementById("githubUsername");
const repoListEl = document.getElementById("repoList");
const repoStatusEl = document.getElementById("repoStatus");
const repoErrorEl = document.getElementById("repoError");
const repoEmptyEl = document.getElementById("repoEmpty");
const languageFilterSelect = document.getElementById("languageFilter");
const sortSelect = document.getElementById("sortSelect");

let reposCache = [];
let currentUsername = "";

function setRepoStatus(message) {
  if (repoStatusEl) {
    repoStatusEl.textContent = message;
  }
}

function showRepoError(message) {
  if (!repoErrorEl) return;
  repoErrorEl.textContent = message;
  repoErrorEl.classList.remove("hidden");
}

function clearRepoError() {
  if (!repoErrorEl) return;
  repoErrorEl.textContent = "";
  repoErrorEl.classList.add("hidden");
}

function updateLanguageOptions(repos) {
  if (!languageFilterSelect) return;

  const languages = new Set();
  let hasOther = false;
  repos.forEach((repo) => {
    if (repo.language) {
      languages.add(repo.language);
    } else {
      hasOther = true;
    }
  });

  const sorted = Array.from(languages).sort((a, b) => a.localeCompare(b));
  languageFilterSelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All languages";
  languageFilterSelect.appendChild(allOption);

  sorted.forEach((lang) => {
    const opt = document.createElement("option");
    opt.value = lang;
    opt.textContent = lang;
    languageFilterSelect.appendChild(opt);
  });

  if (hasOther) {
    const otherOpt = document.createElement("option");
    otherOpt.value = "Other";
    otherOpt.textContent = "Other";
    languageFilterSelect.appendChild(otherOpt);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.valueOf())) return "Unknown";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function buildRepoCard(repo) {
  const li = document.createElement("li");
  li.className = "repo-card";

  const titleRow = document.createElement("div");
  titleRow.className = "repo-title";

  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = repo.name;
  titleRow.appendChild(link);

  const visibility = document.createElement("span");
  visibility.className = "repo-chip";
  visibility.textContent = repo.private ? "Private" : "Public";
  titleRow.appendChild(visibility);

  li.appendChild(titleRow);

  const desc = document.createElement("p");
  desc.className = "repo-desc";
  desc.textContent = repo.description || "No description provided.";
  li.appendChild(desc);

  const meta = document.createElement("div");
  meta.className = "repo-meta";

  const lang = document.createElement("span");
  lang.className = "repo-chip";
  lang.textContent = repo.language || "Other";
  meta.appendChild(lang);

  const stars = document.createElement("span");
  stars.className = "repo-chip";
  stars.textContent = `Stars: ${repo.stargazers_count}`;
  meta.appendChild(stars);

  const updated = document.createElement("span");
  updated.className = "repo-chip";
  updated.textContent = `Updated ${formatDate(repo.updated_at)}`;
  meta.appendChild(updated);

  li.appendChild(meta);
  return li;
}

function sortRepos(repos, sortBy) {
  const copy = [...repos];
  if (sortBy === "stars") {
    copy.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === "name") {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    copy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
  return copy;
}

function renderRepos() {
  if (!repoListEl) return;
  const chosenLang = languageFilterSelect?.value || "all";
  const sortBy = sortSelect?.value || "updated";

  const filtered = reposCache.filter((repo) => {
    const lang = repo.language || "Other";
    return chosenLang === "all" || lang === chosenLang;
  });

  const sorted = sortRepos(filtered, sortBy);
  repoListEl.innerHTML = "";

  if (sorted.length === 0) {
    repoEmptyEl?.classList.remove("hidden");
    if (currentUsername) {
      setRepoStatus(`No repos match the filters for ${currentUsername}.`);
    }
    return;
  }

  repoEmptyEl?.classList.add("hidden");
  if (currentUsername) {
    setRepoStatus(`Showing ${sorted.length} repos for ${currentUsername}.`);
  }
  const frag = document.createDocumentFragment();
  sorted.forEach((repo) => {
    frag.appendChild(buildRepoCard(repo));
  });
  repoListEl.appendChild(frag);
}

async function fetchRepos(username) {
  if (!username) {
    showRepoError("Please enter a GitHub username.");
    return;
  }

  if (!repoListEl) return;

  currentUsername = username;
  localStorage.setItem("githubUser", username);
  clearRepoError();
  repoEmptyEl?.classList.add("hidden");
  repoListEl.innerHTML = "";
  setRepoStatus("Loading repositories...");

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=20`,
    );

    if (!response.ok) {
      let message = "Unable to load repositories right now.";
      if (response.status === 404) {
        message = "GitHub user not found.";
      } else if (response.status === 403) {
        message = "Rate limit reached. Please try again later.";
      }
      throw new Error(message);
    }

    const data = await response.json();
    reposCache = Array.isArray(data) ? data.filter((repo) => !repo.archived) : [];
    updateLanguageOptions(reposCache);
    renderRepos();

    if (!reposCache.length) {
      repoEmptyEl?.classList.remove("hidden");
    }
    setRepoStatus(`Showing ${reposCache.length} repos for ${username}.`);
  } catch (error) {
    repoListEl.innerHTML = "";
    repoEmptyEl?.classList.add("hidden");
    showRepoError(error.message || "Unable to load repositories.");
    setRepoStatus("Could not load repositories.");
  }
}

githubUserForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = githubUsernameInput?.value.trim();
  fetchRepos(username);
});

languageFilterSelect?.addEventListener("change", renderRepos);
sortSelect?.addEventListener("change", renderRepos);

const initialUsername =
  localStorage.getItem("githubUser") ||
  (githubUsernameInput ? githubUsernameInput.value.trim() : "") ||
  "NaifAlFareed";

if (githubUsernameInput) {
  githubUsernameInput.value = initialUsername;
}
fetchRepos(initialUsername);

// =====================================
// WEATHER API (Open-Meteo)
// =====================================
const weatherForm = document.getElementById("weatherForm");
const weatherCityInput = document.getElementById("weatherCity");
const weatherStatusEl = document.getElementById("weatherStatus");
const weatherErrorEl = document.getElementById("weatherError");
const weatherCard = document.getElementById("weatherCard");
const weatherTempEl = document.getElementById("weatherTemp");
const weatherUnitEl = document.getElementById("weatherUnit");
const weatherLocationEl = document.getElementById("weatherLocation");
const weatherDetailsEl = document.getElementById("weatherDetails");
const DEFAULT_CITY = "Dhahran";

const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Snow",
  80: "Rain showers",
  95: "Thunderstorm",
};

function describeWeather(code) {
  return WEATHER_CODES[code] || "Updated conditions";
}

function setWeatherStatus(message) {
  if (weatherStatusEl) {
    weatherStatusEl.textContent = message;
  }
}

function showWeatherError(message) {
  if (!weatherErrorEl) return;
  weatherErrorEl.textContent = message;
  weatherErrorEl.classList.remove("hidden");
}

function clearWeatherError() {
  if (!weatherErrorEl) return;
  weatherErrorEl.textContent = "";
  weatherErrorEl.classList.add("hidden");
}

function renderWeather(data, locationLabel) {
  if (!weatherCard || !weatherTempEl || !weatherUnitEl || !weatherLocationEl || !weatherDetailsEl) return;
  weatherTempEl.textContent = Math.round(data.temperature_2m);
  weatherUnitEl.textContent = "°C";
  weatherLocationEl.textContent = locationLabel;
  weatherDetailsEl.textContent = `${describeWeather(data.weather_code)} • Humidity ${data.relative_humidity_2m}% • Wind ${Math.round(data.wind_speed_10m)} km/h`;
  weatherCard.classList.remove("hidden");
}

async function fetchWeather(city) {
  const trimmed = (city || "").trim();
  if (!trimmed) {
    showWeatherError("Please enter a city to load the forecast.");
    return;
  }

  clearWeatherError();
  setWeatherStatus("Looking up coordinates...");
  weatherCard?.classList.add("hidden");

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=en&format=json`,
    );

    if (!geoResponse.ok) {
      throw new Error("Unable to look up that city right now.");
    }

    const geoData = await geoResponse.json();
    const first = geoData?.results?.[0];
    if (!first) {
      throw new Error("City not found. Try another spelling.");
    }

    const { latitude, longitude, name, country } = first;
    setWeatherStatus("Fetching forecast...");

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`,
    );

    if (!weatherResponse.ok) {
      throw new Error("Weather service unavailable right now.");
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData?.current;
    if (!current) {
      throw new Error("No forecast returned for that location.");
    }

    renderWeather(current, `${name}, ${country}`);
    setWeatherStatus(`Updated just now for ${name}.`);
    localStorage.setItem("weatherCity", trimmed);
  } catch (error) {
    showWeatherError(error.message || "Could not load weather.");
    setWeatherStatus("Could not load weather.");
  }
}

weatherForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather(weatherCityInput?.value);
});

const initialCity = localStorage.getItem("weatherCity") || DEFAULT_CITY;
if (weatherCityInput) {
  weatherCityInput.value = initialCity;
}
fetchWeather(initialCity);

// =====================================
// QUOTE API (Quotable)
// =====================================
const quoteTextEl = document.getElementById("quoteText");
const quoteAuthorEl = document.getElementById("quoteAuthor");
const quoteRefreshBtn = document.getElementById("quoteRefresh");
const quoteSaveBtn = document.getElementById("quoteSave");
const quoteStatusEl = document.getElementById("quoteStatus");
const favoriteQuoteEl = document.getElementById("favoriteQuote");

// Local fallback quotes for offline or blocked requests
const FALLBACK_QUOTES = [
  { content: "Small daily progress beats occasional sprints.", author: "Naif" },
  { content: "Ship it, learn, and improve on the next iteration.", author: "Naif" },
  { content: "Constraints are features in disguise.", author: "Naif" },
  { content: "Clarity over cleverness. Make it readable first.", author: "Naif" },
];

function showQuoteStatus(message) {
  if (quoteStatusEl) {
    quoteStatusEl.textContent = message;
  }
}

function setQuote(content, author) {
  if (!quoteTextEl || !quoteAuthorEl) return;
  quoteTextEl.textContent = content || "Stay motivated and keep building.";
  quoteAuthorEl.textContent = author ? `- ${author}` : "";
}

function renderFavoriteQuote() {
  if (!favoriteQuoteEl) return;
  const saved = localStorage.getItem("favoriteQuote");
  if (saved) {
    favoriteQuoteEl.textContent = `Favorite: ${saved}`;
    favoriteQuoteEl.classList.remove("hidden");
  } else {
    favoriteQuoteEl.classList.add("hidden");
  }
}

async function loadQuote() {
  if (!quoteTextEl || !quoteAuthorEl) return;
  showQuoteStatus("Loading a new quote...");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("https://api.quotable.io/random?tags=inspirational|success", {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error("Quote service unavailable.");
    }
    const data = await response.json();
    setQuote(data.content, data.author);
    showQuoteStatus("Fresh quote loaded.");
  } catch (error) {
    const fallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    setQuote(fallback.content, fallback.author);
    showQuoteStatus("Network blocked or offline. Using a local quote.");
  }
  clearTimeout(timeout);
}

quoteRefreshBtn?.addEventListener("click", loadQuote);

quoteSaveBtn?.addEventListener("click", () => {
  if (!quoteTextEl) return;
  const favorite = `${quoteTextEl.textContent} ${quoteAuthorEl?.textContent || ""}`.trim();
  if (!favorite) {
    showQuoteStatus("Load a quote before saving.");
    return;
  }
  localStorage.setItem("favoriteQuote", favorite);
  renderFavoriteQuote();
  showQuoteStatus("Saved as your favorite.");
});

renderFavoriteQuote();
loadQuote();
