# Day 18 Notes: Chat Behavior Specification

## What I worked on today

Today I designed how the Holiday Companion Bot chat assistant should behave in the first frontend MVP.

## File Created

Today I created:

- projects/holiday-planner/CHAT_BEHAVIOR_SPEC.md

## Core Concept

The chat assistant should not start as a full AI chatbot.

The first version can use mock responses and quick prompt chips.

This helps prove the product experience before spending credits on real AI calls.

## Why This Matters

Real AI calls can be added later.

The first prototype should prove:

- User flow
- Chat layout
- Prompt chips
- Proposed change preview
- Confirm/reject behavior
- Local save behavior

This keeps the MVP cheaper and easier to control.

## Supported Chat Intents

The first chat assistant should support:

- Today's plan
- Tomorrow's plan
- Food question
- Transport question
- Tired-mode question
- Make day lighter
- Add activity
- Replace activity
- Reschedule activity
- Clarification needed

## Response Types

The MVP should support:

- read_only_answer
- suggestion_answer
- proposed_change
- clarification
- system_status

## Important Chat Rule

The chat assistant should not claim that the itinerary has been updated until the local itinerary state is actually updated.

Before saving, it should show:

```text
Proposed change
```

After confirmation and local save, it can show:

```text
Saved locally. Your itinerary has been updated in this prototype.
```

## Low-Credit Strategy

The first prototype should avoid real AI calls.

Use:

- Static sample data
- Mock responses
- Quick prompt chips
- Local state
- localStorage

This lets me build and test the product flow without burning API or v0 credits.

## How This Helps the Final Product

The chat assistant will eventually become the main control surface for the product.

It will allow the user to:

- Ask about today's plan
- Ask about tomorrow's plan
- Ask food and transport questions
- Request itinerary edits
- Confirm or reject proposed changes
- Save updated itinerary state

## Next Step

The next useful file is:

```text
projects/holiday-planner/prompts/vercel-build-prompt.md
```

That prompt will package the product specs into a controlled frontend-only build request.
