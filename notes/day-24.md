# Day 24 Notes: Local Prototype Implementation Plan

## What I worked on today

Today I created the implementation plan for the first local frontend prototype.

## File Created

Today I created:

- projects/holiday-planner/LOCAL_PROTOTYPE_IMPLEMENTATION_PLAN.md

## Core Concept

The first prototype should not build the whole final product.

It should prove the core loop:

```text
Load itinerary
↓
Show today
↓
Ask or edit
↓
Preview change
↓
Confirm
↓
Save locally
```

## Why This Matters

The product vision is large, but the first prototype should be small.

A small prototype is easier to build, cheaper to generate, and easier to debug.

## Recommended Prototype Stack

The recommended stack is:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Local JSON data
- localStorage

## Build Order

The safe build order is:

1. Project setup
2. Static data
3. AppShell
4. Header
5. TodayPlanCard
6. TomorrowPlanCard
7. TripDashboard
8. FullItineraryList
9. ChatAssistant
10. PromptChips
11. ProposedChangeCard
12. Confirm/reject behavior
13. localStorage
14. Placeholder modals
15. Polish

## Low-Credit Lesson

Do not ask AI to build the whole product.

Ask for small pieces.

Good examples:

```text
Build TodayPlanCard.
Build ProposedChangeCard.
Build localStorage helpers.
Build mock prompt chip handler.
```

## Next Step

The next step is to start building the local frontend prototype or create a final pre-build checklist.

Suggested file:

```text
projects/holiday-planner/BUILD_START_CHECKLIST.md
```
