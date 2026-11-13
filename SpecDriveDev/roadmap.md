# Roadmap

We build the data and API foundation first, then put the UI on top of it. Each
phase is deliberately small: one focused change that leaves the app building,
lint-clean and tested. Finish a phase before starting the next. Every phase that
touches the UI is responsive when it ships: it works at phone, tablet and desktop
widths (see [Responsive design](tech-stack.md#responsive-design)).

Status key: ☐ not started · ◐ in progress · ☑ done

## Phase 0: Groundwork

- ☑ **0.1** Add Prettier and Vitest, plus `test` and `format` scripts. One trivial
  passing test.
- ☑ **0.2** Create the `shared/`, `server/` and `e2e/` folders and the tsconfig
  references for them.
- ☑ **0.3** Add the `validate` script and automate this phase's validation checks
  as Vitest tests.

## Phase 1: Data foundation

- ☐ **1.1** Add SQLite and Drizzle. Define the `therapies` table and its first
  migration.
- ☐ **1.2** Add the `ailments` table, with an `ailment_therapies` join table.
- ☐ **1.3** Add the `agents` table, with an `agent_ailments` join table.
- ☐ **1.4** Add the `appointments` table (agent, therapy, start time, notes, status).
- ☐ **1.5** Write a seed script with playful sample data. Add the `db:migrate` and
  `db:seed` scripts.

## Phase 2: Read-only API

- ☐ **2.1** Hono server skeleton with `GET /api/health`, a Vite `/api` proxy, and a
  `dev` script that runs both.
- ☐ **2.2** `GET /api/therapies`, with a test.
- ☐ **2.3** `GET /api/ailments`, including recommended therapies, with a test.
- ☐ **2.4** `GET /api/agents` and `GET /api/agents/:id` (with ailments), with tests.
- ☐ **2.5** `GET /api/appointments`, filterable by agent and status, with a test.

## Phase 3: Write API

- ☐ **3.1** Zod schemas in `shared/` for creating an appointment.
- ☐ **3.2** `POST /api/appointments` with validation (agent and therapy must exist,
  start time must be in the future), with tests.
- ☐ **3.3** `PATCH /api/appointments/:id` to mark an appointment completed or
  cancelled, with tests.
- ☐ **3.4** Consistent error responses and 404 handling.

## Phase 4: App shell

- ☐ **4.1** Replace the Vite starter page with the AgentClinic layout: header,
  nav and footer. The nav wraps or collapses cleanly at phone widths.
- ☐ **4.2** Add React Router with placeholder pages for every nav item.
- ☐ **4.3** Base styles: design tokens, light and dark themes, the responsive
  breakpoints, fluid grids, stacking tables and touch-sized tap targets.
- ☐ **4.4** A small typed API client in `src/api.ts`, with loading and error states.

## Phase 5: Catalog pages

- ☐ **5.1** Therapies page.
- ☐ **5.2** Ailments page, with severity badges and recommended therapies.
- ☐ **5.3** Agents list page.
- ☐ **5.4** Agent detail page: ailments, recommendations and appointment history.

## Phase 6: Booking

- ☐ **6.1** Appointments list page.
- ☐ **6.2** Booking form that uses the shared Zod schema.
- ☐ **6.3** Highlight the therapies recommended for the selected agent.
- ☐ **6.4** "Book for this agent" shortcut from the agent detail page.
- ☐ **6.5** Complete and cancel actions on the appointments list.

## Phase 7: Dashboard

- ☐ **7.1** `GET /api/stats` (agents in care, upcoming and completed sessions), with
  a test.
- ☐ **7.2** Dashboard stat tiles.
- ☐ **7.3** "Upcoming appointments" panel.
- ☐ **7.4** "Most common ailments" panel.

## Phase 8: Polish and launch readiness

- ☐ **8.1** Landing hero and playful copy pass (Steve).
- ☐ **8.2** Responsive audit: recheck every page at phone, tablet and desktop
  widths and fix anything earlier phases missed.
- ☐ **8.3** Accessibility pass: keyboard navigation, focus styles, contrast, labels.
- ☐ **8.4** Playwright end-to-end tests: browse the catalog, book an appointment,
  cancel an appointment. Each journey runs at a phone and a desktop viewport.
- ☐ **8.5** README update: setup, scripts, architecture.

## Later (not scheduled)

- Staff sign-in, and separate agent and staff views.
- Searching and filtering agents and ailments.
- Therapist profiles and availability slots.
- Moving from SQLite to Postgres for hosted deployment.
