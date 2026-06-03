# PRD: Holiday Companion Bot

## Product Summary

Holiday Companion Bot is an AI-assisted travel product that helps users build, understand, edit, save, and eventually share travel itineraries.

The first MVP uses the Austria trip as the working example.

The product should move beyond a static itinerary reader. It should become a flexible itinerary companion that can answer trip questions and safely update the itinerary after user confirmation.

## Product Vision

The long-term vision is to create a travel companion that can:

1. Build an itinerary from user preferences
2. Load a saved itinerary
3. Answer practical trip questions
4. Explain today and tomorrow's plan
5. Suggest lighter alternatives
6. Propose itinerary changes
7. Save confirmed itinerary updates
8. Preserve version history
9. Support sharing
10. Learn future travel preferences from saved itineraries and edits

## Target User

The target user is a traveler who wants a flexible itinerary assistant.

The user may:

- Have an existing itinerary
- Want help building an itinerary
- Need help understanding today or tomorrow's plan
- Want to change the plan during the trip
- Want to save and share the final itinerary

## Main Problem

Travel itineraries often become hard to use during an actual trip.

Problems include:

- Plans become outdated
- The user gets tired
- Weather or timing changes
- Activities need to be removed or replaced
- Useful details are spread across the itinerary
- Users need quick answers while travelling
- Updated plans need to be saved

A static itinerary is not flexible enough.

The product should help the user manage the current itinerary state.

## Key Concept: Itinerary State

Itinerary state means the current saved version of the trip.

It includes:

- Trip name
- Destination
- Dates
- Current trip day
- Day-by-day plan
- Activities
- Food ideas
- Transport notes
- Preparation notes
- User edits
- Version history
- Sharing status
- User preferences

In the current learning phase, itinerary state is represented using Markdown files.

In the final product, itinerary state may be stored in JSON, a database, local storage, or backend storage.

## First MVP Use Case

The first MVP use case is:

> User opens the product, checks today's plan, asks to change one activity, confirms the proposed change, and the itinerary is updated.

## Core User Flow

1. User opens product.
2. Product loads the saved itinerary.
3. User asks: "What's today's plan?"
4. Bot retrieves the relevant day from itinerary state.
5. Bot explains highlights, food, transport, and preparation notes.
6. User asks: "Remove one activity from today and replace it with something lighter."
7. Bot identifies the affected day and activity.
8. Bot proposes a change.
9. User confirms or rejects the change.
10. Backend updates the itinerary state.
11. Updated itinerary is saved.
12. Future answers use the updated itinerary.

## Supported Intents

The bot should support these initial intent types:

1. Today's plan
2. Tomorrow's plan
3. Specific day lookup
4. Food question
5. Transport question
6. Preparation question
7. Tired-mode question
8. Remove activity
9. Replace activity
10. Add activity
11. Reschedule activity
12. Make day lighter
13. Summarize full itinerary
14. Share itinerary
15. Clarification needed

## Read-Only User Stories

### Today's Plan

As a traveler, I want to ask "What's today's plan?" so that I can quickly understand the day's highlights, food options, transport notes, and things to prepare.

### Tomorrow's Plan

As a traveler, I want to ask "What is tomorrow's plan?" so that I can prepare ahead.

### Food Question

As a traveler, I want to ask "What food is planned today?" so that I can quickly find meal, cafe, or snack ideas from my itinerary.

### Tired Mode

As a traveler, I want to ask "What can I skip if I am tired?" so that I can reduce the day's plan without losing the main experience.

## Edit User Stories

### Remove Activity

As a traveler, I want to remove an activity from today's itinerary so that my plan reflects what I actually want to do.

### Replace Activity

As a traveler, I want to replace one activity with another so that the itinerary stays flexible.

### Add Activity

As a traveler, I want to add a new activity to a day so that the itinerary can adapt to new interests.

### Reschedule Activity

As a traveler, I want to move an activity to another day so that the itinerary remains realistic.

## Inputs

The product may use:

- User question
- Saved itinerary state
- Current trip day
- Current city
- User condition, such as tired or normal energy
- Desired change
- Activity to remove
- Activity to add
- Activity to replace
- Confirmation response
- Optional trip start date
- Optional current date

## Outputs

The bot may produce:

- Quick summary
- Relevant itinerary details
- Today's plan
- Tomorrow's plan
- Food ideas
- Transport notes
- Things to prepare
- Things to verify live
- Optional lighter plan
- Proposed itinerary change
- Confirmation question
- Updated itinerary summary after confirmation
- Missing information
- Clarification question

## Edit Behavior Rules

The bot must not silently change the itinerary.

For edit requests, the bot should:

1. Identify the affected day.
2. Identify the affected activity.
3. Check the current itinerary state.
4. Propose a change.
5. Explain what will be removed, added, moved, or replaced.
6. Ask for user confirmation.
7. Only save the change after confirmation.
8. Summarize the updated plan after saving.

## Constraints

- Do not silently change itinerary state.
- Always propose changes before applying them.
- Ask for confirmation before saving changes.
- Do not invent live facts.
- Do not invent opening hours.
- Do not invent prices.
- Do not invent weather.
- Do not invent ticket availability.
- Do not invent live transport disruptions.
- Do not use private booking information.
- Keep backend and database implementation for later.
- Keep paid APIs out of the MVP.
- Treat the Austria Markdown dataset as learning scaffolding, not final product storage.

## Current Learning Dataset

The current protected learning dataset is:

- sample-data/austria-13-day-sanitized.md

This dataset is used to learn how itinerary information should be structured and retrieved.

## Not in Current MVP

The current MVP should not include:

- Live weather API
- Live maps API
- Live transport API
- Booking integration
- Payments
- User login
- Automatic email sending
- Multi-user collaboration
- Multiple trip datasets as the current focus

## Future Product Possibilities

Later, this project could include:

- Vercel web app
- Backend itinerary storage
- User accounts
- Saved trip history
- Shareable itinerary links
- Version history
- Preference memory
- Suggestion planning mode
- RAG over itinerary state
- Weather-aware suggestions
- Map or places API integration
- Export to PDF or Google Docs

## Success Criteria

This project is successful if the MVP can:

- Load or simulate an itinerary state
- Answer today's plan
- Answer tomorrow's plan
- Answer food, transport, and preparation questions
- Suggest lighter alternatives
- Propose itinerary edits
- Ask for confirmation before saving edits
- Represent how updated itinerary state should be saved
- Prepare for a future app implementation
