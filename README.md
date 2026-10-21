# AdNil — Clickable prototype

Static HTML/CSS/JS wiring of the "AdNil for iOS" Figma mockup: onboarding →
paywall → web checkout → post-purchase upsells → purchase confirmed →
account → Safari activation → cross-sell → dashboard → settings, plus two
tab-bar destinations (Protection, Help) designed to match the system since
they don't exist in the Figma file. No build step, no real ad-blocking logic,
no real payment processing — this is a navigation prototype for
interaction/visual QA.

Source: [Figma — Ad Blocker App](https://www.figma.com/design/QSzjpdCOCC3qhpAJyYVuSg/Ad-Blocker-App)

## Run locally

Open `index.html` (redirects to `01-welcome.html`), or serve the folder with
any static server.

## Structure

- `01-welcome.html` … `18-help.html` — one file per Figma frame, linked
  together to match the intended flow. See `scripts/nav.js` `SCREENS` for the
  full list and the floating "jump to screen" menu in the bottom-right corner
  of every page.
- `06-web-checkout.html`, `07-post-purchase-sas.html`,
  `08-post-purchase-vpn.html` — the web-based purchase funnel (iolo Store
  checkout + two post-purchase upsell sheets) reached from the Paywall's "Get
  AdNil" button. Styled as an external, browser-hosted storefront (own fixed
  colors/typography under the `.store` namespace in `styles/app.css`) rather
  than following the app's white-label tokens, since it represents leaving
  the app into Safari — only the elements that are explicitly "the AdNil app"
  (its icon chip, the green return-to-app button) reuse the app's tokens.
- `17-protection.html`, `18-help.html` — tab-bar destinations not present in
  the Figma file, designed with the same tokens/components (toggle list for
  block categories, FAQ/support list) so the tab bar is fully wired.
- `styles/tokens.css` — provisional iolo-style design tokens pulled from the
  Figma file's "00 Provisional tokens" reference frame.
- `styles/app.css` — shared components (status bar, buttons, cards, tab bar,
  toggles, plan selector, settings rows, web-checkout/offer-sheet, etc.).
- `scripts/nav.js` — injects the jump-to-screen menu and wires the
  non-functional toggle/plan-selector interactions (visual state only).
- `assets/icons/*.svg` — icons downloaded from Figma (Code Connect/MCP asset
  export), referenced locally (no temporary Figma URLs in code).
- `scripts/download-assets.sh`, `scripts/download-checkout-assets.sh` —
  re-download the icon sets if Figma asset URLs are refreshed.
- `styles/customize.css`, `scripts/customize.js` — left-side "Customize"
  panel for white-labeling the prototype (see below).

## White-label customize panel

Every screen has a left-side panel (collapsible) to re-theme the prototype
live, for demoing to potential partner companies:

- **Typography** — 6 modern/techy Google Fonts (Inter, Space Grotesk, Sora,
  Plus Jakarta Sans, Manrope, Bai Jamjuree).
- **Colors** — Primary, Buttons, Background color pickers.
- **Presets** — iolo default (the original Figma look, always the reset
  target), Glassmorphism, Neumorphism, Brutalist, Apple-style, Neon (tech),
  SUPERAntiSpyware (sourced from [its own design
  system](https://www.figma.com/design/QX6HjOPiwes8P4aWKuYqmg/SAS-25--App--Icons-and-New-Web-?node-id=735-1294) —
  near-black surfaces, flat neon-green CTA, red accents, Bai Jamjuree type),
  each with its own font/palette and a `[data-theme]` CSS override block.
- **Reset** button restores iolo default.

State persists per-browser via `localStorage` (key `adnil-customize`), with
an inline bootstrap script in each page's `<head>` to avoid a flash of
default styling before `scripts/customize.js` loads, and a `cp-no-anim`
class that suppresses the panel's open/close transition on that same initial
load so navigating between screens doesn't replay it as a slide-in (the
transition still plays for an in-page toggle click). Icon recoloring is an
approximation (CSS `filter: hue-rotate/saturate/brightness`, since the source
SVGs bake in a fixed stroke color rather than using `currentColor`) — good
enough for a prototype demo, not pixel-perfect across all primary colors.

## Notes

- Non-functional prototype: toggles/plan selection only change visual state
  locally (no persistence), forms don't submit, "Restore"/"Delete account"
  just navigate for flow continuity.
- Protection toggles are visual-only (no real blocking); FAQ rows in Help
  don't expand.
