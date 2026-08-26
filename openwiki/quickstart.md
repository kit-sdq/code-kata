---
type: quickstart
title: Quickstart
description: Entry point for the Code Kata wiki — what the project is, the local dev/test/build commands, and a task-oriented routing map to the rest of the wiki.
tags: [quickstart, overview, routing, build, dev]
verified:
  - by: openwiki/0.4.0
    at: 2026-08-26T15:48:44.789Z
sources:
  - id: openwiki-source-6766b7a0c14857435d2077c9
    resource: repo://.github/workflows/deploy.yml
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-23775c3de52f3ab95a13cb8b
    resource: repo://README.md
  - id: openwiki-source-28cf1793f71c4de8ab3f0467
    resource: repo://src/kata/load.ts
  - id: openwiki-source-5e1b077422a94ae165e88e4e
    resource: repo://vite.config.ts
generated: {by: "openwiki/0.4.0", at: "2026-08-26T15:48:44.789Z"}
---

# Quickstart

## What this is

**Code Kata** is a **static, backend-free** site for practicing Java. Learners
get three kinds of exercise — short-answer text, single/multi-select choice, and
real **compile-and-run Java** code katas — and everything is graded **in the
browser**: there is no server, no code submission, and no accounts or tracking.
Progress (solved / attempts / hints revealed) is persisted locally in
`localStorage`.

Java code katas compile and run client-side through [CheerpJ](https://cheerpj.com/)
(a WebAssembly JVM); text and choice katas have no such runtime dependency. The
whole app is deployable as a plain static site (GitHub Pages), using
`base: './'` so the bundle ships with relative asset paths.

## Local commands

Requires **Node.js 22** (the version pinned in the CI/deploy workflow).

```sh
npm install        # install dependencies
npm run dev        # Vite dev server with hot reload (HMR)
npm test           # vitest run — the unit test suite
npm run build      # tsc --noEmit && vite build  ->  dist/
npm run preview    # serve the built dist/ locally
```

`npm run build` is the same pipeline CI runs: it type-checks (`tsc --noEmit`),
builds the static bundle (`vite build` → `dist/`), and is what the GitHub Actions
workflow publishes to GitHub Pages on every push to `main`.

## Katas are just Markdown files

There is **no manifest, registry, or database**. Katas are plain `katas/*.md`
files discovered at **build time** via Vite's `import.meta.glob('../../katas/*.md',
{ query: '?raw', import: 'default', eager: true })`. Dropping a new `.md` file
into `katas/` is all it takes to add a kata — on the next dev reload (or the next
push to `main`, which rebuilds and redeploys automatically) the kata appears in
the list.

The filename (minus `.md`) becomes the fallback `id` (YAML frontmatter can
override it), and parsed katas are sorted by title. A parse failure for one file
is logged and skipped rather than aborting the whole load. To author the format,
see [Kata Task Format](/openwiki/concepts/kata-format.md).

## Where to go next

Pick the page that matches what you're trying to do:

| If you want to… | Read this page |
| --- | --- |
| Understand the system as a whole | [Architecture Overview](/openwiki/architecture/overview.md) |
| Add or author a kata (`katas/*.md`) | [Kata Task Format](/openwiki/concepts/kata-format.md) |
| Change the run / grade path (sandbox, CheerpJ, harness, verify) | [Workflow: Code-Task Execution Path](/openwiki/workflows/code-execution.md) |
| Understand the per-run JS→Java harness codegen and verdict comparison | [Harness Codegen and Verdict Comparison](/openwiki/concepts/harness-codegen.md) |
| Touch safety / sandbox / import validation | [Safety Model](/openwiki/concepts/safety-model.md) |
| Change how katas are discovered, rendered, or how progress persists | [Workflow: Kata Discovery, Render, and Progress](/openwiki/workflows/kata-lifecycle.md) |
| Deploy, build, or change the GitHub Pages pipeline | [Operations: Build and Deployment](/openwiki/operations/deployment.md) |
| Write or run tests | [Testing](/openwiki/testing.md) |