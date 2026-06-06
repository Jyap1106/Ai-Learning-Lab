# Manus V1 Build Prompt

## Purpose

Use this prompt when asking Manus to build the first version of the Holiday Companion Bot.

This prompt is designed to keep the build controlled, continueable, and easy to hand off to another AI if Manus stops midway.

## Prompt

Please build V1 of my Holiday Companion Bot.

Before building, read only these files:

- projects/holiday-planner/BUILD_OUTPUT_LOCATION.md
- projects/holiday-planner/MANUS_V1_BUILD_BRIEF.md
- projects/holiday-planner/V1_BUILD_SPEC.md
- projects/holiday-planner/UI_SPEC.md
- projects/holiday-planner/DATA_LOADING_PLAN.md
- projects/holiday-planner/CHAT_BEHAVIOR_SPEC.md
- projects/holiday-planner/FRONTEND_COMPONENT_PLAN.md
- projects/holiday-planner/sample-data/austria-itinerary-state-sample.json

Do not read the whole repository unless absolutely necessary.

## Build Output Rule

All generated app code must be saved inside:

```text
apps/holiday-companion-v1/
```

Do not place app code inside:

```text
projects/holiday-planner/
```

The `projects/holiday-planner/` folder is for product documentation and planning.

The `apps/holiday-companion-v1/` folder is for the actual working app.

## Protected Files

Do not modify:

```text
projects/holiday-planner/sample-data/austria-13-day-sanitized.md
```

This is the protected full itinerary dataset.

Use the simplified sample state instead:

```text
projects/holiday-planner/sample-data/austria-itinerary-state-sample.json
```

You may copy or convert that simplified sample into the app folder as:

```text
apps/holiday-companion-v1/src/data/austriaItineraryState.ts
```

or a similar local data file.

## Build Version

Build V1 only.

Do not build V2, V3, or V4 features.

## V1 Product Type

V1 is a frontend-only local MVP.

It should not use:

- Real AI calls
- Backend
- Database
- Authentication
- User accounts
- Maps
- Weather
- Live transport
- Booking integrations
- Real sharing links
- PDF export
- Multi-trip management
- Full RAG
- Environment variables
- Paid APIs

## First Manus Run Scope

For this first run, build the static dashboard only.

Build:

- App folder setup
- Header
- Today's Plan card
- Tomorrow's Plan card
- Trip Dashboard
- Full Itinerary List
- Basic layout
- Local sample data import

Do not build yet:

- Chat Assistant
- Prompt Chips
- Proposed Change Card
- Confirm / Reject behavior
- localStorage
- Version update behavior

Those will be built in later runs.

## Required Folder

Create:

```text
apps/holiday-companion-v1/
```

## Required Handoff Files

Inside the app folder, create:

```text
apps/holiday-companion-v1/README.md
apps/holiday-companion-v1/BUILD_HANDOFF.md
apps/holiday-companion-v1/BUILD_LOG.md
apps/holiday-companion-v1/NEXT_STEPS.md
```

## BUILD_HANDOFF.md Must Include

The handoff file must include:

- Current build status
- What was built
- Files created
- Features working
- Features not built yet
- Known issues
- Next recommended build task
- How another AI should continue

## BUILD_LOG.md Must Include

The build log must include:

- Build session date
- Builder: Manus
- Goal of this run
- Files created or edited
- What was completed
- What was intentionally left for later

## NEXT_STEPS.md Must Include

The next steps file must list the next small build tasks.

Suggested next steps:

1. Add Chat Assistant and Prompt Chips.
2. Add mock chat responses.
3. Add Proposed Change Card.
4. Add Confirm / Reject behavior.
5. Add localStorage save and load.
6. Add reset sample trip button.
7. Polish layout.

## App Requirements For This First Run

The app should show:

- Product name: Holiday Companion Bot
- Trip name: Austria Trip
- Current day: Day 2
- Save status
- Today's Plan
- Tomorrow's Plan
- Trip Dashboard
- Full Itinerary List

## Data Requirements

Use the Austria sample state.

At minimum, show:

- Day 2 as today's plan
- Day 3 as tomorrow's plan
- Trip duration
- Current day
- Upcoming days

## Styling Direction

Use a clean, friendly travel dashboard style.

The UI should be readable, practical, and simple.

Avoid heavy animation and unnecessary complexity.

## Output Expectations

After building, summarize:

1. Files created
2. How to run the app
3. What is working
4. What is intentionally not built yet
5. What should be built in the next Manus run
6. Whether all app code was saved inside `apps/holiday-companion-v1/`

## Final Instruction

Build only the first static dashboard slice of V1.

Make it easy for another AI tool or developer to continue from the generated files.
