# Phase 0: Groundwork — Plan

See [requirements.md](requirements.md) for the decisions and
[validation.md](validation.md) for the merge gate. Do not touch the uncommitted
prototype files at any point.

## 1. Prettier (0.1)

1. `npm install -D prettier`.
2. Add `.prettierrc.json` with `{ "semi": false, "singleQuote": true, "printWidth": 100 }`.
3. Add `.prettierignore`: `dist`, `node_modules`, `package-lock.json`, and the
   prototype paths listed in requirements.md.
4. Add the `format` and `format:check` scripts.
5. Run `npm run format` once to format everything outside the prototype. Check
   `git status` to confirm no prototype file changed.

## 2. Vitest (0.1)

1. `npm install -D vitest`.
2. Add `vitest.config.ts` with `environment: 'node'`, including
   `**/*.test.ts` and excluding `e2e/**`, `node_modules/**` and `dist/**`.
3. Add `vitest.config.ts` to `tsconfig.node.json` `include`.
4. Add the `test` (`vitest run`) and `test:watch` (`vitest`) scripts.
5. Add a trivial passing test at `shared/sanity.test.ts` (for example
   `expect(1 + 1).toBe(2)`).
6. Check: `npm test` passes, and `npm run build` and `npm run lint` still pass.
7. Commit: "Add Prettier and Vitest (roadmap 0.1)".

## 3. Folders and placeholders (0.2)

1. Create `shared/index.ts` with a minimal typed export (for example
   `export const APP_NAME = 'AgentClinic'`).
2. Create `server/index.ts` with a minimal placeholder that imports nothing yet.
3. Create `e2e/README.md` (Playwright arrives in 8.4, specs are named
   `*.spec.ts`) and `e2e/env.ts` as a typed placeholder.
4. Change `shared/sanity.test.ts` to test the `shared/index.ts` export.

## 4. tsconfig references (0.2)

1. Add `tsconfig.shared.json` (strict, `esnext` + `bundler`, no DOM or Node
   types, `include: ["shared"]`, its own `tsBuildInfoFile`).
2. Add `tsconfig.server.json` (strict, `nodenext`, Node types,
   `include: ["server"]`).
3. Add `tsconfig.e2e.json` (strict, `nodenext`, Node types, `include: ["e2e"]`).
4. Reference all three from the root `tsconfig.json`.
5. Check: `npx tsc -b` type-checks the new projects (a deliberate type error in
   each folder fails the build, then remove it). If `shared/sanity.test.ts`
   fails on Vitest's Node references, apply the fallback in requirements.md.

## 5. Validation tests (0.3)

1. Add the `validate` script:
   `npm run build && npm run lint && npm run format:check && npm test`.
2. Add `specs/**/*.test.ts` to `tsconfig.node.json` `include`.
3. Add [validation.test.ts](validation.test.ts) covering every check in
   [validation.md](validation.md) that does not depend on git state. Add the
   deliberate type errors in memory with the TypeScript compiler API.
4. Check: `npm run validate` exits 0.

## 6. Wrap-up

1. Run `npm run validate` and the manual checks in [validation.md](validation.md).
2. Mark 0.1, 0.2 and 0.3 as ☑ in [roadmap.md](../roadmap.md).
3. Commit: "Add shared, server and e2e projects (roadmap 0.2)". This commit
   includes `specs/` for the first time. Stage paths explicitly, never with
   `git add -A`, so no prototype files are included.
