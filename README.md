# AdNil — Clickable prototype

Static HTML/CSS/JS wiring of the "AdNil for iOS" Figma mockup (onboarding →
paywall → purchase → account → Safari activation → cross-sell → dashboard →
settings), plus two tab-bar destinations (Protection, Help) designed to match
the system since they don't exist in the Figma file. No build step, no real
ad-blocking logic — this is a navigation prototype for interaction/visual QA.

Source: [Figma — Ad Blocker App](https://www.figma.com/design/QSzjpdCOCC3qhpAJyYVuSg/Ad-Blocker-App)

## Run locally

Open `index.html` (redirects to `01-welcome.html`), or serve the folder with
any static server.

## Structure

- `01-welcome.html` … `13-settings.html` — one file per Figma frame, linked
  together to match the intended flow.
- `14-protection.html`, `15-help.html` — tab-bar destinations not present in
  the Figma file, designed with the same tokens/components (toggle list for
  block categories, FAQ/support list) so the tab bar is fully wired.
- See `scripts/nav.js` `SCREENS` for the full list and the floating "jump to
  screen" menu in the bottom-right corner of every page.
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
- Protection toggles are visual-only (no real blocking); FAQ rows in Help
  don't expand.
