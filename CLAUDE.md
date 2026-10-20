# CLAUDE.md — AdBlocker App

## Producto

Prototipo de interfaz (popup) de una extensión ad-blocker. Objetivo: validar
interacción y visual, no funcionalidad real de bloqueo.

## Stack

- HTML / CSS / JS plano, sin build step.
- Deploy estático en Vercel.

## Estado

Prototipo inicial (v0.1). El "bloqueo" es simulado en `script.js` (contador
incremental + estado persistido en `localStorage`), no hay lógica real de
network blocking.
