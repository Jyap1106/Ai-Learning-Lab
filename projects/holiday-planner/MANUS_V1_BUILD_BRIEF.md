# Manus V1 Build Brief: Holiday Companion Bot

## Build Target

Build V1 of the Holiday Companion Bot.

V1 is a frontend-only local MVP for the Austria trip.

Do not build the full future product.

## Product Summary

Holiday Companion Bot helps users manage a flexible travel itinerary.

V1 should let the user:

- View today's plan
- View tomorrow's plan
- See a trip dashboard
- View a full itinerary preview
- Use mock chat prompt chips
- Preview proposed itinerary changes
- Confirm or reject changes
- Save confirmed changes locally
- See a version summary

## Data Source

Use local sample data only.

Use this file:

- projects/holiday-planner/sample-data/austria-itinerary-state-sample.json

Do not parse or modify this file:

- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

## V1 Scope

Build:

- Header
- Today's Plan card
- Tomorrow's Plan card
- Trip Dashboard
- Full Itinerary List
- Chat Assistant
- Prompt Chips
- Proposed Change Card
- Confirm / Reject buttons
- Version Summary
- Save Status
- Create New Trip placeholder
- Share Preview placeholder

## V1 Exclusions

Do not build:

- Real AI calls
- Backend
- Database
- Authentication
- User accounts
- Maps
- Weather
- Live transport
- Booking integrations
- Real share links
- PDF export
- Multi-trip management
- Full RAG

## Layout

Desktop layout:

- Header at the top
- Main content on the left
- Trip dashboard on the right
- Chat assistant near the bottom
- Proposed change preview near chat

Mobile layout:

- Header
- Today's Plan
- Tomorrow's Plan
- Chat Assistant
- Proposed Change Preview
- Trip Dashboard
- Full Itinerary Preview

## Required State

The app should manage:

- currentTrip
- days
- currentDay
- selectedDay
- chatMessages
- proposedChange
- saveStatus
- versionHistory
- showCreateTripModal
- showSharePreview

## Prompt Chips

Add these prompt chips:

- What's today's plan?
- What is tomorrow's plan?
- What food is planned today?
- What transport notes should I know?
- What can I skip if I am tired?
- Make today lighter
- Add a cafe break
- Replace an activity

## Mock Chat Behavior

Do not use real AI.

Use mock responses.

When user clicks "What's today's plan?", summarize current day.

When user clicks "What is tomorrow's plan?", summarize currentDay + 1.

When user clicks "What food is planned today?", list current day's food.

When user clicks "What transport notes should I know?", list current day's transport.

When user clicks "Make today lighter", create a proposed change.

When user clicks "Add a cafe break", create a proposed change.

When user clicks "Replace an activity", create a proposed change.

## Proposed Change Behavior

The Proposed Change Card should show:

- Detected intent
- Affected day
- Current item
- Proposed options
- Impact on the day
- Confirm button
- Reject button

For replacement actions, show three options:

1. Relaxed cafe break
2. Short scenic walk
3. Leave this time as relax/free time

## Confirm Behavior

When user confirms:

- Apply the proposed change to local state
- Mark affected day as edited
- Add a version history entry
- Set saveStatus to saved_locally
- Clear proposedChange
- Add assistant message saying the change was saved locally
- Save to localStorage if possible

## Reject Behavior

When user rejects:

- Clear proposedChange
- Do not update itinerary
- Add assistant message saying no changes were saved

## localStorage

Use localStorage if possible.

Keys:

- holiday_companion_current_trip
- holiday_companion_version_history

If localStorage is too much for the first build, use React state first and leave a TODO.

## Placeholders

Create New Trip placeholder:

"Create New Trip is a future feature. This V1 prototype uses the Austria sample trip."

Share Preview placeholder:

"Sharing is a future feature. A share preview will remove private details before sharing."

## Style

Use a clean, friendly travel dashboard style.

Make it readable and simple.

Avoid heavy animations.

## Acceptance Criteria

V1 is successful if:

- App loads
- Austria trip appears
- Today's plan appears
- Tomorrow's plan appears
- Trip dashboard appears
- Full itinerary list appears
- Prompt chips work
- Mock responses appear
- Proposed change card appears
- Confirm updates local state
- Reject keeps itinerary unchanged
- Save status updates
- Version summary updates
- Create New Trip placeholder works
- Share Preview placeholder works
- No real AI/backend/API is required
