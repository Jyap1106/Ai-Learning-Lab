# PRD: Holiday Planner

## Product Summary

Holiday Planner is evolving into an AI Trip Companion Bot.

Instead of only generating new itineraries, the first useful version will help a traveler retrieve and understand their existing itinerary while travelling.

The bot should answer questions such as:

- What is today's plan?
- What should I prepare before leaving?
- What food options are planned today?
- Which attractions are paid?
- What transport should I use?
- What can I skip if I am tired?
- What is tomorrow's plan?

## Target User

The target user is a traveler who already has a planned itinerary and wants a simple AI assistant to explain the day-by-day plan during the trip.

## Main Problem

Travel itineraries can become hard to follow during the actual trip because useful information is spread across days, notes, food ideas, transport details, and attraction reminders.

The user needs a quick way to ask natural questions and retrieve the relevant part of the itinerary.

## First Use Case

The first use case is a "What's today's plan?" bot.

The bot should retrieve the correct day from the Austria itinerary dataset and return a practical summary.

## User Story

As a traveler in Austria, I want to ask "What's today's plan?" so that I can quickly understand the day's highlights, food options, transport notes, and things to prepare before leaving.

## Inputs

The bot may use:

- User question
- Current trip day
- Destination or city
- Austria itinerary dataset
- Day number
- Optional travel date
- Optional user condition, such as "I am tired" or "I want a lighter plan"

## Outputs

The bot should produce:

- Today's theme
- Key highlights
- Morning / afternoon / evening plan
- Food suggestions
- Transport notes
- Things to prepare
- Paid or timed-entry reminders
- Things to verify live
- Optional lighter version of the day

## Constraints

- Use the itinerary dataset as the source of truth
- Do not invent exact opening hours, prices, or live transport details unless provided
- If live information is needed, tell the user to verify it
- Do not use private booking information
- Do not add paid APIs yet
- Keep the first version manual and simple

## Success Criteria

This project is successful if the bot can answer trip-day questions using the Austria itinerary dataset and provide a clear, useful daily travel briefing.

## Future Possibilities

Later, this project could include:

- RAG over itinerary files
- Vercel web app
- "Today mode"
- "Tomorrow mode"
- City-specific search
- Food finder
- Lighter-day alternative generator
- Weather-aware suggestions
- Map or places API integration
- Trip assistant agent
