# Cost-Safe Prototype Plan

## Purpose

This file defines how to build the first Holiday Companion Bot prototype while minimizing AI credits, avoiding unnecessary generation, and keeping the MVP focused.

The goal is to avoid asking an AI builder to generate the whole dream product too early.

## Core Strategy

The first prototype should be:

```text
Frontend-only
Local-state first
Mock chat first
No backend
No database
No paid APIs
No real AI calls yet
```

This helps prove the product experience before spending credits on full app generation or real AI integration.

## Why This Matters

AI app builders can burn credits quickly when the task is broad.

Bad prompt:

```text
Build the whole Holiday Companion Bot with AI, backend, database, sharing, editing, itinerary builder, and live APIs.
```

Better prompt:

```text
Build a frontend-only prototype with local mock data, today's plan card, chat assistant, proposed change preview, and confirm/reject behavior.
```

The second prompt is cheaper, clearer, and more likely to succeed.

## Current Product Goal

The Holiday Companion Bot should eventually help users:

- Build an itinerary
- Check today's plan
- Check tomorrow's plan
- Ask travel questions
- Propose itinerary changes
- Confirm or reject changes
- Save updated itinerary state
- Track version history
- Share itinerary later

## Current MVP Goal

The first prototype should only prove:

- User can see today's plan
- User can see tomorrow's plan
- User can see trip dashboard
- User can interact with a mock chat assistant
- User can request a mock itinerary change
- User can confirm or reject the proposed change
- App can update local state
- App can simulate saving locally

## MVP Build Constraints

Do not build these in the first prototype:

- Real AI API calls
- Backend
- Database
- Authentication
- User accounts
- Real sharing links
- Live maps
- Live weather
- Real-time transport
- Booking integrations
- Payment
- Multi-user features
- Full itinerary generation from scratch
- Multi-trip system

## What To Build First

Build only these sections:

1. Header
2. Today's Plan card
3. Tomorrow's Plan card
4. Trip Dashboard
5. Full Itinerary preview
6. Chat Assistant
7. Quick Prompt Chips
8. Proposed Change card
9. Confirm / Reject buttons
10. Version Summary
11. Save Status label
12. Create New Trip placeholder
13. Share Preview placeholder

## What Can Be Mocked

Mock these features:

- Chat responses
- Itinerary edit suggestions
- Save behavior
- Version history
- Share preview
- Create new trip modal

Mocking is good because it lets the product flow be tested before real AI and backend logic exist.

## What Should Use Local Data

Use local sample data for:

- Austria trip
- Current day
- Tomorrow's plan
- Itinerary days
- Food suggestions
- Transport notes
- Version history
- Proposed changes

## Recommended Build Order

## Step 1: Create Static Data

Create or use a local itinerary object.

Example future file:

```text
sample-data/austria-itinerary-state-sample.json
```

This should be a simplified structured version of the Austria itinerary.

## Step 2: Build UI Shell

Build the layout from:

```text
UI_SPEC.md
```

The UI shell should include:

- Header
- Today's Plan
- Tomorrow's Plan
- Trip Dashboard
- Chat Assistant
- Proposed Change Card

## Step 3: Add Local State

Add state for:

```text
currentTrip
currentDay
itineraryDays
selectedDay
chatMessages
proposedChange
saveStatus
versionHistory
```

## Step 4: Add Mock Chat Behavior

Use predefined responses for common prompt chips.

Example prompt chips:

```text
What's today's plan?
What is tomorrow's plan?
What food is planned today?
What can I skip if I am tired?
Make today lighter
Add a cafe break
Replace an activity
```

## Step 5: Add Proposed Change Behavior

When user clicks or asks for an edit, create a proposed change object.

Do not update the itinerary yet.

## Step 6: Add Confirm / Reject

Confirm behavior:

```text
Apply proposed change
Update local state
Add version history entry
Set save status to saved locally
Clear proposed change
```

Reject behavior:

```text
Clear proposed change
Do not update itinerary
Set save status to rejected or unchanged
```

## Step 7: Add localStorage

Save updated itinerary locally after confirmation.

Suggested key:

```text
holiday_companion_current_trip
```

Version history key:

```text
holiday_companion_version_history
```

## Step 8: Add Reset Button

Add a simple reset action.

Behavior:

```text
Clear localStorage
Reload sample itinerary
Reset version history
```

## Step 9: Add Future Placeholders

Add placeholders for:

- Create New Trip
- Share Preview
- Real AI later
- Backend later

## Low-Credit AI Usage Plan

Use AI only for small focused tasks.

Good AI tasks:

```text
Create TodayPlanCard component.
Create ProposedChangeCard component.
Create mock itinerary data object.
Create localStorage helper functions.
Create confirm/reject behavior.
Create prompt chip handler.
```

Bad AI tasks:

```text
Build the whole product.
Add backend, database, AI, sharing, and maps.
Make it production-ready.
```

## Best Tool Strategy

## Manual

Use manual editing for:

- Markdown specs
- Product decisions
- Small corrections
- Task tracking

## ChatGPT

Use for:

- Product specs
- Prompts
- Component planning
- Code snippets
- Debugging explanations

## Cursor or Copilot

Use for:

- Editing specific files
- Creating components
- Small code changes
- Refactors with strict scope

## v0 or Vercel AI Builder

Use only after:

- UI_SPEC.md is ready
- DATA_LOADING_PLAN.md is ready
- CHAT_BEHAVIOR_SPEC.md is ready
- Vercel build prompt is ready

Use it for:

```text
frontend shell only
```

Do not use it for:

```text
full-stack app
real AI
database
auth
maps
weather
sharing
```

## First Build Prompt Should Reference

Use these files as source context:

```text
PRODUCT_VISION.md
MVP_SCOPE.md
UI_SPEC.md
DATA_LOADING_PLAN.md
CHAT_BEHAVIOR_SPEC.md
```

Do not include every repo file.

This reduces context usage.

## First Prototype Success Criteria

The first prototype succeeds if it can:

- Load local sample itinerary
- Show today's plan
- Show tomorrow's plan
- Show trip dashboard
- Show chat assistant
- Show quick prompt chips
- Generate mock response
- Show proposed change
- Confirm or reject change
- Update local state
- Show saved locally status
- Show basic version summary

## What To Avoid

Avoid these until later:

- Real AI calls
- Real backend
- Real database
- Authentication
- Payment
- Maps
- Weather
- Live transport
- Booking integrations
- Upload/import
- Social sharing
- Full RAG

## When To Add Real AI

Add real AI only after:

- UI works
- Local state works
- Confirm/reject works
- Data loading works
- Mock chat flow works
- Cost and API safety plan is written

## When To Add Backend

Add backend only after:

- localStorage prototype works
- itinerary state shape is stable
- save behavior is clear
- version history is clear
- user actually needs cross-device persistence

## When To Add Sharing

Add sharing only after:

- saved itinerary state works
- share preview design works
- private data filtering is clear
- user confirms sharing behavior

## Cost-Safe Build Principle

Build the smallest useful prototype first.

The first version should prove product behavior, not technical completeness.

## Key Lesson

A low-credit MVP should be built in layers:

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

This protects credits and helps avoid messy generation.
