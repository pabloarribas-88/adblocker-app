const STORAGE_KEY = "adblocker-prototype-state";

const defaultState = {
  masterEnabled: true,
  sitePaused: false,
  totalBlocked: 128453,
  siteBlocked: 0,
  filters: { ads: true, trackers: true, social: false, popups: false },
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState, ...saved } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors (e.g. private mode)
  }
}

let state = loadState();

const el = {
  app: document.querySelector(".app"),
  masterToggle: document.getElementById("masterToggle"),
  statusIcon: document.getElementById("statusIcon"),
  statusTitle: document.getElementById("statusTitle"),
  statusSubtitle: document.getElementById("statusSubtitle"),
  siteBlockedCount: document.getElementById("siteBlockedCount"),
  totalBlockedCount: document.getElementById("totalBlockedCount"),
  siteToggle: document.getElementById("siteToggle"),
  resetBtn: document.getElementById("resetBtn"),
  filterList: document.getElementById("filterList"),
};

let blockTimer = null;

function render() {
  el.masterToggle.checked = state.masterEnabled;
  el.app.classList.toggle("paused", !state.masterEnabled || state.sitePaused);

  if (!state.masterEnabled) {
    el.statusIcon.textContent = "⏸️";
    el.statusTitle.textContent = "Disabled";
    el.statusSubtitle.textContent = "AdBlocker is turned off";
  } else if (state.sitePaused) {
    el.statusIcon.textContent = "⏸️";
    el.statusTitle.textContent = "Paused here";
    el.statusSubtitle.textContent = "Not blocking on example.com";
  } else {
    el.statusIcon.textContent = "🛡️";
    el.statusTitle.textContent = "Protected";
    el.statusSubtitle.textContent = "Blocking ads on this site";
  }

  el.siteToggle.textContent = state.sitePaused
    ? "Resume on this site"
    : "Pause on this site";

  el.siteBlockedCount.textContent = state.siteBlocked.toLocaleString();
  el.totalBlockedCount.textContent = state.totalBlocked.toLocaleString();

  el.filterList.querySelectorAll("input[data-filter]").forEach((input) => {
    input.checked = Boolean(state.filters[input.dataset.filter]);
    input.disabled = !state.masterEnabled;
  });
}

function isActivelyBlocking() {
  return state.masterEnabled && !state.sitePaused;
}

function tickBlockedCounter() {
  if (!isActivelyBlocking()) return;
  const activeFilters = Object.values(state.filters).filter(Boolean).length;
  if (activeFilters === 0) return;
  const increment = Math.floor(Math.random() * activeFilters) + 1;
  state.siteBlocked += increment;
  state.totalBlocked += increment;
  saveState(state);
  render();
}

function startSimulation() {
  if (blockTimer) clearInterval(blockTimer);
  blockTimer = setInterval(tickBlockedCounter, 2500);
}

el.masterToggle.addEventListener("change", () => {
  state.masterEnabled = el.masterToggle.checked;
  saveState(state);
  render();
});

el.siteToggle.addEventListener("click", () => {
  state.sitePaused = !state.sitePaused;
  saveState(state);
  render();
});

el.resetBtn.addEventListener("click", () => {
  state.siteBlocked = 0;
  saveState(state);
  render();
});

el.filterList.addEventListener("change", (event) => {
  const input = event.target.closest("input[data-filter]");
  if (!input) return;
  state.filters[input.dataset.filter] = input.checked;
  saveState(state);
});

render();
startSimulation();
