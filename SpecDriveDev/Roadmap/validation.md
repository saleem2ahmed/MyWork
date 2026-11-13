# Phase 0: Groundwork — Validation

The branch can be merged when `npm run validate` exits 0 on a clean `npm install`
and every manual check below is ticked.

## Automated checks

`npm run validate` runs these in order and stops at the first failure:

| Command                | Expected result                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `npm run build`        | Exits 0. `tsc -b` builds the app, node, shared, server and e2e projects             |
| `npm run lint`         | Exits 0 with no new warnings                                                        |
| `npm run format:check` | Exits 0 over the whole repo. Only the prototype paths are ignored                   |
| `npm test`             | Exits 0, including [validation.test.ts](validation.test.ts), and ends without watch |

[validation.test.ts](validation.test.ts) automates these checks:

- `shared/`, `server/` and `e2e/` exist at the repo root, each with its
  placeholder.
- The root `tsconfig.json` references `tsconfig.shared.json`,
  `tsconfig.server.json` and `tsconfig.e2e.json`. Each is strict and type-checks
  its placeholder, and `tsconfig.shared.json` has no DOM or Node types.
- A deliberate type error in `shared/index.ts`, `server/index.ts` and
  `e2e/env.ts` fails its project. The test adds the error in memory, so no file
  is edited.
- `package.json` has the `test`, `test:watch`, `format`, `format:check` and
  `validate` scripts. `prettier` and `vitest` are in `devDependencies`, and the
  only runtime dependencies are `react` and `react-dom`.
- Vitest excludes `e2e/**`.
- Roadmap items 0.1, 0.2 and 0.3 are marked ☑.

## Manual checks

These depend on git state, so they stay manual:

- [ ] `git diff master...phase-0-groundwork` (or `main...` once it exists)
      contains none of the prototype files listed in
      [requirements.md](requirements.md).
- [ ] `git status` shows the prototype files exactly as they were: still
      modified or untracked, with no formatting changes.
