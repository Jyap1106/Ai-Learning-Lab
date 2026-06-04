# Data Loading Plan

## Purpose

This file defines how the Holiday Companion Bot prototype should load itinerary data without needing a backend, database, paid API, or real AI calls.

The goal is to support a low-credit frontend MVP first.

## Core Idea

The first prototype should load a static itinerary as the starting point.

After the user confirms changes, the app should update local state and save the updated itinerary locally.

The MVP data flow is:

```text
Static sample itinerary
↓
App loads itinerary into local state
↓
User views today's plan
↓
User requests a change
↓
App shows proposed change
↓
User confirms
↓
App updates local state
↓
App saves updated state to localStorage
```

## Why This Matters

A real AI product needs state.

The bot should not only answer questions. It should know which itinerary version is currently active.

The first MVP does not need a backend to prove this behavior.

A frontend-only prototype can still show:

- Today's plan
- Tomorrow's plan
- Proposed itinerary changes
- Confirm or reject behavior
- Local saved status
- Basic version history

## Current Learning Dataset

The current protected learning dataset is:

```text
sample-data/austria-13-day-sanitized.md
```

This file is useful for learning and documentation.

However, the frontend prototype should ideally use a structured data shape, such as JSON-like data.

## MVP Data Strategy

Use three layers:

```text
Layer 1: Static seed data
Layer 2: Runtime app state
Layer 3: localStorage saved state
```

## Layer 1: Static Seed Data

Static seed data is the starting itinerary.

It can be created manually from the Austria itinerary.

Suggested future file:

```text
sample-data/austria-itinerary-state-sample.json
```

This file should represent the Austria itinerary in a structured format that the frontend can load.

## Layer 2: Runtime App State

Runtime app state is the current itinerary while the user is using the app.

Example state:

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

This state lives inside the frontend while the app is open.

## Layer 3: localStorage Saved State

localStorage allows the browser to remember updates after refresh.

For the MVP, confirmed itinerary edits can be saved locally.

Suggested localStorage key:

```text
holiday_companion_current_trip
```

Suggested version history key:

```text
holiday_companion_version_history
```

## Data Loading Priority

When the app starts, it should load data in this order:

```text
1. Check localStorage for saved itinerary
2. If localStorage exists, load saved itinerary
3. If localStorage does not exist, load static seed data
4. Set save status to "saved locally" or "using sample data"
```

## Startup Flow

The startup flow should be:

```text
App opens
↓
Check localStorage
↓
If saved itinerary exists:
    Load saved itinerary
    Set source = localStorage
Else:
    Load static sample itinerary
    Set source = sample data
↓
Render today's plan
↓
Render tomorrow's plan
↓
Render trip dashboard
```

## Example Startup Logic

This is conceptual logic, not final code.

```text
savedTrip = localStorage.getItem("holiday_companion_current_trip")

if savedTrip exists:
    itineraryState = parse savedTrip
    saveStatus = "saved locally"
else:
    itineraryState = austriaSampleTrip
    saveStatus = "using sample data"
```

## Suggested Itinerary State Shape

The frontend should eventually use this kind of structure:

```json
{
  "tripId": "austria-trip-mvp",
  "tripName": "Austria Trip",
  "destination": "Austria",
  "duration": "13 days",
  "currentDay": 2,
  "saveStatus": "saved_locally",
  "days": [
    {
      "dayNumber": 2,
      "city": "Vienna",
      "theme": "Schönbrunn, Belvedere, Karlskirche, and classic Vienna museums",
      "morning": [
        "Schönbrunn Palace and gardens"
      ],
      "afternoon": [
        "Upper Belvedere",
        "Wien Museum",
        "Tea time near Belvedere or Karlsplatz"
      ],
      "evening": [
        "Karlskirche",
        "Dinner around Wieden or Karlsplatz"
      ],
      "food": [
        "Cafe Goldegg",
        "Ahrnst Bakery",
        "Cafe Museum",
        "Wiener Melange",
        "Apfelstrudel"
      ],
      "transport": [
        "Use local Vienna transport",
        "Check route live before leaving"
      ],
      "notes": [
        "Verify live details such as ticket availability, opening hours, weather, and transport disruptions"
      ],
      "edited": false
    }
  ],
  "versionHistory": [
    {
      "version": 1,
      "summary": "Initial itinerary loaded"
    }
  ]
}
```

