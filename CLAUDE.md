# CLAUDE.md — AdBlocker App (AdNil)

## Producto

Prototipo clickeable de "AdNil" (iolo), app iOS de ad-blocking para Safari.
Implementa las 13 pantallas del archivo de Figma (onboarding → paywall →
purchase → account → activación en Safari → cross-sell VPN → dashboard →
settings), cableadas entre sí para navegar el flujo. Objetivo: validar
interacción y visual — no hay lógica real de bloqueo de ads.

Fuente de diseño: Figma — [Ad Blocker App](https://www.figma.com/design/QSzjpdCOCC3qhpAJyYVuSg/Ad-Blocker-App)
(fileKey `QSzjpdCOCC3qhpAJyYVuSg`). Página "00 Provisional tokens" documenta
los tokens de color/tipografía provisorios (placeholder del design system de
iolo, a reemplazar cuando exista el real).

## Stack

- HTML / CSS / JS plano, sin build step, un archivo por pantalla.
- Deploy estático en Vercel.

## Estado

Wiring inicial de las 13 pantallas (v0.2). Toggles y selector de plan cambian
estado visual local (sin persistencia); forms no envían datos. Ver
[README.md](README.md) para el detalle de estructura y flujo de navegación.
