# CLAUDE.md — AdBlocker App (AdNil)

## Producto

Prototipo clickeable de "AdNil" (iolo), app iOS de ad-blocking para Safari.
Implementa el flujo completo del archivo de Figma (onboarding → paywall →
web checkout → upsells post-compra → purchase confirmed → account →
activación en Safari → cross-sell VPN → dashboard → settings), cableadas
entre sí para navegar el flujo. Objetivo: validar interacción y visual — no
hay lógica real de bloqueo de ads ni de pago.

Fuente de diseño: Figma — [Ad Blocker App](https://www.figma.com/design/QSzjpdCOCC3qhpAJyYVuSg/Ad-Blocker-App)
(fileKey `QSzjpdCOCC3qhpAJyYVuSg`). Página "00 Provisional tokens" documenta
los tokens de color/tipografía provisorios (placeholder del design system de
iolo, a reemplazar cuando exista el real). El checkout web (06-08) viene de
un segundo set de frames en el mismo archivo (prefijo de nodo `29:`), que
agrega el carrito "iolo Store" y dos upsells post-compra (SUPERAntiSpyware,
iolo VPN) — se mantuvo el naming "AdNil" existente en vez del "SUPERAdBlocker"
que aparece ahí, porque ese cambio de nombre se ve inconsistente en el propio
Figma (el botón del Paywall ahí mismo sigue diciendo "Get AdNil").

## Stack

- HTML / CSS / JS plano, sin build step, un archivo por pantalla.
- Deploy estático en Vercel.

## Estado

Wiring completo de 18 pantallas (13 de Figma + checkout/upsells del segundo
set de frames + Protection/Help diseñadas acá para completar la tab bar).
Toggles y selector de plan cambian estado visual local (sin persistencia);
forms no envían datos. Panel "Customize" (menú izquierdo en todas las
pantallas) permite re-themear el prototipo en vivo (fuente, colores, 6
presets de estilo + iolo default, incluyendo uno basado en el design system
de SUPERAntiSpyware) para demos white-label a partners — persiste por
browser via localStorage, no es parte del diseño real de la app. Ver
[README.md](README.md) para el detalle de estructura, flujo de navegación y
el panel de customize.
