# Vercel / v0 Build Prompt

## Purpose

Use this prompt when building the first frontend prototype of the Holiday Companion Bot with Vercel/v0 or another AI app builder.

This prompt is designed to reduce credit waste by keeping the build scope narrow.

## Important Instruction

Do not ask the AI builder to build the full product.

Use this prompt to build a frontend-only MVP prototype.

## Build Prompt

Build a frontend-only prototype for the Holiday Companion Bot.

The app should simulate a travel itinerary companion product using local mock data.

Do not build a backend.

Do not add authentication.

Do not add a database.

Do not add paid APIs.

Do not add real AI calls.

Do not add maps.

Do not add weather.

Do not add booking integrations.

Do not add real sharing links.

## Product Summary

Holiday Companion Bot helps users manage a flexible travel itinerary.

The product should eventually help users:

- Build an itinerary
- Check today's plan
- Check tomorrow's plan
- Ask food and transport questions
- Request itinerary changes
- Preview proposed changes
- Confirm or reject changes
- Save updated itinerary state
- Track version history
- Share the itinerary later

For this prototype, only build the local frontend experience.

## MVP Scope

The prototype should include:

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

## Data Rules

Use local mock data only.

The first sample trip should be:

```text
Austria Trip
```

The prototype should use a simplified local itinerary object.

Do not fetch data from external APIs.

Do not require a backend.

Do not require environment variables.

## Suggested Mock Data Shape

Use this type of structure:

```json
{
  "currentTrip": {
    "tripName": "Austria Trip",
    "destination": "Austria",
    "duration": "13 days",
    "currentDay": 2
  },
  "saveStatus": "saved_locally",
  "days": [
    {
      "dayNumber": 2,
      "city": "Vienna",
      "theme": "Schönbrunn, Belvedere, Karlskirche, and classic Vienna museums",
      "morning": ["Schönbrunn Palace and gardens"],
      "afternoon": ["Upper Belvedere", "Wien Museum", "Tea time near Belvedere or Karlsplatz"],
      "evening": ["Karlskirche", "Dinner around Wieden or Karlsplatz"],
      "food": ["Cafe Goldegg", "Ahrnst Bakery", "Cafe Museum", "Wiener Melange", "Apfelstrudel"],
      "transport": ["Use local Vienna transport", "Check live route before leaving"],
      "notes": ["Verify live details such as ticket availability, opening hours, weather, and transport disruptions"],
      "edited": false
    },
    {
      "dayNumber": 3,
      "city": "Vienna",
      "theme": "Flexible Vienna exploration",
      "morning": ["Morning city walk"],
      "afternoon": ["Cafe or museum option"],
      "evening": ["Dinner and relaxed evening"],
      "food": ["Cafe option", "Local dinner option"],
      "transport": ["Use local Vienna transport"],
      "notes": ["Keep the day flexible"],
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

## Layout

Use a responsive dashboard layout.

Desktop layout:

```text
Header at top
Main content on left
Trip dashboard on right
Chat assistant at bottom
Proposed change card below or beside chat
```

Mobile layout:

```text
Header
Today's Plan
Tomorrow's Plan
Chat Assistant
Proposed Change Card
Trip Dashboard
Full Itinerary Preview
```

## Header Requirements

The header should show:

- Product name: Holiday Companion Bot
- Trip name: Austria Trip
- Current day: Day 2
- Save status: Saved locally
- Create New Trip button

## Today's Plan Card

Today's Plan should be the main card.

It should show:

- Day number
- City
- Theme
- Morning plan
- Afternoon plan
- Evening plan
- Food ideas
- Transport notes
- Quick action buttons

Quick action buttons:

- Ask about today
- Make today lighter
- Add cafe break
- Replace activity
- View tomorrow

## Tomorrow's Plan Card

Tomorrow's Plan should show:

- Day number
- City
- Theme
- Main activities summary
- Preparation note

## Trip Dashboard

The right dashboard should show:

- Trip name
- Destination
- Duration
- Current day
- Save status
- Version count
- Upcoming days
- Share Preview placeholder

## Full Itinerary Preview

Show a compact list of itinerary days.

Each row should include:

- Day number
- City
- Theme
- Edited status

## Chat Assistant

The chat assistant should include:

- Message area
- Input box
- Quick prompt chips

Input placeholder:

```text
Ask about your trip or request a change...
```

Quick prompt chips:

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

When user clicks:

```text
What's today's plan?
```

Show a response summarizing Day 2.

When user clicks:

```text
What is tomorrow's plan?
```

Show a response summarizing Day 3.

When user clicks:

```text
What food is planned today?
```

Show a response listing Day 2 food ideas.

When user clicks:

```text
Make today lighter
```

Create a proposed change card.

When user clicks:

```text
Add a cafe break
```

Create a proposed change card.

When user clicks:

```text
Replace an activity
```

Create a proposed change card.

## Proposed Change Card

The Proposed Change Card should show:

- Detected intent
- Affected day
- Current item
- Proposed change
- Impact on the day
- Options
- Confirm button
- Reject button

For replacement requests, show 3 options:

1. Relaxed cafe break
2. Short scenic walk
3. Leave this time as relax/free time

## Confirm Behavior

When the user clicks Confirm:

- Apply the proposed change to local state
- Add a version history entry
- Clear the proposed change card
- Update save status to Saved locally
- Add a chat message saying the change was saved locally

Do not use backend.

## Reject Behavior

When the user clicks Reject:

- Clear the proposed change card
- Do not change itinerary data
- Add a chat message saying no changes were saved

## localStorage Behavior

Use localStorage if simple to implement.

Suggested key:

```text
holiday_companion_current_trip
```

If localStorage is too much for the first version, local React state is acceptable.

## Version Summary

Show a small version summary.

Example:

```text
Version 1: Initial itinerary loaded
Version 2: Day 2 updated locally
```

## Share Preview Placeholder

Do not build real sharing.

When user clicks Share Preview, show a simple placeholder:

```text
Sharing is a future feature. A share preview will remove private details before sharing.
```

## Create New Trip Placeholder

Do not build real trip creation.

When user clicks Create New Trip, show a simple placeholder:

```text
Create New Trip is a future feature. This prototype uses the Austria sample trip.
```

## Styling Direction

Use a clean travel-dashboard style.

Keep it simple, modern, and readable.

Use cards, clear spacing, and friendly copy.

Avoid heavy animations.

Avoid complex design systems.

## Technical Constraints

- Frontend only
- No backend
- No database
- No authentication
- No external APIs
- No real AI calls
- No environment variables
- No paid services
- Local mock data only
- localStorage optional
- Keep code simple

## Files / Components To Create

Create components similar to:

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

## Success Criteria

The prototype is successful if:

- App loads without backend
- User sees today's plan
- User sees tomorrow's plan
- User sees trip dashboard
- User can click prompt chips
- Mock chat responses appear
- Proposed change card appears for edit actions
- Confirm button updates local state
- Reject button keeps itinerary unchanged
- Save status changes appropriately
- Version history updates locally
- No real AI or API calls are required

## Do Not Build

Do not build:

- Backend
- Database
- Authentication
- Real AI chat
- RAG
- Maps
- Weather
- Live transport
- Booking integration
- Payment
- Real share links
- PDF export
- Multi-trip management

## Final Reminder

This is a low-credit frontend prototype.

Build the smallest useful version first.
