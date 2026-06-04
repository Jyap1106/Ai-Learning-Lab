# AI Tool Backbone: Holiday Companion Bot

## Purpose

This file explains the backbone of the Holiday Companion Bot.

The goal is to understand how an AI product is structured before building the final app.

This is not app code yet. It is the product architecture and AI system design.

## Product Goal

The Holiday Companion Bot should help a user:

- Build an itinerary
- Check today's plan
- Check tomorrow's plan
- Ask food, transport, and activity questions
- Make the itinerary lighter if needed
- Remove, replace, add, or reschedule activities
- Confirm changes before saving
- Save the updated itinerary
- Share the itinerary later

## Core Product Flow

```text
User opens product
↓
Product loads saved itinerary state
↓
User asks a question or gives a command
↓
AI classifies the intent
↓
AI retrieves the relevant itinerary information
↓
AI responds or proposes a change
↓
User confirms if it is an edit
↓
Backend saves the updated itinerary state
↓
Future answers use the updated itinerary
```

## Backbone Components

The product backbone has these parts:

1. User interface
2. AI prompt layer
3. Intent classification
4. Skills
5. Tools or actions
6. Itinerary state
7. Backend storage
8. Safety rules
9. Testing and evaluation

## 1. User Interface

The user interface is what the user sees.

Possible future UI elements:

- Chat box
- Today's plan card
- Tomorrow's plan card
- Full itinerary view
- Proposed change preview
- Confirm change button
- Reject change button
- Share itinerary button

The first UI does not need to be complex.

The simplest version could be:

```text
Left side: itinerary
Right side: chat assistant
Bottom: proposed changes and confirm button
```

## 2. AI Prompt Layer

The prompt layer tells the AI how to behave.

Current prompt files:

- prompts/today-plan-bot.md
- prompts/itinerary-planner.md
- prompts/multi-intent-trip-bot.md
- prompts/itinerary-edit-bot.md

The prompt layer controls:

- Bot role
- Source of truth
- Response format
- Safety rules
- When to ask clarification
- How to propose changes
- What not to invent

## 3. Intent Classification

Intent classification means the bot first decides what kind of request the user is making.

Example:

```text
User: What is today's plan?
Intent: Today's plan
```

```text
User: Add a cafe break to Day 2.
Intent: Add activity
```

```text
User: Replace Upper Belvedere with something lighter.
Intent: Replace activity
```

Supported intents:

- Today's plan
- Tomorrow's plan
- Specific day lookup
- Food question
- Transport question
- Preparation question
- Tired-mode question
- Remove activity
- Replace activity
- Add activity
- Reschedule activity
- Summarize full itinerary
- Share itinerary
- Clarification needed

## 4. Skills

A skill is a reusable ability the AI system can perform.

Example skills:

- Read itinerary
- Find current day
- Summarize day
- Extract food options
- Extract transport notes
- Suggest lighter day
- Propose activity removal
- Propose activity replacement
- Propose activity addition
- Propose reschedule
- Ask for confirmation
- Save confirmed change
- Summarize updated itinerary

Skills are not always code yet.

At the planning stage, skills can be described in `.md` files so the AI system has clear behavior.

## 5. Tools or Actions

A tool is something the AI can call to perform an action.

Future tools could include:

```text
get_itinerary_state()
get_day_plan(day_number)
find_activity(activity_name)
propose_itinerary_patch(change_request)
apply_confirmed_patch(patch_id)
save_itinerary_state()
get_version_history()
generate_share_link()
```

In the current learning stage, these tools are only concepts.

Later, they can become backend functions or API endpoints.

## 6. Itinerary State

Itinerary state is the current saved version of the trip.

The bot reads itinerary state when answering questions.

The backend updates itinerary state only after the user confirms a change.

Current learning file:

- sample-data/austria-13-day-sanitized.md

Future product storage could be:

- JSON
- Database
- Backend API
- Local storage
- User account storage

## 7. Backend Storage

The backend is where the product saves the itinerary.

The backend should eventually support:

- Create itinerary
- Read itinerary
- Update itinerary
- Save version history
- Restore previous version
- Share itinerary

For now, backend storage is only a design topic.

No paid API or database is needed yet.

## 8. Safety Rules

The bot should follow these safety rules:

- Do not invent live information
- Do not invent opening hours
- Do not invent prices
- Do not invent transport disruptions
- Do not silently update the itinerary
- Ask for confirmation before saving edits
- Keep private travel data out of public files
- Keep the Austria dataset protected
- Label live details under "Verify Live"

## 9. Testing and Evaluation

Testing is still important, but it does not need to happen every day.

Testing can be grouped into checkpoint days.

Checkpoint tests should check:

- Can the bot answer today's plan?
- Can the bot answer tomorrow's plan?
- Can the bot answer food questions?
- Can the bot propose itinerary edits?
- Does the bot ask for confirmation?
- Does the bot avoid unsupported facts?
- Does the bot separate saved itinerary from live information?

## Current Project Files

Important files:

- README.md
- PRD.md
- BOT_SPEC.md
- ROADMAP.md
- TASKS.md
- ITINERARY_STATE_MODEL.md
- EDIT_WORKFLOW.md
- prompts/multi-intent-trip-bot.md
- prompts/itinerary-edit-bot.md
- sample-data/austria-13-day-sanitized.md

## What This Teaches

This project teaches the backbone of AI products:

```text
Prompt + state + skills + tools + workflow + backend + safety
```

A useful AI product is not just one prompt.

A useful AI product needs:

- Clear context
- Clear data
- Clear state
- Clear actions
- Clear safety rules
- Clear user flow
- Clear save behavior
