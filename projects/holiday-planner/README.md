# Holiday Companion Bot

## Project Purpose

Holiday Companion Bot is an AI-assisted travel companion system that helps users understand and use their trip itinerary during an actual trip.

The first MVP uses a sanitized Austria itinerary dataset.

In the future, the system should support other trips by allowing new structured itinerary datasets to be added.

## Current MVP

The current MVP is:

- Austria Trip Companion Bot

It should answer questions such as:

- What is today's plan?
- What should I prepare before leaving?
- What food is planned today?
- What transport notes should I know?
- What can I skip if I am tired?
- What is tomorrow's plan?
- Which days involve intercity travel?
- Which days are best for cafes or museums?

## Why This Project Matters

This project is a good first AI product because it teaches:

- Prompt design
- Dataset preparation
- RAG-style thinking
- Bot behavior design
- Multi-intent question handling
- Product documentation
- Future app planning
- Cost-safe AI workflows

## Target User

The target user is a traveler who already has a planned itinerary and wants a simple AI assistant to explain the trip day by day.

The user may be travelling and wants fast answers without searching through a long itinerary manually.

## First Version

The first version will not use APIs, live maps, or a full app.

It will use:

- Markdown notes
- Sanitized itinerary data
- Reusable prompts
- Manual bot testing
- GitHub as the source of project memory

## Future Versions

Later, this project could become:

- A simple Vercel web app
- A RAG itinerary assistant
- A daily trip briefing bot
- A food and cafe finder based on the itinerary
- A tired-mode travel assistant
- A multi-trip companion system
- A trip suggestion planner that learns from past itinerary structures
- A map or places API-powered assistant
- A weather-aware travel assistant
- A shareable travel itinerary generator

## Important Data Rule

Only sanitized itinerary data should be used.

Do not upload:

- Passport details
- Booking reference numbers
- Hotel confirmation numbers
- Full traveler names
- Phone numbers
- Emails
- Payment details
- Private personal information

## Current Source of Truth

The current source of truth is:

- sample-data/austria-13-day-sanitized.md

This dataset should be treated as protected.

## Current Status

MVP planning and prompt testing stage.
