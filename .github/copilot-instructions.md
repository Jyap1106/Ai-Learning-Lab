# GitHub Copilot Instructions for AI Learning Lab

This file provides instructions for GitHub Copilot and other AI assistants working on this repository.

## Repository Purpose

This repository documents a 30-day journey to become an AI-powered builder. It contains learning projects, datasets, prompts, and test outputs focused on AI applications, RAG, agents, and automation.

**Read AGENTS.md first before working on any task.**

## Current Active Project

**Holiday Planner: Austria Trip Companion Bot**

The bot answers trip-day questions using a sanitized Austria itinerary dataset as the source of truth.

Example questions:
- What is today's plan?
- What should I prepare before leaving?
- What food options are planned today?
- What transport should I use?
- What should I verify live?

## How AI Assistants Should Work

1. Read AGENTS.md first.
2. Read the root README.md.
3. Read only the project folder relevant to the task.
4. Summarize your understanding before suggesting changes.
5. Ask before editing files (unless the user explicitly requests action).
6. Do not scan the whole repository unless necessary.
7. Do not rewrite unrelated files.
8. Prefer small, controlled changes.
9. Keep explanations beginner-friendly.
10. Prioritize token-saving and cost-safe workflows.

## Files Copilot Should Read

When working on Holiday Planner:
- AGENTS.md
- README.md
- projects/holiday-planner/README.md
- projects/holiday-planner/PRD.md
- projects/holiday-planner/BOT_SPEC.md
- projects/holiday-planner/TASKS.md
- projects/holiday-planner/prompts/today-plan-bot.md
- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

## Files Copilot May Create or Edit

- .github/copilot-instructions.md
- .github/ISSUE_TEMPLATE/copilot-task.md
- projects/holiday-planner/TASKS.md
- projects/holiday-planner/TRIP_DAY_MAPPING.md
- projects/holiday-planner/test-output/*.md
- notes/day-*.md

## Files Copilot Must NOT Edit

- projects/holiday-planner/sample-data/austria-13-day-sanitized.md
- projects/holiday-planner/sample-data/DATA_CLEANING_LOG.md
- LICENSE
- .gitignore

## Safety Rules

- Never store API keys in the repository.
- Never upload private booking details, passport details, payment details, or personal travel information.
- Prefer sample, fake, or sanitized itinerary data.
- Do not add paid APIs unless explicitly requested.
- Do not build broad features unless they are listed in TASKS.md.
- Use dry-run workflows before automation.

## Quality Standards

- Use descriptive commit messages.
- Keep changes focused and minimal.
- Test manually before submitting.
- Document assumptions clearly.
- Preserve existing formatting and structure.

## Working with the Holiday Planner

When creating test outputs or prompts:
- Use the Austria itinerary dataset as the sole source of truth.
- Do not invent opening hours, prices, or live transport details.
- If information is not in the dataset, say so.
- Tell users to verify live information before traveling.
- Keep responses concise and practical.
- Use the structured output format defined in BOT_SPEC.md.

## For Parked Projects

Do not work on:
- Talent Acquisition automation lab
- Finance modeller
- Corporate language autocorrect
- Daily habit tracker

Unless explicitly requested.

## Questions?

Refer to AGENTS.md, the project README, or task definitions in TASKS.md before proceeding.
