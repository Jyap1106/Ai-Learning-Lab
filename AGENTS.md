# AGENTS.md

## Repository Purpose

This repository documents my journey to become an AI-powered builder who understands tokens, repositories, AI tools, datasets, RAG, agents, automation, and deployment.

## Current Active Project

The current active project is:

- Holiday Companion Bot

The first MVP dataset is:

- Austria 13-day sanitized itinerary

The goal is to build a reusable travel companion system that can answer trip-related questions using structured itinerary datasets.

The bot should first work for the Austria trip, then later support other future trips by using the same dataset structure and prompt workflow.

## Product Direction

The Holiday Companion Bot should support two future modes:

### 1. Trip Companion Mode

This helps the user during an actual trip.

Example questions:

- What is today's plan?
- What should I prepare before leaving?
- What food options are planned today?
- What transport notes should I know?
- What can I skip if I am tired?
- What is tomorrow's plan?
- Which days involve intercity travel?
- Which days are best for cafes or museums?

### 2. Suggestion Planning Mode

This will be added later.

It may help the user create new itineraries by learning from past structured trip datasets.

Example questions:

- Suggest a 5-day version of this trip.
- Build a relaxed itinerary based on my past travel style.
- Recommend cafe-heavy days.
- Suggest a future Japan itinerary based on my Austria trip structure.

## Parked Projects

These projects are parked for now:

- Talent Acquisition automation lab
- Finance modeller
- Corporate language autocorrect
- Daily habit tracker

Do not treat parked projects as active unless I explicitly ask.

## How AI Assistants Should Work

Before doing any work:

1. Read this file first.
2. Read the root README.md.
3. Read only the project folder relevant to the task.
4. Summarize your understanding before suggesting changes.
5. Ask before editing files.
6. Do not scan the whole repository unless necessary.
7. Do not rewrite unrelated files.
8. Prefer small, controlled changes.
9. Keep explanations beginner-friendly.
10. Prioritize token-saving and cost-safe workflows.

## Current User Skill Level

The user can:

- Use AI tools to generate PRDs
- Use Vercel-style deployment workflows
- Create simple product designs in Visily
- Use ChatGPT, Claude, Cursor, Copilot, or similar tools for building
- Understand that repositories help agents, but wants to learn how to use them better

The user is still learning:

- Repository structure
- Token and context management
- Dataset preparation
- RAG
- How to control AI coding agents
- Cost-safe API usage
- Product documentation
- Building reusable AI systems

## Safety Rules

- Never store API keys in the repository.
- Never upload private booking details, passport details, payment details, or personal travel information.
- Prefer sample, fake, or sanitized itinerary data.
- Do not add paid APIs unless requested.
- Do not build broad features unless they are listed in TASKS.md.
- Use dry-run workflows before automation.
- Do not invent live information such as weather, opening hours, ticket availability, prices, or transport disruptions.

## Protected Source of Truth

The current protected dataset is:

- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

Do not modify this dataset unless the task is specifically about dataset cleaning or correction.

## Preferred Workflow

Use this workflow:

1. Understand the goal.
2. Read the relevant project README, PRD, BOT_SPEC, or TASKS file.
3. Break the work into small tasks.
4. Complete one task at a time.
5. Explain what changed.
6. Suggest the next small step.
