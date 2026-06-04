# UI Specification: Holiday Companion Bot

## Purpose

This file defines the first user interface for the Holiday Companion Bot.

The goal is to design a clear MVP interface before generating or coding the app.

This spec should help future AI builders, Vercel/v0, Cursor, Copilot, or manual coding understand what to build without guessing.

## Product Summary

Holiday Companion Bot is an AI-assisted travel product that helps users:

- Build an itinerary
- Check today's plan
- Check tomorrow's plan
- Ask travel questions
- Edit activities
- Confirm or reject changes
- Save updated itinerary state locally
- Share the final itinerary later

The first MVP uses the Austria trip as the working example.

## UI Design Principle

The first UI should be simple, useful, and low-credit friendly.

Do not build a complicated full-stack product yet.

The MVP should be:

```text
Frontend-only
Local-state first
No backend
No database
No paid APIs
No real AI calls yet if credits are low
```

## Main Layout

The MVP interface should use a three-area layout.

```text
┌─────────────────────────────────────────────────────────────┐
│ Header                                                      │
├───────────────────────────────┬─────────────────────────────┤
│ Main Area                     │ Right Trip Dashboard        │
│                               │                             │
│ Today's Plan Card             │ Trip Overview               │
│ Tomorrow's Plan Card          │ Upcoming Days               │
│ Full Itinerary Preview        │ Version Summary             │
│                               │ Share Preview Entry         │
├───────────────────────────────┴─────────────────────────────┤
│ Chat Assistant                                               │
│ Proposed Change Preview                                      │
└─────────────────────────────────────────────────────────────┘
```

## Main Screen Name

The first screen should be called:

```text
Trip Companion Dashboard
```

## Header

The header should show:

- Product name
- Current trip name
- Current day indicator
- Save status
- Create new trip button

Example:

```text
Holiday Companion Bot | Austria Trip | Day 2 | Saved locally
```

## Header Actions

The header should include:

- Create New Trip
- View Full Itinerary
- Share Preview
- Settings later

## Primary Area: Today's Plan

Today's plan is the main focus of the app.

It should be the largest card on the screen.

## Today's Plan Card

The Today's Plan card should include:

- Day number
- City
- Day theme
- Main activities
- Food or cafe suggestions
- Transport notes
- Quick action buttons

## Today's Plan Card Example

```text
Day 2 — Vienna

Theme:
Schönbrunn, Belvedere, Karlskirche, and classic Vienna museums

Main Activities:
- Schönbrunn Palace and gardens
- Upper Belvedere
- Wien Museum
- Karlskirche

Food Ideas:
- Cafe Goldegg
- Ahrnst Bakery
- Cafe Museum
- Wiener Melange
- Apfelstrudel

Transport Notes:
- Use local Vienna transport
- Check routes live before leaving
```

## Today's Plan Quick Actions

Today's plan should have buttons:

- Ask about today
- Make today lighter
- Add cafe break
- Replace activity
- Mark activity as skipped
- View tomorrow

## Secondary Area: Tomorrow's Plan

Tomorrow's plan should be smaller than today's plan.

It helps the user prepare ahead.

## Tomorrow's Plan Card

The Tomorrow's Plan card should include:

- Day number
- City
- Day theme
- Main activities summary
- Preparation reminder

## Tomorrow's Plan Actions

Tomorrow's plan should have buttons:

- View tomorrow
- Ask about tomorrow
- Move activity to tomorrow
- Prepare for tomorrow

## Full Itinerary Preview

The user should be able to see the full itinerary.

For the MVP, the full itinerary preview can be simple.

It should show:

- Day list
- Day number
- City
- Theme
- Main activity count
- Edited status

## Full Itinerary Example

```text
Day 1 — Vienna — Arrival and city orientation
Day 2 — Vienna — Palaces, museums, cafes
Day 3 — Vienna — City exploration
Day 4 — Salzburg — Transfer and old town
```

## Right Trip Dashboard

The right dashboard should give the user a quick overview of the trip.

It should include:

- Trip name
- Destination
- Trip duration
- Current day
- Saved status
- Version count
- Upcoming days
- Share preview entry point

## Trip Dashboard Example

```text
Austria Trip

Duration:
13 days

Current Day:
Day 2

Saved Status:
Saved locally

Versions:
2 versions

Upcoming:
Day 3 — Vienna
Day 4 — Salzburg
Day 5 — Salzburg
```

## Chat Assistant

The chat assistant should appear near the bottom.

It should let the user ask questions or request changes.

## Chat Assistant Placeholder

Example placeholder:

```text
Ask about your trip or request a change...
```

## Example Chat Questions

The app can show quick prompt chips:

- What is today's plan?
- What food is planned today?
- What can I skip if I am tired?
- What is tomorrow's plan?
- Add a cafe break
- Replace an activity
- Move this to tomorrow

## Chat Behavior

For the first prototype, chat responses can be mocked.

The app does not need real AI calls yet.

The prototype can simulate common responses based on selected prompt chips.

## Proposed Change Preview

When the user requests an edit, the app should show a proposed change before saving.

The proposed change preview should include:

- Detected intent
- Affected day
- Current itinerary item
- Proposed change
- Impact on the day
- What stays unchanged
- Verify live reminders
- Confirm button
- Reject button
- Revise button later

## Proposed Change Preview Example

```text
Proposed Change

Detected Intent:
Replace activity

Affected Day:
Day 2 — Vienna

Current Item:
Upper Belvedere

Proposed Change:
Replace Upper Belvedere with a relaxed cafe break near Karlsplatz.

Impact:
Day 2 becomes less museum-heavy and more relaxed.

Confirm this change?
```

