(function () {
  const STORAGE_KEY = "adnil-customize";
  const COLLAPSE_KEY = "adnil-customize-collapsed";

  const FONTS = [
    { id: "inter", label: "Inter", stack: "'Inter', sans-serif" },
    { id: "space-grotesk", label: "Space Grotesk", stack: "'Space Grotesk', sans-serif" },
    { id: "sora", label: "Sora", stack: "'Sora', sans-serif" },
    { id: "plus-jakarta", label: "Plus Jakarta Sans", stack: "'Plus Jakarta Sans', sans-serif" },
    { id: "manrope", label: "Manrope", stack: "'Manrope', sans-serif" },
  ];

  // The current Figma-matched look is always the default / reset target.
  const PRESETS = [
    { id: "default", label: "Default", font: "inter", primary: "#D92D20", button: "#D92D20", background: "#FFFFFF", theme: "default" },
    { id: "glass", label: "Glassmorphism", font: "sora", primary: "#6C5CE7", button: "#6C5CE7", background: "#EDEBFF", theme: "glass" },
    { id: "neu", label: "Neumorphism", font: "manrope", primary: "#5B6EF5", button: "#5B6EF5", background: "#E7E8F0", theme: "neu" },
    { id: "brutalist", label: "Brutalist", font: "space-grotesk", primary: "#FF3D00", button: "#000000", background: "#FFFFFF", theme: "brutalist" },
    { id: "apple", label: "Apple-style", font: "plus-jakarta", primary: "#0A84FF", button: "#0A84FF", background: "#FFFFFF", theme: "apple" },
    { id: "neon", label: "Neon (tech)", font: "space-grotesk", primary: "#39FF88", button: "#39FF88", background: "#0B0E14", theme: "neon" },
  ];

  const DEFAULT_STATE = { ...PRESETS[0], presetId: "default" };

  function fontStack(id) {
    return (FONTS.find((f) => f.id === id) || FONTS[0]).stack;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function hexToRgb(hex) {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function rgbToHex({ r, g, b }) {
    return "#" + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")).join("");
  }

  function mix(hexA, hexB, weightOfB) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    return rgbToHex({
      r: a.r + (b.r - a.r) * weightOfB,
      g: a.g + (b.g - a.g) * weightOfB,
      b: a.b + (b.b - a.b) * weightOfB,
    });
  }

  function luminance({ r, g, b }) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  function isDark(hex) {
    return luminance(hexToRgb(hex)) < 0.45;
  }

  function rgbToHsl({ r, g, b }) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        default:
          h = (r - g) / d + 4;
      }
      h *= 60;
    }
    return { h, s, l };
  }

  // Several icon SVGs ship with a fixed brand-red (#D92D20) stroke baked in.
  // Approximate a CSS filter that shifts that fixed red toward any chosen
  // Primary color, so white-labeled icons roughly track the new palette
  // without needing to re-export every asset.
  const SOURCE_HSL = rgbToHsl(hexToRgb("#D92D20"));

  function iconFilterFor(hex) {
    const hsl = rgbToHsl(hexToRgb(hex));
    const hueDelta = (((hsl.h - SOURCE_HSL.h + 540) % 360) - 180).toFixed(0);
    const satFactor = clamp(hsl.s / Math.max(SOURCE_HSL.s, 0.0001), 0.3, 2.5).toFixed(2);
    const lightFactor = clamp(0.6 + (hsl.l - SOURCE_HSL.l), 0.35, 1.8).toFixed(2);
    return `hue-rotate(${hueDelta}deg) saturate(${satFactor}) brightness(${lightFactor})`;
  }

  // Mark icons (shield in the logo) are drawn white; invert them to a dark
  // stroke when the Primary color they sit on is too light for white to read.
  function markFilterFor(hex) {
    return isDark(hex) ? "none" : "invert(1)";
  }

  function contrastText(hex) {
    return isDark(hex) ? "#FFFFFF" : "#141414";
  }

  function applyState(state) {
    const root = document.documentElement;

    root.style.setProperty(
      "--font-sans",
      fontStack(state.font) + ", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    );

    root.style.setProperty("--brand-primary", state.primary);
    root.style.setProperty("--brand-tint", mix(state.primary, "#FFFFFF", 0.92));
    root.style.setProperty("--brand-pressed", mix(state.primary, "#000000", 0.18));
    root.style.setProperty("--icon-chip-filter", iconFilterFor(state.primary));
    root.style.setProperty("--tab-active-filter", iconFilterFor(state.primary));
    root.style.setProperty("--mark-icon-filter", markFilterFor(state.primary));

    root.style.setProperty("--button-bg", state.button);
    root.style.setProperty("--text-on-brand", contrastText(state.button));

    root.style.setProperty("--surface-base", state.background);
    const dark = isDark(state.background);
    root.style.setProperty("--surface-subtle", dark ? mix(state.background, "#FFFFFF", 0.08) : mix(state.background, "#000000", 0.035));
    root.style.setProperty("--line-default", dark ? "rgba(255,255,255,0.16)" : "#e6e6ea");
    root.style.setProperty("--ink-primary", dark ? "#F5F6F8" : "#141414");
    root.style.setProperty("--ink-secondary", dark ? "#C6CAD3" : "#4b4b4f");
    root.style.setProperty("--ink-tertiary", dark ? "#8D93A0" : "#8a8a8e");

    root.setAttribute("data-theme", state.theme || "default");
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      return { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch (e) {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore storage errors (e.g. private mode) */
    }
  }

  let state = loadState();
  applyState(state); // idempotent re-apply; the inline <head> snippet already did a first pass

  function buildPanel() {
    const panel = document.createElement("div");
    panel.className = "customize-panel";
    panel.innerHTML = `
      <div class="cp-title">
        <strong>Customize</strong>
        <span>White-label preview</span>
      </div>

      <div class="cp-section-label">Presets</div>
      <div class="cp-presets" id="cpPresets"></div>

      <div class="cp-section-label">Typography</div>
      <div class="cp-field">
        <label for="cpFont">Font</label>
        <select id="cpFont"></select>
      </div>

      <div class="cp-section-label">Colors</div>
      <div class="cp-color-field">
        <label for="cpPrimary">Primary</label>
        <input type="color" id="cpPrimary" />
      </div>
      <div class="cp-color-field">
        <label for="cpButton">Buttons</label>
        <input type="color" id="cpButton" />
      </div>
      <div class="cp-color-field">
        <label for="cpBackground">Background</label>
        <input type="color" id="cpBackground" />
      </div>

      <button type="button" class="cp-reset" id="cpReset">Reset to default</button>
      <p class="cp-footnote">Saved in this browser only. Prototype tool — not part of the app design.</p>
    `;

    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = "customize-handle";
    handle.setAttribute("aria-label", "Toggle customize panel");
    handle.textContent = "‹";

    document.body.appendChild(panel);
    document.body.appendChild(handle);

    const presetsEl = panel.querySelector("#cpPresets");
    PRESETS.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cp-preset";
      btn.dataset.preset = p.id;
      btn.innerHTML = `<span class="cp-swatch" style="background:${p.background};"><span style="background:${p.primary};"></span></span><span>${p.label}</span>`;
      btn.addEventListener("click", () => {
        state = { font: p.font, primary: p.primary, button: p.button, background: p.background, theme: p.theme, presetId: p.id };
        applyState(state);
        saveState(state);
        syncControls();
      });
      presetsEl.appendChild(btn);
    });

    const fontSel = panel.querySelector("#cpFont");
    FONTS.forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f.id;
      opt.textContent = f.label;
      opt.style.fontFamily = f.stack;
      fontSel.appendChild(opt);
    });

    const primaryInput = panel.querySelector("#cpPrimary");
    const buttonInput = panel.querySelector("#cpButton");
    const bgInput = panel.querySelector("#cpBackground");

    function onChange(patch) {
      state = { ...state, ...patch, presetId: null };
      applyState(state);
      saveState(state);
      syncControls();
    }

    fontSel.addEventListener("change", () => onChange({ font: fontSel.value }));
    primaryInput.addEventListener("input", () => onChange({ primary: primaryInput.value }));
    buttonInput.addEventListener("input", () => onChange({ button: buttonInput.value }));
    bgInput.addEventListener("input", () => onChange({ background: bgInput.value }));

    panel.querySelector("#cpReset").addEventListener("click", () => {
      state = { ...DEFAULT_STATE };
      applyState(state);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        /* ignore */
      }
      syncControls();
    });

    handle.addEventListener("click", () => {
      const collapsed = panel.classList.toggle("collapsed");
      document.body.classList.toggle("cp-open", !collapsed);
      handle.textContent = collapsed ? "›" : "‹";
      handle.classList.toggle("at-edge", collapsed);
      try {
        localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
      } catch (e) {
        /* ignore */
      }
    });

    function syncControls() {
      fontSel.value = state.font;
      primaryInput.value = state.primary;
      buttonInput.value = state.button;
      bgInput.value = state.background;
      presetsEl.querySelectorAll(".cp-preset").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.preset === state.presetId);
      });
    }

    syncControls();

    let collapsedInit = false;
    try {
      collapsedInit = localStorage.getItem(COLLAPSE_KEY) === "1";
    } catch (e) {
      /* ignore */
    }
    if (collapsedInit) {
      panel.classList.add("collapsed");
      handle.textContent = "›";
      handle.classList.add("at-edge");
    } else {
      document.body.classList.add("cp-open");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPanel);
  } else {
    buildPanel();
  }
})();
