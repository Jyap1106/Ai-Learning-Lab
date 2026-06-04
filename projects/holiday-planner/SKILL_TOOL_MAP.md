# Skill and Tool Map: Holiday Companion Bot

## Purpose

This file maps the skills and future tools needed for the Holiday Companion Bot.

The goal is to understand how AI tools, skills, prompts, and `.md` files work together.

## Simple Definitions

## Prompt

A prompt tells the AI how to respond.

Example:

```text
You are a Holiday Companion Bot. Use only the itinerary dataset as the source of truth.
```

## Skill

A skill is a reusable capability.

Example:

```text
Summarize today's plan.
```

## Tool

A tool is a callable action or function.

Example:

```text
get_day_plan(day_number)
```

## Workflow

A workflow is a sequence of steps.

Example:

```text
User asks for change → bot proposes change → user confirms → backend saves update
```

## State

State is the saved information the product uses.

Example:

```text
The current version of the itinerary.
```

## `.md` File

A `.md` file is a Markdown file used to store instructions, product plans, prompts, workflows, notes, and reusable AI context.

Example:

```text
BOT_SPEC.md
PRD.md
EDIT_WORKFLOW.md
```

## Current Skills

## Skill 1: Read Itinerary

Purpose:

Read the current itinerary state or dataset.

Current learning source:

- sample-data/austria-13-day-sanitized.md

Future tool:

```text
get_itinerary_state(trip_id)
```

## Skill 2: Find Current Day

Purpose:

Identify which itinerary day the user is asking about.

Example question:

```text
What is today's plan? I am on Day 2.
```

Future tool:

```text
get_day_plan(trip_id, day_number)
```

## Skill 3: Summarize Today's Plan

Purpose:

Turn a full day itinerary into a practical travel briefing.

Output should include:

- Quick summary
- Main highlights
- Food ideas
- Transport notes
- Things to prepare
- Verify live

Future tool:

```text
summarize_day_plan(day_plan)
```

## Skill 4: Answer Food Questions

Purpose:

Extract food, cafe, bakery, restaurant, and snack ideas from the itinerary.

Example question:

```text
What food is planned today?
```

Future tool:

```text
get_food_options(trip_id, day_number)
```

## Skill 5: Answer Transport Questions

Purpose:

Extract transport notes without inventing exact routes or live transport details.

Example question:

```text
What transport notes should I know today?
```

Future tool:

```text
get_transport_notes(trip_id, day_number)
```

## Skill 6: Make Day Lighter

Purpose:

Suggest a lighter version of a day.

Example question:

```text
Make Day 2 less packed.
```

The bot should propose a lighter plan, not silently change the itinerary.

Future tool:

```text
propose_lighter_day(trip_id, day_number)
```

## Skill 7: Remove Activity

Purpose:

Propose removing an activity from the itinerary.

Example:

```text
Remove Schönbrunn from Day 2.
```

Future tool:

```text
propose_remove_activity(trip_id, day_number, activity_id)
```

## Skill 8: Replace Activity

Purpose:

Propose replacing one activity with another.

Example:

```text
Replace Upper Belvedere with a relaxed food-focused activity.
```

Future tool:

```text
propose_replace_activity(trip_id, day_number, old_activity_id, replacement_request)
```

## Skill 9: Add Activity

Purpose:

Propose adding an activity to a day.

Example:

```text
Add a cafe break to Day 2.
```

Future tool:

```text
propose_add_activity(trip_id, day_number, new_activity)
```

## Skill 10: Reschedule Activity

Purpose:

Propose moving an activity to another day or time.

Example:

```text
Move Karlskirche to tomorrow.
```

Future tool:

```text
propose_reschedule_activity(trip_id, activity_id, target_day)
```

## Skill 11: Ask for Confirmation

Purpose:

Ask the user before saving itinerary changes.

The bot should say:

```text
Do you want me to apply this change to the itinerary?
```

Future tool:

```text
request_user_confirmation(patch_id)
```

## Skill 12: Save Confirmed Change

Purpose:

Save the update only after user confirmation.

Future tool:

```text
apply_confirmed_patch(trip_id, patch_id)
```

## Skill 13: Version History

Purpose:

Track what changed.

Future tool:

```text
get_version_history(trip_id)
```

## Skill 14: Share Itinerary

Purpose:

Create or prepare a shareable itinerary.

This is future work.

Future tool:

```text
generate_share_link(trip_id)
```

## Skill 15: Build Itinerary

Purpose:

Create a new itinerary from user preferences.

This is future work, not the current MVP.

Future tool:

```text
build_itinerary_from_preferences(user_preferences)
```

## Skill Categories

## Read Skills

- Read itinerary
- Find current day
- Summarize today's plan
- Answer food questions
- Answer transport questions

## Edit Skills

- Remove activity
- Replace activity
- Add activity
- Reschedule activity
- Make day lighter

## Save Skills

- Ask for confirmation
- Save confirmed change
- Track version history

## Future Skills

- Build itinerary
- Share itinerary
- Learn preferences
- Suggest future plans
- Use live APIs

## Future Tool List

Possible future tool functions:

```text
get_itinerary_state(trip_id)
save_itinerary_state(trip_id, updated_state)
get_day_plan(trip_id, day_number)
find_activity(trip_id, activity_name)
create_itinerary_patch(change_request)
preview_itinerary_patch(patch_id)
apply_confirmed_patch(patch_id)
reject_patch(patch_id)
get_version_history(trip_id)
restore_version(trip_id, version_id)
generate_share_link(trip_id)
```

## How `.md` Files Help

Markdown files help define the product before code exists.

Useful `.md` files include:

```text
README.md
PRD.md
BOT_SPEC.md
TASKS.md
ROADMAP.md
ITINERARY_STATE_MODEL.md
EDIT_WORKFLOW.md
AI_TOOL_BACKBONE.md
SKILL_TOOL_MAP.md
```

These files act as:

- Memory for the project
- Instructions for AI assistants
- Product documentation
- Future engineering guidance
- Prompt context
- Portfolio evidence

## Key Lesson

An AI product is not just one chatbot.

An AI product is a system of:

```text
User flow
Prompt
Skills
Tools
State
Backend
Safety rules
UI
Evaluation
```
