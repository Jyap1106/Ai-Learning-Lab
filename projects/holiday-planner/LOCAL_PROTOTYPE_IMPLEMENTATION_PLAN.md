# Local Prototype Implementation Plan

## Purpose

This file defines the safest path to build the first Holiday Companion Bot frontend prototype.

The goal is to build the prototype in small, controlled steps without wasting AI credits.

## Prototype Goal

Build a frontend-only Holiday Companion Bot prototype that can:

- Load Austria sample itinerary state
- Show today's plan
- Show tomorrow's plan
- Show trip dashboard
- Show full itinerary list
- Show mock chat assistant
- Show quick prompt chips
- Create proposed itinerary changes
- Confirm or reject changes
- Save confirmed changes locally
- Show version summary

## Build Principle

Do not build the whole product at once.

Build in layers:

```text
Project setup
↓
Static data
↓
Layout
↓
Cards
↓
Chat
↓
Proposed change
↓
Confirm/reject
↓
localStorage
↓
Polish
```

## Recommended Tech Stack

Use a simple frontend stack.

Suggested stack:

```text
Next.js
React
TypeScript
Tailwind CSS
local JSON data
localStorage
```

No backend is needed for the first version.

## Step 1: Create Project

Create a frontend app.

Possible project setup:

```text
Next.js app
TypeScript enabled
Tailwind enabled
App Router acceptable
```

Keep setup simple.

## Step 2: Add Local Data

Use:

```text
sample-data/austria-itinerary-state-sample.json
```

The frontend should import or copy this into a local data file.

Example app location:

```text
src/data/austriaItineraryState.ts
```

or:

```text
app/data/austriaItineraryState.ts
```

## Step 3: Define Types

Create simple TypeScript types.

Suggested types:

```text
TripState
TripDay
VersionHistoryEntry
ChatMessage
ProposedChange
SaveStatus
```

## Step 4: Build AppShell

AppShell should control:

- Layout
- Current trip state
- Current day
- Proposed change
- Chat messages
- Save status
- Version history

## Step 5: Build Header

Header should show:

- Product name
- Trip name
- Current day
- Save status
- Create New Trip button
- Share Preview button

## Step 6: Build TodayPlanCard

TodayPlanCard should show:

- Day number
- City
- Theme
- Morning
- Afternoon
- Evening
- Food
- Transport
- Quick actions

## Step 7: Build TomorrowPlanCard

TomorrowPlanCard should show:

- Tomorrow day number
- City
- Theme
- Main activities summary
- Food summary
- Transport summary

## Step 8: Build TripDashboard

TripDashboard should show:

- Trip name
- Destination
- Duration
- Current day
- Save status
- Version count
- Upcoming days

## Step 9: Build FullItineraryList

FullItineraryList should show:

- Day number
- City
- Theme
- Edited status

Clicking a day can select it.

## Step 10: Build ChatAssistant

ChatAssistant should include:

- Message list
- Input box
- Prompt chips

For MVP, prompt chips can drive mock behavior.

## Step 11: Build Prompt Chips

Initial chips:

```text
What's today's plan?
What is tomorrow's plan?
What food is planned today?
What transport notes should I know?
What can I skip if I am tired?
Make today lighter
Add a cafe break
Replace an activity
```

## Step 12: Build Mock Chat Responses

Map chips to mock responses.

Example:

```text
What's today's plan? → summarize current day
What is tomorrow's plan? → summarize currentDay + 1
What food is planned today? → list current day food
Make today lighter → create proposed change
Add a cafe break → create proposed change
Replace an activity → create proposed change
```

## Step 13: Build ProposedChangeCard

ProposedChangeCard should show:

- Detected intent
- Affected day
- Current item
- Proposed change
- Options
- Impact
- Confirm button
- Reject button

## Step 14: Confirm Change Behavior

When user confirms:

```text
Apply proposed change to local trip state
Add version history entry
Set save status to saved locally
Save to localStorage
Clear proposed change
Add assistant message
```

## Step 15: Reject Change Behavior

When user rejects:

```text
Clear proposed change
Do not modify itinerary
Add assistant message: No changes were saved
```

## Step 16: Add localStorage

Use localStorage keys:

```text
holiday_companion_current_trip
holiday_companion_version_history
```

Load order:

```text
Check localStorage
↓
If saved state exists, load it
↓
Else load sample state
```

## Step 17: Add Reset Button

Add a reset action.

Behavior:

```text
Clear localStorage
Reload sample itinerary state
Reset version history
```

## Step 18: Add Placeholder Modals

Add placeholders for:

- Create New Trip
- Share Preview

These should not perform real actions yet.

## Step 19: Polish Layout

Improve:

- Spacing
- Card hierarchy
- Mobile stacking
- Button labels
- Empty states
- Save status visibility

## Step 20: Final Manual Check

Check that:

- App loads
- Today's plan appears
- Tomorrow's plan appears
- Trip dashboard appears
- Prompt chips work
- Proposed change appears
- Confirm updates local state
- Reject does not update state
- Version history updates
- Save status changes

## What To Ask AI To Build

Good AI requests:

```text
Create the TodayPlanCard component.
Create the ProposedChangeCard component.
Create localStorage helper functions.
Create mock prompt chip handler.
Create TypeScript types for TripState and ProposedChange.
```

## What Not To Ask AI To Build

Avoid asking:

```text
Build the whole product.
Add real AI chat.
Add backend and database.
Make it production ready.
Add maps and weather.
```

## Suggested Manual / AI Split

## Manual

Do manually:

- Review generated files
- Control scope
- Copy sample data
- Check behavior
- Commit changes

## AI-Assisted

Ask AI for:

- Component scaffolds
- Type definitions
- State update functions
- Mock handlers
- UI polish

## Future Build Phases

## Phase 1: Local Prototype

- Static data
- Local state
- Mock chat
- Confirm/reject
- localStorage

## Phase 2: Real AI Chat

- Add API call
- Add prompt control
- Add usage limits
- Add cost safety

## Phase 3: Backend

- Save trips
- Save versions
- User accounts
- Share links

## Phase 4: Advanced Features

- RAG
- Live APIs
- Maps
- Weather
- Suggestion planning
- Multi-trip support

## Success Criteria

The local prototype is successful if:

- It works without backend
- It uses sample itinerary state
- It simulates the core product flow
- It demonstrates itinerary editing behavior
- It saves locally
- It avoids paid services
- It is understandable as a portfolio MVP

## Key Lesson

A strong prototype is not the final product.

A strong prototype proves the core loop:

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
