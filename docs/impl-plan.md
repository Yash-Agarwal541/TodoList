# Implementation Plan — TaskFlow (TAS-1)

## Blank-Task Validation Decision
**Decision:** Reject blank/whitespace-only task text — the Add action is a no-op if the trimmed input is empty (no alert/error dialog, just silently does not add a task). This is standard input-handling behavior, not a new feature, and keeps the UI simple per CLAUDE.md.
**Rationale:** Prevents empty list items without adding extra UI (error messages, modals) that would expand scope. Resolves the open question from Requirements/Design Review.

## Task Breakdown (dependency-ordered)

1. **T1 — HTML shell** (`index.html`)
   - Input field + Add button/form, task list `<ul>`, filter buttons (All/Active/Completed), link to css/js.
   - Depends on: architecture file responsibilities. No code dependencies (first task).

2. **T2 — Base styling** (`css/style.css`)
   - Dark theme tokens, layout, responsive breakpoints, active/completed task styles.
   - Depends on: T1 (needs HTML structure/classes to style).

3. **T3 — State & persistence core** (`js/script.js`)
   - `tasks` array, `loadTasks()`/`saveTasks()` against LocalStorage key `taskflow.tasks`.
   - Depends on: T1 (DOM present), architecture data model.
   - Satisfies: FR7.

4. **T4 — Render function** (`js/script.js`)
   - Render task list from `tasks` + current filter; empty-state placeholder.
   - Depends on: T3 (needs state to render).
   - Satisfies: FR2.

5. **T5 — Add task** (`js/script.js`)
   - Add handler: trim input, apply blank-task decision (no-op if empty), create task object, push, save, re-render.
   - Depends on: T3, T4.
   - Satisfies: FR1.

6. **T6 — Toggle complete** (`js/script.js`)
   - Checkbox/click handler flips `completed`, saves, re-renders.
   - Depends on: T4.
   - Satisfies: FR5.

7. **T7 — Edit task** (`js/script.js`)
   - Per-task "Edit" control (per Design Review recommendation); inline input swap; Enter confirms, Escape cancels; trimmed/blank-guarded same as T5.
   - Includes keyboard support: Enter to add/confirm edit, Escape to cancel edit (per Design Review recommendation).
   - Depends on: T4, T5 (reuses blank-check logic).
   - Satisfies: FR3.

8. **T8 — Delete task** (`js/script.js`)
   - Per-task "Delete" control; removes from array, saves, re-renders.
   - Depends on: T4.
   - Satisfies: FR4.

9. **T9 — Filter controls** (`js/script.js`)
   - Filter button handlers set in-memory filter state, re-render.
   - Depends on: T4.
   - Satisfies: FR6.

## Requirements Coverage
| Task | FR/NFR |
|---|---|
| T1 | structural basis for all FRs |
| T2 | NFR2 |
| T3 | FR7 |
| T4 | FR2 |
| T5 | FR1 |
| T6 | FR5 |
| T7 | FR3, usability (Design Review rec.) |
| T8 | FR4 |
| T9 | FR6 |

## Risks
- Low risk overall given simple, dependency-free stack.
- Edit (T7) and Add (T5) share blank-validation logic — implement as one shared helper to avoid duplication/inconsistency.

## Out of Scope (reaffirmed)
- No frameworks, backend, APIs, or authentication.
- No features beyond FR1–FR7 and the two Design Review usability recommendations already approved.
