# Itinerary State Model

## Purpose

This file defines how the future Holiday Companion Bot should think about saved itinerary state.

The current Markdown itinerary is learning scaffolding.

In the final product, the itinerary should be created, edited, saved, and retrieved inside the product.

## What Is Itinerary State?

Itinerary state is the current saved version of a trip.

It is the source of truth that the bot reads from and updates after user-confirmed changes.

Example:

- User asks what today's plan is.
- Bot reads itinerary state.
- User asks to remove an activity.
- Bot proposes the change.
- User confirms.
- Backend updates itinerary state.
- Future answers use the updated itinerary.

## Current Learning Format

Current learning file:

- sample-data/austria-13-day-sanitized.md

This is not the final storage method.

It is used to learn:

- Itinerary structure
- Bot retrieval behavior
- Day-by-day planning
- Food and transport notes
- Edit workflow design

## Future Storage Options

The final product may store itinerary state in:

- JSON file
- Database
- Backend API
- User account storage
- Local storage for prototype
- Cloud storage later

## Suggested State Fields

### Trip-Level Fields

- trip_id
- trip_name
- destination
- start_date
- end_date
- current_day
- trip_status
- created_at
- updated_at
- share_status

### User-Level Fields

- user_id
- travel_style
- budget_preference
- food_preferences
- activity_preferences
- pace_preference
- accessibility_needs
- preference_notes

### Day-Level Fields

Each day should include:

- day_number
- date
- city
- theme
- morning
- afternoon
- evening
- food
- transport
- notes
- preparation
- verify_live
- status

### Activity-Level Fields

Each activity should include:

- activity_id
- title
- description
- location
- city
- time_slot
- category
- priority
- flexibility
- booking_required
- live_verification_needed
- notes
- status

### Version History Fields

Each saved change should include:

- version_id
- changed_at
- changed_by
- change_type
- affected_day
- affected_activity
- previous_value
- new_value
- reason
- confirmation_status

## Example Itinerary State Shape

This is a conceptual model, not final code.

Trip:

- trip_id: austria-001
- trip_name: Austria 13 Day Trip
- destination: Austria
- current_day: 2
- share_status: private

Day:

- day_number: 2
- city: Vienna
- theme: Schönbrunn, Belvedere, Karlskirche, and classic Vienna museums
- morning: Schönbrunn Palace and gardens
- afternoon: Upper Belvedere and Wien Museum
- evening: Karlskirche and dinner around Wieden or Karlsplatz
- food: cafe, bakery, tea time, Austrian food ideas
- transport: local Vienna transport
- notes: check tickets and timing live

Activity:

- title: Schönbrunn Palace and gardens
- time_slot: morning
- category: palace
- priority: high
- flexibility: medium
- booking_required: maybe
- live_verification_needed: true

## State Update Rules

The system should follow these rules:

1. Never update itinerary state without user confirmation.
2. Save previous versions before applying confirmed changes.
3. Keep a record of what changed.
4. Keep the itinerary readable after edits.
5. Do not overwrite the whole itinerary for small changes.
6. Update only the affected day or activity when possible.
7. Keep live information separate from saved itinerary information.

## Example State Change

User request:

- Remove Schönbrunn from Day 2 and replace it with something lighter.

Bot proposed change:

- Remove: Schönbrunn Palace and gardens
- Add: relaxed cafe and Karlsplatz area exploration
- Keep: Upper Belvedere optional
- Ask: Do you want me to apply this change?

After confirmation:

- Day 2 state is updated.
- A new version history entry is saved.
- Future Day 2 answers use the updated plan.

## MVP State Strategy

For the early MVP, the product can simulate itinerary state using:

- Markdown files
- JSON-like examples
- Manual test outputs

Later, this should become:

- App state
- Backend database
- User-specific saved itinerary
- Version history
- Shareable itinerary link

## Why This Matters

A static bot can only read an itinerary.

A product with itinerary state can:

- Build the itinerary
- Edit the itinerary
- Save the itinerary
- Explain the itinerary
- Share the itinerary
- Learn preferences over time
