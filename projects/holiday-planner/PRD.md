# PRD: Holiday Companion Bot

## Product Summary

Holiday Companion Bot is an AI-assisted travel companion system that helps a traveler retrieve, understand, and act on their saved itinerary during a trip.

The first MVP is the Austria Trip Companion Bot, powered by a sanitized Austria 13-day itinerary dataset.

The product should later evolve into a reusable system that can support other trips by adding new structured itinerary datasets.

## Product Vision

The long-term vision is to create a personal travel companion bot that can:

1. Read structured itinerary datasets
2. Answer practical trip-day questions
3. Help the user prepare for the day
4. Suggest lighter alternatives when tired
5. Retrieve food, transport, and activity details
6. Support multiple future trips
7. Eventually help suggest new itineraries based on past trip patterns

## Target User

The target user is a traveler who already has a planned itinerary and wants a simple AI assistant to explain and adapt the trip during travel.

## Main Problem

Travel itineraries often become hard to use during the actual trip.

Useful information may be spread across:

- Day plans
- Food notes
- Transport notes
- Attraction reminders
- Ticket reminders
- City transitions
- Personal travel preferences

The user needs a quick way to ask natural questions and retrieve the relevant itinerary details.

## First MVP Use Case

The first MVP use case is:

> Ask the bot what today's plan is and receive a practical travel briefing.

The bot should retrieve the correct day from the Austria itinerary dataset and return a useful answer.

## Example User Stories

### Today's Plan

As a traveler, I want to ask "What's today's plan?" so that I can quickly understand the day's highlights, food options, transport notes, and things to prepare.

### Food Question

As a traveler, I want to ask "What food is planned today?" so that I can quickly find meal, cafe, or snack ideas from my itinerary.

### Tired Mode

As a traveler, I want to ask "What can I skip if I am tired?" so that I can reduce the day's plan without losing the main experience.

### Tomorrow Mode

As a traveler, I want to ask "What is tomorrow's plan?" so that I can prepare ahead.

### Cross-Day Search

As a traveler, I want to ask "Which days involve intercity travel?" or "Which days are best for cafes?" so that I can understand the trip structure.

## Inputs

The bot may use:

- User question
- Current trip day
- Destination or city
- Trip dataset
- Day number
- Optional travel date
- Optional user condition, such as "I am tired" or "I want a lighter plan"
- Optional trip context, such as current city or tomorrow's day

## Outputs

The bot should produce different outputs depending on the user's intent.

Possible output sections:

- Quick summary
- Relevant itinerary details
- Main highlights
- Suggested timeline
- Food ideas
- Transport notes
- Things to prepare
- Things to verify live
- Optional lighter version
- Missing information
- Clarification question

## Supported Intents

The bot should support these initial intent types:

1. Today's plan
2. Specific day lookup
3. Food question
4. Tired-mode question
5. Tomorrow's plan
6. Intercity travel search
7. Museum or culture search
8. Cafe or food search
9. Preparation question
10. Clarification needed

## Constraints

- Use the itinerary dataset as the source of truth
- Do not invent exact opening hours, prices, rankings, weather, ticket availability, or live transport details
- If live information is needed, tell the user to verify it
- Do not use private booking information
- Do not add paid APIs yet
- Keep the first version manual and simple
- Do not treat subjective rankings as facts unless the dataset clearly supports them
- Ask for clarification when the current day, city, or intent is unclear

## Current Dataset

The current MVP dataset is:

- sample-data/austria-13-day-sanitized.md

Future datasets may include:

- japan-trip-sanitized.md
- korea-trip-sanitized.md
- taiwan-trip-sanitized.md
- thailand-trip-sanitized.md
- custom-user-trip-sanitized.md

## Success Criteria

This project is successful if the bot can:

- Answer day-specific trip questions using the correct dataset section
- Answer cross-day questions by scanning the dataset
- Avoid unsupported facts
- Ask for clarification when needed
- Separate itinerary information from live details that must be verified
- Support a structure that can be reused for future trips

## Future Product Possibilities

Later, this project could include:

- RAG over itinerary files
- Vercel web app
- Trip dataset upload
- Multiple trip selection
- "Today mode"
- "Tomorrow mode"
- Food finder
- Tired-mode itinerary adjustment
- City-specific search
- Weather-aware suggestions
- Map or places API integration
- Trip planning suggestion mode
- Export to PDF or Google Docs
- Mobile-friendly travel assistant
