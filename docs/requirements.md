# Requirements — TaskFlow (TAS-1: Manage Todo Tasks)

## Source
Jira Story: TAS-1 — "Manage Todo Tasks"

## User Story
As a user, I want to add and manage my todo tasks so that I can keep track of my daily activities.

## Functional Requirements
- FR1: User can add a new task via text input.
- FR2: User can view a list of all tasks.
- FR3: User can edit the text of an existing task.
- FR4: User can delete an existing task.
- FR5: User can mark a task as completed or active (toggle).
- FR6: User can filter the task list by All, Active, and Completed.
- FR7: Tasks persist in browser LocalStorage and survive a page refresh.

## Non-Functional Requirements
- NFR1: Frontend-only implementation using HTML5, CSS3, and vanilla JavaScript (no frameworks, backend, or APIs), per CLAUDE.md.
- NFR2: Dark-themed, responsive UI (per CLAUDE.md §3).

## Out of Scope
- Authentication, backend, database, or external APIs.
- Task due dates, priorities, categories, or any feature not listed above.

## Acceptance Criteria (from Jira, verbatim)
1. Add a new task.
2. View all tasks.
3. Edit and delete tasks.
4. Mark tasks as completed or active.
5. Filter tasks by All, Active, and Completed.
6. Save tasks in LocalStorage so they persist after refreshing the browser.

## Open Questions
- Should blank/empty tasks be blocked from being added? Not stated in Jira AC — needs confirmation before implementation.
- "Edit and delete" (Jira AC #3) treated as two separate requirements (FR3, FR4) for testability.
