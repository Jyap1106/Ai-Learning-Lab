# Holiday Companion Bot Roadmap

## Product Outcome by Day 30

By the end of the 30-day learning plan, the target outcome is:

A working Holiday Companion Bot MVP that can answer practical trip questions using a structured itinerary dataset.

The first version will use the Austria 13-day sanitized itinerary dataset.

The system should be designed so future trips can be added later using the same dataset format.

## Product Vision

The Holiday Companion Bot should eventually support:

1. Trip companion mode
2. Multi-trip dataset support
3. RAG-style retrieval
4. Simple web app interface
5. Future suggestion planning mode

## MVP Scope

The MVP should support:

- Today's plan
- Specific day lookup
- Food questions
- Tired-mode questions
- Tomorrow's plan
- Intercity travel search
- Museum or culture search
- Cafe or food search
- Preparation questions
- Live verification reminders

## Not in MVP

The MVP should not include:

- Paid APIs
- Live map integration
- Live weather integration
- Booking systems
- Real-time transport tracking
- Automatic itinerary generation from scratch
- Private travel data storage
- User login
- Payments

## Dataset Strategy

The first dataset is:

- sample-data/austria-13-day-sanitized.md

Future datasets should follow the same structure:

```text
sample-data/[destination-or-trip-name]-sanitized.md
