# Day 8 Notes: Editable Holiday Companion Bot Direction

## What I worked on today

Today I corrected the Holiday Companion Bot product direction.

The product should not only read a static itinerary.

The product should eventually help users:

- Build an itinerary
- Check today's plan
- Check tomorrow's plan
- Ask travel questions
- Remove activities
- Replace activities
- Add activities
- Reschedule activities
- Save confirmed changes
- Share the final itinerary
- Learn future preferences from saved trip behavior

## Important Product Correction

For now, I do not want to focus on adding other trip datasets.

Other trips are a future direction.

The current MVP should focus on one trip first:

- Austria trip

The goal is to build one flexible itinerary system well before expanding to other trips.

## New Product Direction

The product is:

- Holiday Companion Bot

The first working example is:

- Austria trip

The final product should not require me to manually edit a Markdown file like:

- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

That file is only learning scaffolding for now.

In the future product, the user should create and edit the itinerary inside the app.

## Future User Flow

The intended user flow is:

1. User opens the product.
2. Product loads the saved itinerary.
3. User checks today's or tomorrow's plan.
4. User asks to remove or replace an activity.
5. Bot proposes a change.
6. User confirms the change.
7. Backend updates the full itinerary.
8. Updated itinerary is saved.
9. Future bot answers use the updated itinerary.
10. Itinerary can later be shared or used for preference learning.

## What I created or updated

Today I created or updated:

- AGENTS.md
- projects/holiday-planner/README.md
- projects/holiday-planner/PRD.md
- projects/holiday-planner/BOT_SPEC.md
- projects/holiday-planner/prompts/multi-intent-trip-bot.md
- projects/holiday-planner/ITINERARY_STATE_MODEL.md
- projects/holiday-planner/EDIT_WORKFLOW.md
- projects/holiday-planner/prompts/itinerary-edit-bot.md
- projects/holiday-planner/ROADMAP.md
- projects/holiday-planner/TASKS.md

## What I Learned

A real AI product needs state.

A static bot can answer:

- What is today's plan?

A stateful product can handle:

- Remove this activity.
- Replace it with something lighter.
- Save the new plan.
- Show me tomorrow based on the updated itinerary.
- Share the final itinerary.

## Itinerary State

Itinerary state means the current saved version of the trip.

It should include:

- Trip details
- Day-by-day plan
- Activities
- Food
- Transport
- Notes
- User edits
- Version history
- Sharing status
- Preferences

## Why Confirmation Matters

The bot should not silently change the itinerary.

For edit requests, the workflow should be:

1. User asks for change.
2. Bot proposes change.
3. User confirms.
4. Backend saves update.
5. Bot summarizes updated plan.

This prevents bad or accidental edits.

## Reflection

### 1. Why is itinerary state important?

My answer:

### 2. Why should the bot propose changes before saving?

My answer:

### 3. What should stay manual during the MVP?

My answer:

### 4. What should the backend eventually save?

My answer:

### 5. What edit command should I test first?

My answer:

## Next Step

The next step is Day 9:

- Test itinerary edit commands manually.

The output should be saved in:

- projects/holiday-planner/test-output/itinerary-edit-command-tests.md
