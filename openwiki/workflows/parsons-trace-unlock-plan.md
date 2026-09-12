---
type: workflow
title: Plan and implementation prompt: Parsons katas, trace-table katas, prediction unlock
description: Self-contained prompt for an implementing agent (assumes Opus 5) to add two kata types and an unlock step to the code-kata site, with acceptance criteria, effort estimates and the sample katas to create.
tags: [plan, parsons, trace-table, unlock, kata-format, prediction]
status: proposed, not started (2026-09-12)
---

# Parsons katas, trace-table katas, prediction unlock

This page is a prompt. Hand it to an implementing agent with the repository checked out. It was written from a review of the site and of the programming-education literature, not from running the code; verify every claim about the code base against `src/` before relying on it.

## Why

The site has three kata types, `text`, `choice` and `code`. Of 90 katas, one is a genuine trace task and none is a Parsons problem, while the course's written exam will consist mostly of predict-the-output and read-given-code tasks, and its pre-semester videos now stop twelve times with "Schreiben Sie jetzt auf, was dieses Programm ausgibt". The evidence behind the three additions, in short: Parsons problems give the same learning gain as writing the code in less time and lower cognitive load (Ericson et al. 2017 and the 2022 systematic review); students solve them block-first or by guessing and ask for feedback late, so feedback must name the misplaced block rather than say pass or fail (Helminen et al. 2012); writing a prediction down before running went with 75 percent correct against 50 percent for a blank page across 941 students (Lister et al. 2004); Berkeley's CS61A enforces the same step as a doctest "unlock" before code runs. Details and page references are in the lecture wiki, `concepts/programming-didactics-evidence.md`.

## What the repository is (verify)

- Vite plus TypeScript, no framework; `src/kata` (Markdown and frontmatter parsing via `js-yaml`, `marked`), `src/check` (checkers, normalisation, import whitelist), `src/editor` (CodeMirror 6 with locked regions), `src/runner` (CheerpJ, compile and run in the browser with a timeout), `src/ui`. Tests with vitest. Static deploy to GitHub Pages.
- A kata is one Markdown file in `katas/` with YAML frontmatter (`id`, `category`, `title`, `type`, `difficulty`, `tags`, `hints`, and for `code` katas `mainClass`, `allowedImports`, `timeoutMs`, `checks` with `stdout` or `return` cases) and a body with `<!-- de -->` and `<!-- en -->` language markers. `code` katas carry a Java template with locked regions. Progress lives in `localStorage`; there is no server and no account.
- The authoritative format reference is `openwiki/concepts/kata-format.md`; `docs/TASK_FORMAT.md` is gitignored and may be absent. The code wins over both.
- Categories come from `katas/categories.yaml`; a kata joins one by its `category` field.

## Deliverable 1: `type: parsons`

**Authoring format.** Frontmatter as for other types plus `parsons:` with `indentation: true|false` (default true) and `distractors: N` (how many distractor lines the body marks). Body: a fenced `java` block holding the solution in correct order and indentation; lines ending in `// distractor` are distractors and are stripped from the solution; blocks that must stay together are joined with a trailing `\` on all but the last line. Language markers as usual. Optional `checks:` as in `code` katas plus `mainClass` and `allowedImports`: if present, the assembled program is also compiled and run.

**UI.** Shuffled blocks in a source column, an empty target column; move by drag and drop (HTML5 native, no dependency) and by keyboard (select a block, move up and down, change indentation with left and right) so the kata is usable without a mouse. When `indentation` is true, each block in the target has an indentation level shown as a visible gutter. A "Prüfen" button; hints as for other types.

**Grading.** Two checkers, selected by whether `checks` exists:

- Order checker (always available): compare the target column with the solution; report the first block that is out of place, the first block with wrong indentation, and any distractor used; never reveal the full solution on a failed attempt. Blocks that are interchangeable (two independent declarations) can be marked with `// order-free` on both lines so either order passes.
- Executable checker (when `checks` exists): assemble the target column into the template and run the existing `code` checker pipeline; report the per-case table the site already renders. This accepts any correct ordering, so prefer it for katas with several valid orders.

