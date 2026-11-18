# Architecture — TaskFlow

## File Responsibilities

### index.html
- Page shell and semantic structure only.
- Elements: task input field, "Add" button/form, task list container (`<ul>`), filter controls (All / Active / Completed), empty-state placeholder.
- Links `css/style.css` and `js/script.js` (deferred script).
- No inline styles or inline scripts.

### css/style.css
- All visual styling: dark theme (background/surface/text/accent color tokens), layout, responsive breakpoints (mobile-first, flex/grid based).
- Styles for task states: active vs. completed (e.g., strikethrough/dim for completed).
- No JavaScript-driven logic; only presentation.

### js/script.js
- All application logic, single file, vanilla JS, no modules/bundler needed given project size.
- Responsibilities (organized as functions, not classes/frameworks):
  - **State**: in-memory array of task objects, source of truth during a session.
  - **Persistence**: load from LocalStorage on startup; save to LocalStorage after every mutation.
  - **Rendering**: re-render task list from state + active filter.
  - **Event handling**: add, edit, delete, toggle complete, filter change — via event delegation on the list container where practical.
  - **ID generation**: simple unique id per task (e.g., timestamp-based), no external library.

## Task Data Model

Each task is a plain object:

```json
{
  "id": "string (unique, e.g. Date.now().toString())",
  "text": "string (task description)",
  "completed": "boolean",
  "createdAt": "number (timestamp, for stable ordering)"
}
```

Tasks are held in a single array: `let tasks = [...]`.

## LocalStorage Handling
- **Key**: `taskflow.tasks` (namespaced to avoid collisions).
- **Format**: JSON-stringified array of task objects (above model).
- **Write**: after every state mutation (add/edit/delete/toggle), call a single `saveTasks()` that stringifies and writes the full array.
- **Read**: on page load, call `loadTasks()` which parses the stored JSON (defaulting to `[]` if missing/invalid) to initialize state — satisfies FR7.
- **Filter state**: kept in memory only (not persisted), defaults to "All" on reload — simplest option, not required by FR6/AC5.

## Requirements Traceability
- FR1 (add) → input + add handler in script.js
- FR2 (view) → render function + `<ul>` in index.html
- FR3/FR4 (edit/delete) → per-task controls + handlers
- FR5 (toggle complete) → checkbox/click handler, updates `completed` + re-render
- FR6 (filter) → filter buttons + in-memory filter state applied at render time
- FR7 (persistence) → `saveTasks()` / `loadTasks()` via LocalStorage
- NFR1 (frontend-only) → no frameworks/build step; plain `<script src="js/script.js">`
- NFR2 (dark theme, responsive) → css/style.css only

## Open Question Carried Forward
- Blank-task validation (from docs/requirements.md Open Questions) is not yet decided; architecture does not assume it. To be resolved before/during Implementation Planning.
