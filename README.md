# Lab 4 · Ex1.2 — KRAFTON x PUBG Vietnam Arena: Multi-Route SPA & Case Dossier

Lab 4 Exercise 1.2 (exercises 1.2 / 1.2.1 / 1.2.2 + In-Class Sprint 1). The single-view Lab 3 HW3 PUBG Vietnam Arena is migrated into a **React Router v7** multi-route SPA (declarative mode) with a shared layout, active `NavLink`s, and a responsive master–detail **Case Dossier** directory of fictional players.

The project is a frontend-only prototype; it is not connected to an official competition service.

## Lineage

```
Lab 3 HW3 (KRAFTON x PUBG Vietnam Arena)  →  Ex1.2 (this repository)
```

This repository starts from a snapshot of Lab 3 HW3 (commit `chore: import Lab 3 HW3 baseline`). The Lab 3 rules, plan and AI audit are archived under [`docs/history/lab3-hw3/`](./docs/history/lab3-hw3/) for reference only.

## Routes

| Path | Element | What it shows |
|---|---|---|
| `/` | `AppLayout` | Layout route: header with the *Primary* navigation (`Arena`, `People`), the single `<main>` rendering `<Outlet />`, footer |
| `/` (index) | `ArenaPage` | The Lab 3 HW3 arena screen, unchanged |
| `/people` | `PeopleLayout` | *Player dossiers* sidebar of `NavLink`s + nested `<Outlet />` |
| `/people` (index) | `PeopleIndex` | "Select a player dossier." prompt |
| `/people/:id` | `PersonDetail` | Name and role of the dossier in a `<dl>`; unknown ids (e.g. `/people/p-999`, `/people/3`) show a `404: Person Not Found` alert with a *Back to dossiers* link |
| `*` | `NotFoundPage` | *Page not found* with a link back to the Arena |

- `src/main.jsx` mounts `<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>`; `src/App.jsx` only declares `<Routes>`, so tests wrap it in `<MemoryRouter>`.
- Every router import comes from `'react-router'` (v7); `react-router-dom` is not used.
- Active links use `className={({ isActive }) => isActive ? 'active-link' : 'link'}` and receive `aria-current="page"`; the active state is shown with weight and a bar, not colour alone.
- The `/people` view is a CSS Grid (`minmax(280px, 1fr) 2fr`) that collapses to one column at ≤ 640px.
- Full contract: [`docs/contracts/ex1.2-routing.md`](./docs/contracts/ex1.2-routing.md).

## Main features

Case Dossier (Ex1.2):

- Six fictional player dossiers (`src/data/people.js`, `{ id, name, role }` with string ids `p-001`…`p-006`); the data is illustrative, not real players.
- URL-driven detail view: the person is derived from `useParams()` during render (no effects, no state), so deep links such as `/people/p-004` work after a reload.

Arena (from Lab 3 HW3, unchanged):

- PUBG Vietnam Airdrop demo with VIP Ticket and G-Coin crate claim interactions.
- A visibility-aware countdown timer.
- Optimistic local claim updates with stock rollback on request failure.
- Squad leaderboard with filtering and sorting by WWCD, placement points, and kill points.
- Kill-feed filtering and player search.

## Technology stack

- React and React DOM 19
- React Router 7 (`react-router`, declarative mode)
- JavaScript and JSX with Vite 8
- Node.js built-in test runner (`node:test`) for pure logic and source/CSS contract guards
- Vitest 5 + React Testing Library 16 + jsdom for component tests
- Oxlint

## Prerequisites

Node.js `^22.22.2`, `^24.15.0` or `>=26.0.0` (the strictest range among the locked dev dependencies, set by jsdom 31; Vitest 5 and Vite 8 accept it). Developed on Node.js 26.8.2. npm is also required.

## Installation

```sh
npm install
```

## Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite` | Start the dev server at `http://localhost:5173/` |
| `npm test` | `npm run test:node && npm run test:ui` | Run both test suites |
| `npm run test:node` | `node --test "tests/**/*.test.js"` | Pure-logic and contract tests in `tests/` (`node:test`) |
| `npm run test:ui` | `vitest run` | Component tests in `src/**/*.test.jsx` (Vitest + jsdom, setup in `src/setupTests.js`) |
| `npm run lint` | `oxlint src tests vite.config.js` | Lint |
| `npm run build` | `vite build` | Production build into `dist/` |

There is no `preview` package script. After building, use the installed Vite CLI:

```sh
npm exec -- vite preview --host 127.0.0.1 --port 4174 --strictPort
```

## Demo limitations

- People dossiers are fictional and illustrative.
- Claims are handled by a local demo adapter; no production backend or API is connected.
- VIP Ticket and G-Coin stock values are illustrative.
- Squad standings and kill-feed events are illustrative, not official or live.
- The drop phase is statically set to `WARMUP`.
- The 15-minute countdown is independent of the drop phase and restarts when the page reloads.
- No live server synchronization or official competition data is claimed.

## Related documentation

- [Project rules](./project-rules.md)
- [Claude Code working agreement](./CLAUDE.md)
- [Task decomposition](./TASK_DECOMPOSITION.md)
- [AI failure audit](./AI_FAILURE_AUDIT.md)
- [Routing and dossier contract](./docs/contracts/ex1.2-routing.md)
- [DevTools verification checkpoints](./docs/verification/ex1.2-checkpoints.md)
- [Lab 3 HW3 archive](./docs/history/lab3-hw3/)
