# AI Failure Audit — Lab 4 · Ex1.1

> Graded deliverable. Log **only real** AI mistakes observed while building this exercise — hallucinated APIs, legacy syntax, broken effect loops, insecure code, false claims of passing checks. Never invent or copy entries from another exercise.

## What to watch for in this exercise

- `lazy()` declared inside a component body (remounts on every render).
- `fallback={null}` or spinners that shift layout (CLS > 0).
- Class-based error boundaries (banned) suggested for chunk errors.
- Timing-based tests (`setTimeout`) instead of deferred promises.

## Entry template

```markdown
### F-XX — <short title>
- **Task:** T?? (commit `<hash>` or "caught before commit")
- **AI prompt (summary):** …
- **AI output (excerpt):** `…` (≤ 10 lines)
- **Why it is wrong:** rule / API / spec it violates (cite project-rules.md § or official docs)
- **Impact:** what would break (render loop, memory leak, security hole, failing a11y…)
- **Detection:** how it was caught (failing test name, DevTools panel, `git grep`, review) with evidence
- **Fix:** what was changed manually and why
- **Verification:** command/test/DevTools result after the fix
```

## Findings

_No findings recorded yet._
