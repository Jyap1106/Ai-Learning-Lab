# Day 20 Notes: Retrieval Strategy

## What I worked on today

Today I designed how the Holiday Companion Bot should retrieve the right itinerary information before answering or proposing a change.

## File Created

Today I created:

- projects/holiday-planner/RETRIEVAL_STRATEGY.md

## Core Concept

Retrieval means finding the right part of the itinerary before answering.

The bot should not always read the whole itinerary.

It should retrieve only what is needed.

## Examples

For today's plan:

```text
Retrieve current day
```

For tomorrow's plan:

```text
Retrieve current day + 1
```

For food questions:

```text
Retrieve current day's food section
```

For edit requests:

```text
Retrieve affected day + affected activity
```

For cross-day questions:

```text
Retrieve compact summaries across days
```

## Why This Matters

Good retrieval helps reduce:

- Token usage
- Confusion
- Wrong answers
- Wrong activity edits
- Hallucinated details

Good retrieval also prepares the product for future RAG.

## MVP Retrieval

For the first prototype, retrieval can be simple.

Use:

- currentDay
- tomorrowDay
- selectedDay
- local itinerary state
- mock prompt chip handlers

No vector database is needed yet.

## Future Retrieval

Later, retrieval may become:

- Tool calls
- Backend functions
- RAG
- Search over itinerary state
- Search over user preferences
- Search over version history

## Key Lesson

Retrieval is the bridge between user intent and the right itinerary context.

The product should first understand the user's intent, then retrieve the smallest useful piece of itinerary state.
