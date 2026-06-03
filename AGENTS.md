# AGENTS.md

## Repository Purpose

This repository documents my journey to become an AI-powered builder who understands tokens, repositories, AI tools, datasets, RAG, agents, automation, deployment, and product thinking.

## Current Active Project

The current active project is:

- Holiday Companion Bot

The first working example is:

- Austria trip

The goal is to build a product that can help a user create, understand, edit, save, and eventually share a travel itinerary.

The Austria itinerary dataset is currently used as learning scaffolding and as the first source-of-truth sample. In the final product, the itinerary should be created and updated inside the product rather than manually edited in Markdown files.

## Product Direction

The Holiday Companion Bot should evolve into a product with these core modes:

### 1. Itinerary Builder Mode

The user can create a trip itinerary inside the product.

Example:

- I am going to Austria for 13 days.
- I like cafes, museums, scenic views, and relaxed pacing.
- Build me a flexible itinerary.

### 2. Trip Companion Mode

The user can check the plan during the trip.

Example questions:

- What is today's plan?
- What is tomorrow's plan?
- What should I prepare before leaving?
- What food is planned today?
- What transport notes should I know?
- What can I skip if I am tired?

### 3. Itinerary Edit Mode

The user can ask the system to change the itinerary.

Example commands:

- Remove this activity from today.
- Replace Schönbrunn with something lighter.
- Add a cafe break to the afternoon.
- Move this activity to tomorrow.
- Make today less packed.

The bot should propose the change first and ask for confirmation before saving.

### 4. Future Preference Memory Mode

Later, the system may learn from itinerary edits and user preferences.

Example preferences:

- User prefers cafes over packed museum days.
- User likes relaxed afternoons.
- User often wants lighter alternatives.
- User likes scenic routes and food stops.

This is a future direction, not the current MVP.

## Current MVP Focus

The current MVP should focus on one trip first:

- Austria trip

The MVP should support:

- Reading the saved itinerary
- Answering today and tomorrow questions
- Answering food, transport, and preparation questions
- Suggesting lighter alternatives
- Proposing itinerary edits
- Asking for confirmation before changes are saved
- Designing how updated itinerary state should be stored

Other trips and other itinerary datasets are future work, not the current focus.

## Parked Projects

These projects are parked for now:

- Talent Acquisition automation lab
- Finance modeller
- Corporate language autocorrect
- Daily habit tracker

Do not treat parked projects as active unless explicitly requested.

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
- Understand that repositories help agents, but wants to use them better

The user is still learning:

- Repository structure
- Token and context management
- Dataset preparation
- RAG
- Agentic workflows
- Product state
- Backend persistence
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
- Do not silently change itinerary state without user confirmation.

## Protected Source of Truth

The current protected learning dataset is:

- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

Do not modify this dataset unless the task is specifically about dataset cleaning or correction.

## Preferred Workflow

Use this workflow:

1. Understand the goal.
2. Read the relevant project README, PRD, BOT_SPEC, TASKS, or state model file.
3. Break the work into small tasks.
4. Complete one task at a time.
5. Explain what changed.
6. Suggest the next small step.
