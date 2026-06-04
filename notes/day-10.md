# Day 10 Notes: Backend Save Behavior

## What I worked on today

Today I designed how the Holiday Companion Bot should save confirmed itinerary changes in a future product.

The focus was backend save behavior.

## Files Created

Today I created:

- projects/holiday-planner/BACKEND_SAVE_BEHAVIOR.md

## Core Concept

A useful AI product does not only generate answers.

It must know how to save important changes safely.

For the Holiday Companion Bot, this means:

```text
User requests change
↓
Bot proposes change
↓
User confirms
↓
Backend saves update
↓
Future answers use the updated itinerary
```

## Why This Matters

If the bot can only suggest changes, it is still mostly a chatbot.

If the product can save confirmed changes, it becomes a real itinerary management tool.

## Save Flow

The safe save flow is:

1. User asks for a change.
2. Bot proposes an itinerary patch.
3. User confirms the patch.
4. Backend validates the patch.
5. Backend saves the updated itinerary state.
6. Backend records version history.
7. Bot summarizes the updated itinerary.

## Important Rule

The bot should not say:

```text
Your itinerary has been updated.
```

unless the user has confirmed the change and the backend has saved it.

Before confirmation, the bot should say:

```text
Here is the proposed change.
Do you want me to apply it?
```

## Save States

The future product should understand these states:

- proposed
- confirmed
- saving
- saved
- rejected
- failed

These states help avoid confusion.

## MVP Storage Direction

The product does not need a database immediately.

The safer build path is:

```text
Markdown dataset
↓
JSON itinerary state sample
↓
Local state in prototype
↓
Backend API later
↓
Database later
```

## What I Learned

A real AI tool needs:

- Prompt behavior
- Itinerary state
- Confirmation workflow
- Backend save logic
- Version history
- Error handling
- Future sharing rules

This is the backbone that turns an AI assistant into a product.

## How This Helps the Final Product

The final Holiday Companion Bot should be able to:

- Load the saved itinerary
- Answer trip questions
- Propose itinerary changes
- Save confirmed changes
- Preserve version history
- Use the updated itinerary for future answers
- Prepare for sharing later

## Next Step

The next step is to design version history.

Suggested file:

```text
projects/holiday-planner/VERSION_HISTORY.md
```
