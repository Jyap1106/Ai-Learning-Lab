# Day 15 Notes: Product Vision and MVP Scope

## What I worked on today

Today I turned the Holiday Companion Bot idea into a clearer product vision and MVP scope.

The goal was to define what the product should become and what the first useful version should include.

## Files Created

Today I created:

- projects/holiday-planner/PRODUCT_VISION.md
- projects/holiday-planner/MVP_SCOPE.md

## Core Product Direction

The product is:

```text
Holiday Companion Bot
```

The product should eventually become:

```text
Itinerary builder + trip companion + itinerary editor
```

## Main User

The first user is me.

After the product works for me, it can later expand to:

- Friends and family
- General travellers
- Travel planners or agencies
- Content creators

## Main Use Timeline

The product should support:

## Before the Trip

The user creates or imports an itinerary.

## During the Trip

The user checks today's plan, asks questions, and edits the itinerary when plans change.

## After the Trip

The user saves and shares the final itinerary.

## MVP Focus

The MVP should focus on one trip first.

The current working example is:

```text
Austria trip
```

The product should not try to support every future trip immediately.

## MVP Core Loop

The MVP should prove this loop:

```text
Open itinerary
↓
Understand today
↓
Ask for change
↓
Preview alternatives
↓
Confirm
↓
Save updated plan
```

## Important Product Decisions

The home screen should focus on:

- Today's plan
- Chat assistant at the bottom
- Trip dashboard on the right
- Create new trip option as a secondary action

Today's plan should include:

- Main activities
- Food or cafe suggestions
- Transport notes

The bot should support:

- User edits
- Bot-assisted edits
- 2 to 3 alternative suggestions
- Relax/free-time option
- Version control
- Save confirmed changes

## Low-Credit Build Strategy

Since Vercel/v0 credits are limited, the first prototype should be frontend-only.

It can use:

- Static itinerary JSON
- Local state
- localStorage
- Mock chat behavior
- Manual confirm/reject flow

Real AI calls and backend storage can come later.

## Key Lesson

A strong AI product starts with product clarity.

Before generating the app, I need to define:

- User
- Use case
- MVP scope
- Product flow
- State
- Edit behavior
- Save behavior
- What is future

## Next Step

The next useful file is:

```text
projects/holiday-planner/UI_SPEC.md
```

This will define the first product interface before using Vercel, Cursor, Copilot, or manual coding.