## Confirmation Buttons

The MVP should include:

- Confirm change
- Reject change

Future version may include:

- Revise proposal
- Compare versions
- Restore previous version

## Save Status

The interface should show save state clearly.

Possible statuses:

```text
No change requested
Proposal generated
Awaiting confirmation
Saving
Saved locally
Save failed
Rejected
```

For the first prototype, saving can be simulated with local state or localStorage.

## Version History Preview

The MVP should show a simple version summary.

Minimum version:

```text
Version 1: Initial itinerary
Version 2: Day 2 changed
```

The full version history page is not required yet.

## Sharing Entry Point

Sharing is not part of the first prototype build.

However, the UI can include a disabled or future-state sharing button.

Example:

```text
Share Preview
```

When clicked in the MVP, it can show:

```text
Sharing is a future feature. The share preview will remove private details before sharing.
```

## Create New Trip Entry Point

The product should have a Create New Trip button.

For MVP, clicking it can show a simple placeholder modal.

The modal can say:

```text
Create New Trip is a future feature.

For now, this prototype uses the Austria trip sample.
```

Future version should support:

- AI baseline itinerary creation
- Guided preference questions
- Import existing itinerary
- Template-based creation

## Manual Edit Option

The user should eventually be able to edit the itinerary manually.

For the first prototype, manual editing can be represented as a future feature.

Possible future button:

```text
Edit manually
```

MVP behavior:

```text
Manual editing is a future feature. Use the chat assistant or quick actions for now.
```

## Mobile Layout

For mobile, the layout should stack vertically.

Mobile order:

1. Header
2. Today's Plan
3. Tomorrow's Plan
4. Chat Assistant
5. Proposed Change Preview
6. Trip Dashboard
7. Full Itinerary Preview

## Desktop Layout

For desktop, use the three-area layout:

- Main content on the left
- Trip dashboard on the right
- Chat assistant at the bottom

## MVP Components

The first prototype can use these components:

```text
AppShell
Header
TodayPlanCard
TomorrowPlanCard
TripDashboard
FullItineraryList
ChatAssistant
PromptChips
ProposedChangeCard
VersionSummary
SharePreviewPlaceholder
CreateTripPlaceholder
```

## Component Responsibilities

## AppShell

Holds the full layout.

## Header

Shows product name, trip name, current day, and save status.

## TodayPlanCard

Shows today's main activities, food, and transport notes.

## TomorrowPlanCard

Shows tomorrow's summary.

## TripDashboard

Shows trip overview and upcoming days.

## FullItineraryList

Shows all days in compact form.

## ChatAssistant

Lets user ask questions or request changes.

## PromptChips

Shows common quick actions.

## ProposedChangeCard

Shows proposed itinerary changes and confirm/reject buttons.

## VersionSummary

Shows simple version count or recent changes.

## SharePreviewPlaceholder

Shows future sharing entry point.

## CreateTripPlaceholder

Shows future new-trip creation entry point.

## MVP State Needed

The frontend prototype needs these state objects:

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

## Example Local State

```json
{
  "currentTrip": {
    "tripName": "Austria Trip",
    "destination": "Austria",
    "duration": "13 days",
    "currentDay": 2
  },
  "saveStatus": "saved_locally",
  "proposedChange": null,
  "versionHistory": [
    {
      "version": 1,
      "summary": "Initial itinerary"
    }
  ]
}
```

## MVP Interactions

## Interaction 1: Ask About Today

User clicks:

```text
Ask about today
```

App shows a mocked assistant response summarizing today's plan.

## Interaction 2: Make Today Lighter

User clicks:

```text
Make today lighter
```

App shows a proposed change card with a lighter plan.

The itinerary is not changed yet.

## Interaction 3: Confirm Change

User clicks:

```text
Confirm change
```

App updates local state and changes save status to:

```text
Saved locally
```

The version summary updates.

## Interaction 4: Reject Change

User clicks:

```text
Reject change
```

App clears the proposed change.

The itinerary remains unchanged.

## Interaction 5: View Tomorrow

User clicks:

```text
View tomorrow
```

App highlights tomorrow's plan.

## Interaction 6: Share Preview

User clicks:

```text
Share Preview
```

App shows a placeholder message for future sharing.

## MVP Out of Scope

Do not build these in the first UI prototype:

- Real AI API calls
- Backend database
- Authentication
- Live maps
- Live weather
- Real-time transport
- Booking integrations
- Payment
- Multi-user collaboration
- Real share links
- PDF export
- Multiple trips
- Full manual editor

## Low-Credit Build Strategy

To save credits, the first app build should be:

```text
Frontend-only
Static sample data
Local state
Mock assistant responses
No backend
No APIs
No authentication
No database
```

## First Build Prompt Goal

The first build prompt should ask for:

```text
A frontend-only Holiday Companion Bot prototype with local sample data, today's plan card, tomorrow's plan card, trip dashboard, chat assistant, proposed change preview, and confirm/reject behavior.
```

## Success Criteria

The UI spec is successful if a builder can create a frontend prototype that:

- Shows today's plan
- Shows tomorrow's plan
- Shows trip dashboard
- Shows chat assistant
- Shows quick action prompt chips
- Shows proposed change preview
- Lets user confirm or reject a mock change
- Simulates local save status
- Does not require backend, API, auth, or database

## Key Lesson

A UI spec turns product vision into build instructions.

This helps reduce AI credit waste because the builder does not need to guess what screens, cards, buttons, or states to create.
