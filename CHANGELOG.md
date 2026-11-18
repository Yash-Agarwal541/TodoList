# Changelog

## [Unreleased]

## [1.0.0] - 2026-11-17
### Added
- Add, view, edit, and delete tasks (TAS-1).
- Mark tasks as completed or active.
- Filter tasks by All, Active, and Completed.
- Persist tasks in LocalStorage across page reloads.
- Dark-themed, responsive UI.

### Fixed
- Blur/click race condition where editing one task could silently swallow a click on another task's control (found in Stage 6 Code Review).