# TaskFlow — Project Instructions

## 1. Project Overview
TaskFlow is a simple frontend-only Todo List application.

## 2. Technology Stack
- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage

Do not introduce React, other frameworks, backend, databases, APIs, authentication, or additional dependencies.

## 3. Application Features
- Add tasks.
- View tasks.
- Edit tasks.
- Delete tasks.
- Mark tasks as completed or active.
- Filter All, Active, and Completed tasks.
- Persist tasks using LocalStorage.
- Responsive dark-themed interface.

Keep the application simple. Do not add unrequested features.

## 4. Agentic SDLC Workflow
Follow these eight stages in order:

1. Requirements
2. Architecture
3. Design Review
4. Implementation Planning
5. Implementation
6. Review
7. Verify
8. PR Using Agentic SDLC

Do not skip stages or proceed without explicit user approval.

## 5. User Approval Policy
- Agents may read and analyze existing project files.
- Before creating, modifying, deleting, or overwriting files, agents must explain the proposed changes.
- Show the exact files affected and what will change.
- Wait for explicit user approval before applying changes.
- Never assume approval.
- Ask before adding dependencies, features, or changing the agreed scope.
- Ask before creating commits or pull requests.
- Do not make unapproved changes.

## 6. Existing Project Files
- Always inspect the existing project structure and relevant file contents before making changes.
- If a required file already exists, update that file instead of creating a duplicate.
- Preserve existing working code, documentation, and configuration.
- Add content to existing files where appropriate.
- Do not replace existing contents unnecessarily.
- Never create alternative files with different names to avoid updating existing files.
- If a proposed change conflicts with existing content, explain the conflict and ask the user before proceeding.

## 7. Agent Responsibilities
- Each agent must work only within its assigned responsibility.
- Keep agent instructions, actions, and outputs concise.
- Avoid unnecessary delegation and repeated file reading.
- Every agent must create or update its report in `docs/agent-reports/`.
- Each report must record:
  - Objective
  - Work completed
  - Files created or modified
  - Decisions made
  - Verification evidence
  - Issues and blockers
  - Pending work
  - Final status

## 8. Orchestrator Responsibilities
- Coordinate all eight SDLC stages.
- Delegate work to the appropriate agent.
- Verify agent reports against actual files and evidence.
- Maintain `docs/SDLC-progress.md`.
- Request user approval before moving to the next stage.
- Do not mark a stage complete without its required deliverables and verification.

## 9. General Rules
- Do not invent requirements or make independent scope decisions.
- Prefer simple and maintainable solutions.
- Minimize token usage.
- Avoid unnecessary tool calls and repeated analysis.
- Do not mark incomplete work as completed.
- Do not modify unrelated files.
- Do not expand the application scope without user approval.