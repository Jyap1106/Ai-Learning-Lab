# Day 19 Notes: Cost-Safe Prototype Plan and Build Prompt

## What I worked on today

Today I created a cost-safe prototype plan and a controlled Vercel/v0 build prompt.

The goal was to prepare for a frontend prototype without wasting AI credits.

## Files Created

Today I created:

- projects/holiday-planner/COST_SAFE_PROTOTYPE_PLAN.md
- projects/holiday-planner/prompts/vercel-build-prompt.md

## Core Concept

A low-credit MVP should not ask AI to build the full product at once.

The safer build path is:

```text
Docs
↓
UI spec
↓
Static data
↓
Frontend shell
↓
Mock chat
↓
Local save
↓
Real AI later
↓
Backend later
```

## Why This Matters

AI app builders can burn credits when the task is too broad.

The first prototype should avoid:

- Real AI calls
- Backend
- Database
- Authentication
- Paid APIs
- Maps
- Weather
- Real sharing

## First Prototype Direction

The first prototype should be:

- Frontend-only
- Local data
- Mock chat responses
- Confirm/reject behavior
- localStorage if possible
- No backend
- No real AI

## What the Build Prompt Should Do

The build prompt should ask for:

- Today's plan card
- Tomorrow's plan card
- Trip dashboard
- Chat assistant
- Quick prompt chips
- Proposed change card
- Confirm/reject buttons
- Version summary
- Save status
- Create new trip placeholder
- Share preview placeholder

## Key Lesson

A good build prompt saves credits because it tells the AI builder exactly what to create and what not to create.

The goal is not to build the final product in one generation.

The goal is to build the smallest useful prototype first.

## Next Step

The next file should define retrieval strategy.

Suggested file:

```text
projects/holiday-planner/RETRIEVAL_STRATEGY.md
```
