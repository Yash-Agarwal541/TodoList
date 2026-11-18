# Code Review — TaskFlow (TAS-1)

## Scope Reviewed
- index.html, css/style.css, js/script.js
- Against docs/requirements.md, docs/architecture.md, docs/impl-plan.md

## Findings

### 1. [Bug — Medium] Blur-triggered re-render can swallow clicks on other tasks' controls
**Location:** js/script.js:150 (`input.addEventListener("blur", confirmEdit)`), interacting with the full-list `render()` at js/script.js:35-44.

**Issue:** While a task is being edited, clicking another task's Edit/Delete button or checkbox fires `blur` on the edit input first. The `blur` handler synchronously calls `confirmEdit()` -> `render()`, which tears down and rebuilds the entire task list — including the button the user is in the middle of clicking. Because the browser's mousedown and mouseup/click land on two different DOM node instances (old vs. re-rendered), no `click` event is synthesized, so the other task's action is silently dropped.

**Reproduced:** Edit Task A, then click Delete on Task B — Task B remains in the list (verified via automated browser test).

**Proposed fix:** Defer the blur-triggered commit by one tick so the in-flight click on the other control completes first:
```js
input.addEventListener("blur", () => setTimeout(confirmEdit, 0));
```

**Status: Applied (approved).**

### 2. [Code Quality — Duplication] Blank-task validation duplicated
**Location:** `addTask` (js/script.js:77-81) and `editTask` (js/script.js:109-113).

**Issue:** Both functions independently implement `const text = rawText.trim(); if (!text) return;`. docs/impl-plan.md explicitly flagged this as a risk ("implement as one shared helper to avoid duplication/inconsistency"), but it was not factored out during implementation.

**Proposed fix:** Extract a shared helper:
```js
function normalizeTaskText(rawText) {
  return rawText.trim();
}
```
and use `const text = normalizeTaskText(rawText); if (!text) return;` in both `addTask` and `editTask`.

**Status: Skipped (not approved for this stage).**

### 3. [Minor — Low severity] Task ID collision risk
**Location:** js/script.js:84 (`id: Date.now().toString()`).

**Issue:** Two tasks created within the same millisecond would receive identical IDs, causing toggle/edit/delete to act on the wrong task (or both, since `find`/`filter` match by id). Not reproducible via normal manual UI interaction (each add requires a separate user action), so severity is low, but it is a genuine correctness gap.

**Proposed fix (optional, low priority):** Append a small random suffix, e.g. `id: Date.now().toString() + Math.random().toString(36).slice(2, 6)`.

**Status: Skipped (not approved for this stage).**

## Requirements Compliance
- FR1–FR7 all correctly implemented and previously verified (docs/implementation-report.md, reused — not re-tested here).
- No scope creep: no frameworks, backend, or unapproved features found.
- NFR1 (frontend-only) and NFR2 (dark theme/responsive) satisfied.

## Verdict
Issue #1 fixed and regression-tested. Issues #2 and #3 deferred — no further action planned unless requested in a future stage.
