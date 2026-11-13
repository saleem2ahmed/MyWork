# Tech stack

TypeScript end to end, using popular, well-supported tools (Mary's ask). The repo
already has a Vite + React + TypeScript scaffold, and we build on it.

## Overview

| Layer            | Choice                           | Why                                                                                                                        |
| ---------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Language         | TypeScript (strict)              | One language across client, server and shared code                                                                         |
| Runtime          | Node.js 24 LTS                   | Matches `@types/node` already in the repo                                                                                  |
| Frontend build   | Vite                             | Already scaffolded, fast dev server and builds                                                                             |
| UI               | React 19                         | Already scaffolded, the most widely used UI library                                                                        |
| Routing          | React Router (library mode)      | Standard client-side routing for React                                                                                     |
| Styling          | Plain CSS with custom properties | No extra dependency. Light and dark themes via `prefers-color-scheme`. Responsive with CSS grid, flexbox and media queries |
| API server       | Hono on Node                     | Small, typed, modern HTTP framework                                                                                        |
| Validation       | Zod                              | One schema shared by client forms and server request handling                                                              |
| Database         | SQLite (`better-sqlite3`)        | Zero-ops, file-based, reliable. Easy to move to Postgres later                                                             |
| ORM / migrations | Drizzle ORM + drizzle-kit        | Type-safe queries and versioned migrations                                                                                 |
| Unit / API tests | Vitest                           | Vite-native, fast                                                                                                          |
| End-to-end tests | Playwright                       | Real-browser checks on Chromium, Firefox and WebKit, at phone and desktop viewports                                        |
| Lint             | oxlint                           | Already configured                                                                                                         |
| Format           | Prettier                         | Ends formatting debates                                                                                                    |

## Repository layout

```
specs/          Mission, tech stack, roadmap (this "constitution")
shared/         Zod schemas and types shared by client and server
server/         Hono API, Drizzle schema, migrations, seed data
src/            React client (pages, components, styles)
e2e/            Playwright tests
```

One `package.json` at the root. Vite proxies `/api` to the API server in
development.

## Conventions

- **The API is the source of truth.** The client never invents data. It reads
  and writes through `/api`.
- **Schemas live in `shared/`.** Server handlers validate input with them, and
  client forms reuse them, so the two always agree.
- **REST-style JSON endpoints**, such as `GET /api/agents` and
  `POST /api/appointments`. Errors use a consistent `{ error: { message } }` shape.
- **Dates** are stored and sent as ISO 8601 UTC strings, and shown in the
  user's locale with `Intl.DateTimeFormat`.
- **Tests go in with the feature.** Every API route has a Vitest test. Every user
  journey has a Playwright test.
- **Phase validation runs as Vitest tests.** Each phase's `validation.md` checks
  are written as Vitest tests in a `validation.test.ts` next to it, wherever they
  can be automated. Only checks that depend on git state stay manual. `npm run validate` is the merge gate: it runs the build, lint,
  format check and tests, and a phase is done only when it exits 0.
- **Responsive design.** The web UI is responsive, and every UI change is
  checked at phone, tablet and desktop widths before it is done. See
  [Responsive design](#responsive-design).
- **Browser support:** current evergreen browsers (Chrome, Edge, Firefox, Safari).
  No legacy polyfills.

## Responsive design

| Breakpoint | Width         | Check at        |
| ---------- | ------------- | --------------- |
| Phone      | under 600px   | 320px and 375px |
| Tablet     | 600px–1023px  | 768px           |
| Desktop    | 1024px and up | 1280px          |

- **Fluid first.** Layouts use CSS grid and flexbox that adapt on their own,
  such as `repeat(auto-fit, minmax(min(260px, 100%), 1fr))`. Media queries use
  the breakpoints above, written with range syntax (`@media (width < 600px)`),
  and only where a fluid layout is not enough.
- **No horizontal scrolling** at any width down to 320px. Grid tracks and form
  fields must be able to shrink (`minmax(0, 1fr)`, `min-width: 0`).
- **Tables stack on phones.** Below 600px each row becomes a card, with every
  cell labelled from a `data-label` attribute (the `.stack-table` class).
- **Touch targets** are at least 44 × 44px on touch screens
  (`@media (pointer: coarse)`).
- **Text** uses `rem` and `clamp()`, and stays readable when zoomed to 200%.
- **The viewport meta tag** (`width=device-width, initial-scale=1`) stays in
  `index.html`.
- **Validation.** Every phase that changes the UI lists the pages it touches in
  its `validation.md`, checked at each width in the table. Until Playwright
  arrives in 8.4 this is a manual screenshot check. From 8.4 on, Playwright runs
  every user journey at a phone and a desktop viewport.

## Scripts (target)

| Script                           | Purpose                                         |
| -------------------------------- | ----------------------------------------------- |
| `npm run dev`                    | Run the Vite client and the API server together |
| `npm run build`                  | Type-check and build the client and server      |
| `npm test`                       | Vitest                                          |
| `npm run test:e2e`               | Playwright                                      |
| `npm run lint`                   | oxlint                                          |
| `npm run validate`               | Merge gate: build, lint, format check and tests |
| `npm run db:migrate` / `db:seed` | Apply migrations and load seed data             |
