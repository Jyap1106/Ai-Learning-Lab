# Day 9 Notes: Itinerary Edit Command Testing

## What I worked on today

Today I tested whether the Holiday Companion Bot can handle itinerary edit commands.

The goal was not to actually save changes yet.

The goal was to check whether the bot can:

- Understand the edit request
- Identify the affected day
- Identify the affected activity
- Propose a change
- Ask for confirmation
- Avoid claiming the itinerary has already been updated

## Why This Matters

A real itinerary product must be flexible.

A static bot can answer:

```text
What is today's plan?
```

But a useful travel product should also handle:

```text
Remove this activity.
Replace this with something lighter.
Add a cafe break.
Move this to tomorrow.
Make today less packed.
```

This requires the bot to understand itinerary state and edit workflows.

## Source of Truth

The current protected learning dataset is:

```text
projects/holiday-planner/sample-data/austria-13-day-sanitized.md
```

This file is used for testing.

It should not be modified during edit-command tests.

## Edit Commands Tested

Today I tested these commands:

```text
Remove Schönbrunn from Day 2 and suggest a lighter replacement.
```

```text
Move Karlskirche to tomorrow. I am currently on Day 2.
```

```text
Make Day 2 less packed.
```

```text
Add one cafe break to Day 2.
```

```text
Replace Upper Belvedere with a relaxed food-focused activity.
```

## What I Learned

For itinerary edit requests, the bot should not immediately make changes.

The safe workflow is:

1. User asks for change.
2. Bot detects edit type.
3. Bot identifies affected day and activity.
4. Bot proposes a change.
5. Bot explains impact.
6. Bot asks for confirmation.
7. Backend saves only after confirmation.

## Edit Types

The current edit types are:

- Remove activity
- Replace activity
- Add activity
- Reschedule activity
- Make day lighter

## Confirmation Rule

The bot should not say:

```text
Your itinerary has been updated.
```

unless the user confirms and the backend actually saves the update.

The bot should say:

```text
Here is the proposed change.
Do you want me to apply it?
```

## What Worked

- The bot can propose lighter-day changes.
- The bot can suggest replacement activity types.
- The bot can use food and cafe notes from the itinerary.
- The bot can separate proposed changes from live details to verify.
- The bot can ask for confirmation.

## What Needs Improvement

- The product needs a real saved itinerary state.
- The product needs backend save behavior.
- The product needs version history.
- The product needs UI confirmation behavior.
- The product needs a way to show before-and-after itinerary changes.

## Reflection

### 1. Which edit command felt most useful?

My answer:

### 2. Which edit command was hardest to handle?

My answer:

### 3. Why should the bot ask for confirmation before saving?

My answer:

### 4. What should version history track?

My answer:

### 5. What should the backend save after a confirmed change?

My answer:

## Next Step

The next step is to design backend save behavior.

Suggested file:

```text
projects/holiday-planner/BACKEND_SAVE_BEHAVIOR.md
```
