# AdNil — Clickable prototype

Static HTML/CSS/JS wiring of the 13-screen "AdNil for iOS" Figma mockup
(onboarding → paywall → purchase → account → Safari activation → cross-sell →
dashboard → settings). No build step, no real ad-blocking logic — this is a
navigation prototype for interaction/visual QA.

Source: [Figma — Ad Blocker App](https://www.figma.com/design/QSzjpdCOCC3qhpAJyYVuSg/Ad-Blocker-App)

## Run locally

Open `index.html` (redirects to `01-welcome.html`), or serve the folder with
any static server.

## Structure

- `01-welcome.html` … `13-settings.html` — one file per Figma frame, linked
  together to match the intended flow (see `scripts/nav.js` `SCREENS` for the
  full list and the floating "jump to screen" menu in the bottom-right corner
  of every page).
- `styles/tokens.css` — provisional iolo-style design tokens pulled from the
  Figma file's "00 Provisional tokens" reference frame.
- `styles/app.css` — shared components (status bar, buttons, cards, tab bar,
  toggles, plan selector, settings rows, etc.).
- `scripts/nav.js` — injects the jump-to-screen menu and wires the
  non-functional toggle/plan-selector interactions (visual state only).
- `assets/icons/*.svg` — icons downloaded from Figma (Code Connect/MCP asset
  export), referenced locally (no temporary Figma URLs in code).
- `scripts/download-assets.sh` — re-downloads the icon set if Figma asset URLs
  are refreshed.

## Notes

- Non-functional prototype: toggles/plan selection only change visual state
  locally (no persistence), forms don't submit, "Restore"/"Delete account"
  just navigate for flow continuity.
- Tab bar destinations for Protection/Help point back to the dashboard since
  those screens aren't in the current Figma file.
