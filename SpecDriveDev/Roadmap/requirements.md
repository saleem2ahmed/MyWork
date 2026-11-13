# Phase 0: Groundwork — Requirements

Roadmap items **0.1**, **0.2** and **0.3** from [roadmap.md](../roadmap.md). Branch:
`phase-0-groundwork`.

## Context

The repo is the Vite + React + TypeScript scaffold. It has oxlint, but no
formatter, no test runner and no folders for the server, shared code or
end-to-end tests. Every later phase expects these to exist. The
[tech stack](../tech-stack.md) asks for Prettier, Vitest, a `shared/` + `server/`

- `src/` + `e2e/` layout and one root `package.json`, and
  [mission.md](../mission.md) asks for small, shippable steps with tests that go in
  alongside features.

The working tree also has an uncommitted, client-only UI prototype
(`src/pages/`, `src/store.tsx`, `src/data/seed.ts`, `src/clinic.ts`,
`src/format.ts`, `src/router.ts`, `src/types.ts` and edits to `App.tsx`,
`index.css`, `main.tsx`, `index.html`, `README.md`). It is ahead of the roadmap
and is **not** part of this phase.

## Scope

### In scope

- **0.1** Install Prettier and Vitest as dev dependencies. Add the `test` and
  `format` scripts (plus `format:check`). Add one trivial passing test.
- **0.2** Create the `shared/`, `server/` and `e2e/` folders, each with a
  minimal placeholder, and the tsconfig project references for them so
  `tsc -b` type-checks them.
- **0.3** Add a `validate` script that runs the whole merge gate, and turn the
  checks in [validation.md](validation.md) into Vitest tests wherever they can
  be automated.

### Out of scope

- Any prototype files listed above: no edits, no reformatting, no commits.
- Hono, Drizzle, Zod, SQLite and Playwright. They arrive in later phases.
- jsdom and React component tests.
- CI workflows.
- Responsive design checks. This phase has no UI. The
  [responsive design](../tech-stack.md#responsive-design) rules apply from the
  first phase that changes the UI.

## Decisions

| Decision                        | Choice                                                                                                                                                                                           | Why                                                                                                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vitest config                   | Its own `vitest.config.ts`, `environment: 'node'`                                                                                                                                                | Keeps test settings apart from the client build. The first real tests are server and shared code                                                                                                  |
| Test file naming                | Vitest picks up `**/*.test.ts`. Playwright will use `e2e/**/*.spec.ts` later                                                                                                                     | The two runners never pick up each other's files                                                                                                                                                  |
| Test location                   | Colocated with the code they test                                                                                                                                                                | Easy to find, and what Vitest expects by default                                                                                                                                                  |
| Trivial test                    | `shared/sanity.test.ts`, created in 0.1. In 0.2 it changes to test the `shared/index.ts` export                                                                                                  | Avoids touching `src/`, which holds prototype files, and avoids moving the file later. It is type-checked once 0.2 adds `tsconfig.shared.json`                                                    |
| Prettier style                  | `semi: false`, `singleQuote: true`, `printWidth: 100`                                                                                                                                            | Matches the code already in the repo, so adopting Prettier causes little churn                                                                                                                    |
| Formatting the repo             | Add the prototype paths to `.prettierignore`, then run `prettier --write .` once, which formats everything else (specs, config files)                                                            | `format:check` checks the whole repo, so everything outside the prototype must already be formatted. The prototype paths come out of `.prettierignore` when the prototype is committed or dropped |
| Scripts                         | `test`: `vitest run`, `test:watch`: `vitest`, `format`: `prettier --write .`, `format:check`: `prettier --check .`                                                                               | `npm test` runs once and exits, for scripts and agents                                                                                                                                            |
| tsconfig layout                 | New `tsconfig.shared.json`, `tsconfig.server.json` and `tsconfig.e2e.json`, referenced from the root `tsconfig.json`                                                                             | Same pattern as the existing `tsconfig.app.json` / `tsconfig.node.json`                                                                                                                           |
| Server and e2e compiler options | Node types, `module: nodenext`, strict, same lint flags as `tsconfig.node.json`                                                                                                                  | They run on Node 24, not in the browser                                                                                                                                                           |
| Shared compiler options         | `module: esnext`, `moduleResolution: bundler`, no DOM or Node types                                                                                                                              | Shared code has to work in both client and server                                                                                                                                                 |
| Vitest config type-check        | Add `vitest.config.ts` to `tsconfig.node.json` `include`                                                                                                                                         | It is a Node-side config file, like `vite.config.ts`                                                                                                                                              |
| Placeholders                    | `shared/index.ts`, `server/index.ts`, `e2e/README.md` + a typed `e2e/env.ts` placeholder                                                                                                         | `tsc -b` fails on a project with no inputs (TS18003)                                                                                                                                              |
| Strict mode                     | Set `"strict": true` in the new tsconfigs                                                                                                                                                        | The tech stack says TypeScript (strict). TypeScript 6 probably turns it on by default already, but writing it out makes the intent clear                                                          |
| Test typings in `shared/`       | Import from `vitest` explicitly and keep `types` empty. If `tsc -b` complains about Vitest's Node references, move `shared/**/*.test.ts` out of `tsconfig.shared.json` into `tsconfig.node.json` | Shared runtime code stays free of Node types                                                                                                                                                      |
| Committing `specs/`             | The roadmap update commits `specs/` (`mission.md`, `tech-stack.md`, `roadmap.md` and this folder) for the first time                                                                             | The specs are part of the project and belong in git                                                                                                                                               |
| Validation tests                | Each phase's automatable checks live in `validation.test.ts` next to its `validation.md`. `tsconfig.node.json` includes `specs/**/*.test.ts`                                                     | The checks run on every `npm test` instead of by hand. Git-state scope checks stay manual                                                                                                         |
| Deliberate type errors          | Added in memory through the TypeScript compiler API, never written to disk                                                                                                                       | Tests never edit source files, so a failed run cannot leave a broken file behind                                                                                                                  |
| `validate` script               | `npm run build && npm run lint && npm run format:check && npm test`                                                                                                                              | One command for the merge gate, for people and agents alike                                                                                                                                       |
