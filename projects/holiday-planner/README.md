# Holiday Companion Bot

## Project Purpose

Holiday Companion Bot is an AI-assisted travel product that helps users build, understand, edit, save, and eventually share their travel itinerary.

The first working example is the Austria trip.

The current Markdown itinerary file is used as learning scaffolding. In the final product, the itinerary should be created and updated inside the product rather than manually edited in a Markdown file.

## Current MVP

The current MVP focuses on one trip first:

- Austria trip

The MVP should help the user:

- Check today's plan
- Check tomorrow's plan
- Understand food options
- Understand transport notes
- Prepare before leaving
- Make the day lighter if tired
- Remove, replace, add, or move activities
- Confirm changes before saving
- Preserve the updated itinerary state

## Example User Flow

1. User opens the product.
2. Product loads the saved itinerary.
3. User asks: "What's today's plan?"
4. Bot retrieves today's plan.
5. User says: "Remove one activity from today and replace it with something lighter."
6. Bot proposes a change.
7. User confirms the change.
8. Backend updates the full itinerary.
9. Updated itinerary is saved.
10. The itinerary can later be shared or used for future preference learning.

## Why This Project Matters

This project is a good first AI product because it teaches:

- Prompt design
- Dataset preparation
- RAG-style thinking
- Bot behavior design
- Intent classification
- State management
- Itinerary editing workflows
- Product documentation
- Backend planning
- Future app planning
- Cost-safe AI workflows

## Target User

The target user is a traveler who wants a flexible itinerary assistant.

The user may already have an itinerary or may want the product to help build one.

During the trip, the user wants fast answers without searching through a long itinerary manually.

## First Version

The first version will not use paid APIs, live maps, live weather, real-time transport, user login, or database logic.

It will use:

- Markdown notes
- Sanitized itinerary data
- Reusable prompts
- Manual bot testing
- GitHub as project memory
- A designed itinerary state model
- A designed edit workflow

## Future Versions

Later, this project could become:

- A Vercel web app
- A chat-based travel companion
- A daily trip briefing tool
- A trip itinerary builder
- A saved itinerary editor
- A shareable itinerary generator
- A RAG itinerary assistant
- A food and cafe finder based on the itinerary
- A tired-mode travel assistant
- A preference-aware travel assistant
- A map or places API-powered assistant
- A weather-aware travel assistant

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

## Current Learning Source of Truth

The current protected learning dataset is:

- sample-data/austria-13-day-sanitized.md

This file is not the final product storage method.

It is currently used to learn:

- How itinerary data should be structured
- How a bot retrieves trip information
- How question patterns work
- How itinerary state might be designed later

## Final Product Direction

The final product should manage itinerary state.

That means the product should eventually store the current saved version of the trip, allow user-confirmed edits, preserve version history, and support future sharing.

## Current Status

MVP planning, prompt testing, itinerary state design, and edit workflow design stage.
