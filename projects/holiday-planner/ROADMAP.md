# Holiday Companion Bot Roadmap

## Product Outcome by Day 30

By the end of the 30-day learning plan, the target outcome is:

A Holiday Companion Bot MVP that can help a user read, understand, and safely modify a travel itinerary.

The first MVP uses the Austria trip as the working example.

The product should demonstrate the following:

- Itinerary reading
- Today and tomorrow plan answers
- Food, transport, and preparation answers
- Tired-mode alternatives
- Proposed itinerary edits
- Confirmation before saving changes
- Itinerary state design
- Saved itinerary backend plan
- Future sharing workflow plan

## Product Vision

The Holiday Companion Bot should eventually support:

1. Itinerary Builder Mode
2. Trip Companion Mode
3. Itinerary Edit Mode
4. Saved itinerary state
5. Version history
6. Sharing
7. Future preference memory
8. Future suggestion planning

## MVP Scope

The MVP should support:

- Today's plan
- Tomorrow's plan
- Specific day lookup
- Food questions
- Transport questions
- Preparation questions
- Tired-mode questions
- Remove activity
- Replace activity
- Add activity
- Reschedule activity
- Make day lighter
- Proposed itinerary patch
- Confirmation before save
- Saved itinerary state design

## Not in MVP

The MVP should not include:

- Paid APIs
- Live map integration
- Live weather integration
- Booking systems
- Real-time transport tracking
- Payments
- User login
- Multi-user collaboration
- Full database implementation
- Automatic live itinerary optimization
- Multiple trip dataset support as the current focus

## Current Learning Dataset

The current learning dataset is:

- sample-data/austria-13-day-sanitized.md

This file is used to simulate itinerary state.

In the future product, itinerary state should be stored inside the product.

Possible future storage options:

- JSON
- Database
- Backend API
- Local storage for prototype
- User account storage

## Days 8 to 30 Learning Path

## Day 8: Editable Product Direction

Update the product direction from a static trip reader into an editable Holiday Companion Bot.

Output:

- AGENTS.md
- README.md
- PRD.md
- BOT_SPEC.md
- prompts/multi-intent-trip-bot.md
- ITINERARY_STATE_MODEL.md
- EDIT_WORKFLOW.md
- prompts/itinerary-edit-bot.md
- ROADMAP.md
- TASKS.md
- notes/day-08.md

## Day 9: Test Itinerary Edit Commands Manually

Test edit commands such as remove, replace, add, move, and make day lighter.

Output:

- test-output/itinerary-edit-command-tests.md
- notes/day-09.md

## Day 10: Design Saved Itinerary State

Convert the itinerary state model into a more structured example.

Output:

- test-output/itinerary-state-example.md
- notes/day-10.md

## Day 11: Version History Design

Define how itinerary changes should be saved and rolled back.

Output:

- VERSION_HISTORY_DESIGN.md
- notes/day-11.md

## Day 12: Confirmation Flow Design

Define how the user confirms or rejects itinerary changes.

Output:

- CONFIRMATION_FLOW.md
- notes/day-12.md

## Day 13: Backend Persistence Plan

Define how the itinerary could be saved in a future app.

Output:

- BACKEND_PERSISTENCE_PLAN.md
- notes/day-13.md

## Day 14: Week 2 Checkpoint

Review whether the bot can answer and propose itinerary edits safely.

Output:

- test-output/week-2-checkpoint.md
- notes/day-14.md

## Day 15: UI Planning

Design the first simple interface.

Output:

- UI_SPEC.md
- notes/day-15.md

## Day 16: Vercel / v0 Build Prompt

Create a controlled build prompt for a frontend prototype.

Output:

- prompts/vercel-build-prompt.md
- notes/day-16.md

## Day 17: Frontend Prototype

Create a basic UI prototype manually or with Vercel/v0.

Output:

- frontend prototype notes
- notes/day-17.md

## Day 18: Static State Loading Plan

Define how the prototype will load itinerary state without a full backend.

Output:

- DATA_LOADING_PLAN.md
- notes/day-18.md

## Day 19: Chat Interface Behavior

Define how the chat interface should behave.

Output:

- CHAT_BEHAVIOR_SPEC.md
- notes/day-19.md

## Day 20: Itinerary Edit UI Behavior

Define how proposed changes, confirmation, and saved updates should appear in the UI.

Output:

- EDIT_UI_BEHAVIOR.md
- notes/day-20.md

## Day 21: Prototype Checkpoint

Review the prototype and identify what works.

Output:

- test-output/prototype-checkpoint.md
- notes/day-21.md

## Day 22: RAG Concept for This Product

Explain how RAG would work for the Holiday Companion Bot.

Output:

- RAG_DESIGN.md
- notes/day-22.md

## Day 23: Retrieval Strategy

Define how to retrieve the right day, activity, city, or edit target.

Output:

- RETRIEVAL_STRATEGY.md
- notes/day-23.md

## Day 24: Manual Retrieval Evaluation

Test whether retrieval works for read and edit tasks.

Output:

- test-output/retrieval-evaluation.md
- notes/day-24.md

## Day 25: Bot Evaluation Set

Create a set of questions and edit commands to evaluate the bot.

Output:

- EVALUATION_SET.md
- notes/day-25.md

## Day 26: Suggestion Planning Mode Design

Design the future mode that can build or suggest new itineraries.

Output:

- SUGGESTION_PLANNING_MODE.md
- notes/day-26.md

## Day 27: Cost and API Safety Plan

Define what can be done free and what should require paid API controls.

Output:

- COST_AND_API_SAFETY_PLAN.md
- notes/day-27.md

## Day 28: Portfolio Case Study Draft

Write the product story.

Output:

- CASE_STUDY.md
- notes/day-28.md

## Day 29: Final Polish

Clean README, examples, docs, and demo flow.

Output:

- polished project docs
- notes/day-29.md

## Day 30: Final Demo and Readiness Review

Create final summary and next 60-day roadmap.

Output:

- FINAL_DEMO.md
- notes/day-30.md

## Day 30 Success Definition

The project is successful if it has:

- A structured Austria trip itinerary
- A clear Holiday Companion Bot PRD
- A bot spec
- A multi-intent prompt
- An itinerary edit prompt
- Manual read-question tests
- Manual edit-command tests
- Itinerary state model
- Edit workflow design
- Backend persistence plan
- UI behavior plan
- Final product roadmap
- Portfolio-ready case study
