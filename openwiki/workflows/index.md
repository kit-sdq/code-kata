# Files

- [Code-Task Execution Path: Run Button to Rendered Verdict](code-execution.md) - End-to-end control flow for a single code-kata Run — validation gates, sandbox iframe/Worker spawn, CheerpJ compile/run, sentinel capture, verdict, and failure/diff rendering in the browser.
- [Kata Discovery, Render, and Progress](kata-lifecycle.md) - How a katas/*.md file becomes a rendered task at runtime — build-time discovery via import.meta.glob, YAML/Markdown parsing and per-type validation, hash routing, the list and task views, client-side grading of text and choice katas, and hint/progress persistence in localStorage.