**Feedback.** On failure, highlight the first misplaced block in the target column and say what is wrong with it ("Dieser Block gehört vor die Schleife" is out of scope; "Dieser Block steht an der falschen Stelle" is in scope). Count attempts and reveal hints incrementally as the other types do.

**Acceptance.** Three sample katas render, grade and persist progress; vitest covers the body parser (distractors, joined blocks, order-free pairs), the order checker (correct, one misplaced, wrong indentation, distractor used) and the assembly step for the executable checker; `npm run build` passes; the format reference is updated.

## Deliverable 2: `type: trace`

**Authoring format.** Frontmatter `trace:` with `columns: [i, sum, Ausgabe]` and `rows: N` (or `rows: auto` with the solution table given in the body); body holds the program in a fenced `java` block and the solution as a Markdown table with the same columns, one row per step the author wants recorded (typically one per loop iteration or per statement, the author decides and says so in the task text). A cell value `=` means unchanged, `-` means not applicable.

**UI.** The program on the left, an editable table on the right with the given column headers and N rows, all cells empty; "Prüfen"; a "Zeile hinzufügen" button only when `rows: auto`.

**Grading.** Cell-wise comparison after the site's existing normalisation (whitespace, quotes); report per cell (correct, wrong, missing) with the wrong cells highlighted and the first wrong row named; do not reveal the correct values until the kata is solved or hints are exhausted.

**Acceptance.** Two sample katas; vitest for the table parser and the cell-wise checker; build passes; format reference updated.

## Deliverable 3: prediction unlock for `code` katas

**Behaviour.** For a `code` kata with `unlock: true` in its frontmatter (and, once the team agrees, as the default with `unlock: false` to opt out), the Run button is disabled until the student has typed a prediction for the first check case: for `stdout` checks the expected output, for `return` checks the expected return value. On Run, the site shows the prediction next to the actual result and marks agreement or disagreement; the prediction is stored in `localStorage` with the attempt so the student can see their own history. A mismatch is not a failure of the kata, it is information.

**Acceptance.** Enabling `unlock` on an existing kata changes nothing else about it; vitest for the gating logic; the prediction field respects the two-language markers.

## Sample katas to create

- Parsons: reorder a `for` loop that sums 1 to n (category 05, indentation on, one distractor with `<` instead of `<=`); reorder a method with a local variable and `return` (category 06, one distractor that returns before the computation); reorder declare-then-assign-then-print (category 02, indentation off).
- Trace: the `for (int i = 1; i <= 5; i++)` loop from video unit 05 with columns `i`, `Ausgabe`; the `a = i++; b = ++i;` sequence from unit 04 with columns `i`, `a`, `b`.
- Unlock: enable on `04-durchschnitt-berechnen`, `05-summe-1-bis-n` and `06-quadrat` as the pilot.

Each sample kata mirrors one of the twelve prediction moments in the videos, so the kata is the place where a student who paused the video writes the answer down.

## Out of scope

Two-dimensional Parsons with arbitrary drag targets; Java Tutor embedding; server-side anything; a fourth checker; changing the `text` and `choice` types.

## Effort, assuming Opus 5 as the implementer

Agent working time, including tests and the documentation update, with one human review at the end:

| Deliverable | Estimate |
|-------------|----------|
| Parsons type, order checker, UI, three katas, tests | 2 to 3 hours |
| Parsons executable checker on top | 30 to 60 minutes |
| Trace type, checker, UI, two katas, tests | 1.5 to 2 hours |
| Unlock step, three pilot katas, tests | 45 to 90 minutes |
| Format reference and README | 20 minutes |

Roughly half a working day of agent time in total; the review is the human cost. Do the unlock step first: it is the smallest, it touches the runner path the other two need, and it delivers the video tie-in immediately.

## Working rules for the implementing agent

Read `openwiki/concepts/kata-format.md`, `src/kata/parse.ts`, `src/check/*` and `src/runner/*` before writing anything. Keep the three-type behaviour byte-identical (run the existing tests first and last). No new runtime dependency unless drag and drop proves unworkable natively; then prefer a small, dependency-free library. Commit per deliverable. Update this page's `status` line when done.
