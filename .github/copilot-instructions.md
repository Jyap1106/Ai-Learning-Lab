# GitHub Copilot Instructions

## Repository Context

This repository is an AI Learning Lab.

The current active project is:

- Holiday Planner: Austria Trip Companion Bot

The goal is to turn a sanitized Austria itinerary dataset into a simple AI bot that can answer trip-day questions such as:

- What is today's plan?
- What should I prepare before leaving?
- What food options are planned today?
- What transport should I use?
- What should I verify live?

## Source of Truth

For the Holiday Planner project, use these files first:

- AGENTS.md
- README.md
- projects/holiday-planner/README.md
- projects/holiday-planner/PRD.md
- projects/holiday-planner/TASKS.md
- projects/holiday-planner/BOT_SPEC.md
- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

## Working Rules

Before making changes:

1. Read AGENTS.md.
2. Read the relevant project README, PRD, and TASKS files.
3. Summarize the intended change.
4. Edit only the files requested by the issue or prompt.
5. Do not rewrite unrelated files.
6. Do not rename files unless explicitly requested.
7. Do not add paid APIs unless explicitly requested.
8. Do not add real private travel data.
9. Do not invent opening hours, prices, or live transport information.
10. Keep changes small and reviewable.

## Preferred Change Style

Use small, focused pull requests.

Good change:

- Update PRD.md for Trip Companion Bot direction
- Add BOT_SPEC.md
- Add a test-output file for Day 2 bot response

Bad change:

- Rewrite the whole project
- Add app code, APIs, database, and UI in one task
- Modify dataset, prompts, README, and tasks without being asked

## Output Expectations

When completing an issue, Copilot should:

1. Explain what files were changed.
2. Explain why the changes were made.
3. Mention any files that were intentionally not touched.
4. Ask for review if assumptions were made.