## Current Day Logic

For the MVP, current day can be manually set.

Example:

```text
currentDay = 2
```

This avoids needing date logic in the first prototype.

Future versions can calculate current day from:

```text
tripStartDate
currentDate
timezone
```

## Tomorrow Logic

Tomorrow can be calculated simply.

```text
tomorrowDay = currentDay + 1
```

If current day is the final day, the app should show:

```text
This is the final day of the itinerary.
```

## Proposed Change State

When the user asks for a change, the app should create a proposed change object.

Example:

```json
{
  "changeId": "change-001",
  "status": "awaiting_confirmation",
  "type": "replace_activity",
  "affectedDay": 2,
  "currentItem": "Upper Belvedere",
  "proposedReplacement": "Relaxed cafe break near Karlsplatz",
  "impact": "Day 2 becomes less museum-heavy and more relaxed"
}
```

The app should not update the itinerary yet.

## Confirmed Change Flow

When the user confirms:

```text
User clicks Confirm
↓
Apply proposed change to local state
↓
Add version history entry
↓
Save updated state to localStorage
↓
Clear proposed change
↓
Update save status to "saved locally"
```

## Rejected Change Flow

When the user rejects:

```text
User clicks Reject
↓
Clear proposed change
↓
Do not update itinerary
↓
Save status remains unchanged
```

## Version History in MVP

Version history can be simple.

Example:

```json
[
  {
    "version": 1,
    "summary": "Initial itinerary loaded"
  },
  {
    "version": 2,
    "summary": "Day 2 replaced Upper Belvedere with a relaxed cafe break"
  }
]
```

The first prototype does not need full rollback.

It only needs to show that changes are tracked.

## Reset Local Data

The MVP should include a way to reset local data.

Example button:

```text
Reset sample trip
```

Reset behavior:

```text
Clear localStorage
Reload static sample data
Set version history back to initial version
```

This is useful during testing and demos.

## Save Status Values

Possible save status values:

```text
using_sample_data
proposal_generated
awaiting_confirmation
saving
saved_locally
rejected
save_failed
```

## Data Loading UI Indicators

The UI should show simple status messages:

```text
Using sample data
Saved locally
Unsaved proposed change
Save failed
```

## Backend Later

A future backend can replace localStorage.

Future backend endpoints may include:

```text
GET /api/trips/:tripId
POST /api/trips
PATCH /api/trips/:tripId
POST /api/trips/:tripId/changes
POST /api/trips/:tripId/changes/:changeId/confirm
GET /api/trips/:tripId/history
```

## Future Database Later

A real product may eventually need database tables or collections for:

- users
- trips
- days
- activities
- proposed_changes
- version_history
- share_links
- preferences

This is not needed for the first MVP.

## Data Privacy Rules

The prototype should not save private travel data.

Do not store:

- Passport details
- Booking references
- Payment details
- Phone numbers
- Emails
- Private personal notes

## MVP Out of Scope

Do not build these yet:

- Real backend
- Database
- Authentication
- Cloud sync
- Multi-device sync
- Real AI API calls
- Live maps
- Live weather
- Real share links

## First Prototype Recommendation

Use this first build path:

```text
Static itinerary object
↓
React state
↓
Mock chat actions
↓
Proposed change object
↓
Confirm/reject buttons
↓
localStorage save
```

## Key Lesson

Data loading is the bridge between product documentation and a working app.

A frontend-only MVP can still prove the most important product behavior:

```text
Load itinerary
↓
Show today
↓
Propose change
↓
Confirm change
↓
Save locally
↓
Use updated itinerary
```
