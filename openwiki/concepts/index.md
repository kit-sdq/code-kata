# Files

- [Harness Codegen and Verdict Comparison](harness-codegen.md) - How the per-run JS-to-Java harness (KataRunner.java) is generated, how stdout and return values are captured through sentinels and parsed back into a RunResult, and how verifyResult compares expected vs actual JavaValue with type-wrapper unwrapping and float epsilon.
- [Kata Task Format](kata-format.md) - Authoritative reference for the katas/*.md format — YAML frontmatter schema per task type (text/choice/code), the java template block with BEGIN/END EDIT locked regions, allowedImports whitelist semantics, and stdout/return checks with the JavaValue wrapper form.
- [Safety Model: Imports, Locked Regions, Sandbox](safety-model.md) - The defense-in-depth chain that gates a Java code run before and during execution — static import/FQN/ban-list validation, locked-region re-validation, the sandboxed iframe + Worker, and timeout/teardown — and what it does and does NOT protect against.
