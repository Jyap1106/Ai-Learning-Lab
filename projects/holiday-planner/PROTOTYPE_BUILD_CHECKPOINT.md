# Prototype Build Checkpoint

## Purpose

This checkpoint confirms whether the Holiday Companion Bot repo is ready for the first frontend prototype build.

The goal is to avoid wasting AI credits by building before the product is clear.

## Build Target

The first prototype should be:

```text
Frontend-only Holiday Companion Bot MVP
```

It should use:

- Local sample itinerary state
- Mock chat behavior
- Confirm/reject proposed changes
- localStorage if simple
- No backend
- No database
- No authentication
- No paid APIs
- No real AI calls yet

## Files Required Before Build

## Product Direction

Required files:

- PRODUCT_VISION.md
- MVP_SCOPE.md
- PRD.md
- ROADMAP.md

Status:

```text
Ready
```

## Bot Behavior

Required files:

- BOT_SPEC.md
- prompts/multi-intent-trip-bot.md
- prompts/itinerary-edit-bot.md
- CHAT_BEHAVIOR_SPEC.md

Status:

```text
Ready
```

## State and Save Behavior

Required files:

- ITINERARY_STATE_MODEL.md
- BACKEND_SAVE_BEHAVIOR.md
- VERSION_HISTORY.md
- CONFIRMATION_FLOW.md
- DATA_LOADING_PLAN.md
- sample-data/austria-itinerary-state-sample.json

Status:

```text
Ready
```

## UI and Components

Required files:

- UI_SPEC.md
- FRONTEND_COMPONENT_PLAN.md

Status:

```text
Ready
```

## Cost-Safe Build

Required files:

- COST_SAFE_PROTOTYPE_PLAN.md
- prompts/vercel-build-prompt.md

Status:

```text
Ready
```

## Retrieval and Future AI

Required files:

- RETRIEVAL_STRATEGY.md
- SKILL_TOOL_MAP.md
- AI_TOOL_BACKBONE.md

Status:

```text
Ready
```

## Build Scope Confirmation

The first prototype should include:

- Header
- Today's plan card
- Tomorrow's plan card
- Trip dashboard
- Full itinerary list
- Chat assistant
- Quick prompt chips
- Proposed change card
- Confirm button
- Reject button
- Version summary
- Save status
- Share preview placeholder
- Create new trip placeholder

## What Must Not Be Built Yet

Do not build:

- Real AI chat
- Backend
- Database
- Authentication
- User accounts
- Real share links
- Maps
- Weather
- Live transport
- Booking integration
- Payment
- Multi-trip management
- Full RAG
- PDF export

## First Prototype Data Source

Use:

```text
sample-data/austria-itinerary-state-sample.json
```

Do not parse:

```text
sample-data/austria-13-day-sanitized.md
```

The Markdown itinerary should stay protected.

## First Prototype State

The app should support:

```text
currentTrip
days
currentDay
selectedDay
chatMessages
proposedChange
saveStatus
versionHistory
```

## First Prototype User Flow

The first prototype should support:

```text
User opens app
↓
App loads Austria sample state
↓
User sees today's plan
↓
User clicks a quick prompt chip
↓
App shows mock response
↓
User requests a change
↓
App shows proposed change
↓
User confirms or rejects
↓
App updates local state if confirmed
↓
Version summary updates
```

## Build Prompt Readiness

The build prompt is ready if it clearly says:

- Frontend-only
- Local mock data
- No backend
- No database
- No auth
- No API
- No real AI calls
- No maps
- No weather
- Use local state and optional localStorage

Status:

```text
Ready
```

## Recommended Build Method

Best low-credit build methods:

1. Manual build from component plan
2. Cursor or Copilot component-by-component
3. v0 only for frontend shell
4. No full product generation

## Suggested Build Order

Build in this order:

1. App shell and layout
2. Static data import
3. Today's plan card
4. Tomorrow's plan card
5. Trip dashboard
6. Full itinerary list
7. Chat assistant
8. Prompt chips
9. Proposed change card
10. Confirm/reject behavior
11. Version summary
12. localStorage

## Checkpoint Result

Status:

```text
Ready for frontend prototype build
```

Reason:

The repo now has product vision, MVP scope, UI spec, data loading plan, chat behavior spec, local itinerary state sample, component plan, and build prompt.

## Next Step

Proceed to Day 24:

```text
Local Prototype Implementation Plan
```

Suggested file:

```text
projects/holiday-planner/LOCAL_PROTOTYPE_IMPLEMENTATION_PLAN.md
```
