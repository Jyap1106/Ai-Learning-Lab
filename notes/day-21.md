# Day 21 Notes: Local Itinerary State Sample

## What I worked on today

Today I created a simplified local itinerary state sample for the Holiday Companion Bot frontend prototype.

## File Created

Today I created:

- projects/holiday-planner/sample-data/austria-itinerary-state-sample.json

## Core Concept

The frontend app should not rely on parsing the full Markdown itinerary file.

The prototype needs structured app-readable data.

The local itinerary state sample acts as the starting data for the frontend MVP.

## Why This Matters

The product needs to load, edit, and save itinerary state.

A structured JSON-like state helps the future app show:

- Today's plan
- Tomorrow's plan
- Food ideas
- Transport notes
- Version history
- Proposed changes
- Save status

## Data Flow

The prototype data flow is:

```text
Static JSON sample
↓
Frontend local state
↓
User confirms changes
↓
localStorage saves updated state
```

## Important Rule

The large Markdown itinerary remains protected.

The JSON state sample is for frontend prototyping only.

## Next Step

The next step is to define the frontend component plan.

Suggested file:

```text
projects/holiday-planner/FRONTEND_COMPONENT_PLAN.md
```
