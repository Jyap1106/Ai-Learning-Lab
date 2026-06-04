# Day 17 Notes: Data Loading Plan

## What I worked on today

Today I designed how the Holiday Companion Bot prototype should load itinerary data without using a backend, database, paid API, or real AI calls.

## File Created

Today I created:

- projects/holiday-planner/DATA_LOADING_PLAN.md

## Core Concept

The first prototype can use local data instead of a backend.

The data flow should be:

```text
Static sample itinerary
↓
Frontend app state
↓
localStorage after confirmed changes
```

## Why This Matters

The product needs to remember itinerary changes.

But it does not need a full backend immediately.

A frontend-only prototype can still prove the important behavior:

- Load itinerary
- Show today's plan
- Show tomorrow's plan
- Propose a change
- Confirm or reject the change
- Save updated state locally

## Static Data vs App State vs localStorage

## Static Data

Static data is the starting itinerary.

It can be loaded when the app first opens.

## App State

App state is the current version of the itinerary while the app is running.

## localStorage

localStorage saves the updated itinerary in the browser after the user confirms changes.

## MVP Direction

The MVP should use:

- Static sample data
- React/local app state
- localStorage
- Mock chat behavior
- No backend
- No database
- No paid APIs

## Key Product Lesson

A useful AI product needs state.

Without state, the bot can answer questions.

With state, the product can remember confirmed changes and use the updated itinerary later.

## Next Step

The next file should define chat behavior.

Suggested file:

```text
projects/holiday-planner/CHAT_BEHAVIOR_SPEC.md
```
