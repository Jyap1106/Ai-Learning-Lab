# Holiday Companion Bot Roadmap

## Product Outcome by Day 30

By the end of the 30-day learning plan, the target outcome is:

A Holiday Companion Bot MVP plan that explains how an AI travel product can read, explain, edit, save, and eventually share a travel itinerary.

The first MVP uses the Austria trip as the working example.

## Product Vision

The Holiday Companion Bot should eventually support:

1. Itinerary Builder Mode
2. Trip Companion Mode
3. Itinerary Edit Mode
4. Saved itinerary state
5. Backend save behavior
6. Version history
7. Confirmation flow
8. Sharing workflow
9. Future preference memory
10. Future suggestion planning

## Current MVP Scope

The MVP should support the design of:

- Today's plan
- Tomorrow's plan
- Specific day lookup
- Food questions
- Transport questions
- Preparation questions
- Tired-mode questions
- Remove activity request
- Replace activity request
- Add activity request
- Reschedule activity request
- Proposed itinerary changes
- Confirmation before saving changes
- Saved itinerary state
- Backend save behavior
- Version history
- Future sharing workflow

## Not in MVP

The MVP should not include:

- Paid APIs
- Live map integration
- Live weather integration
- Booking systems
- Real-time transport tracking
- Automatic live ticket checking
- User login
- Payments
- Full database implementation
- Multiple trip dataset management as the current focus

These can be future improvements.

## Current Learning Dataset

The current protected learning dataset is:

- sample-data/austria-13-day-sanitized.md

This file is used to test the bot behavior.

It is not the final product storage method.

## Future Product Storage

In the final product, itinerary state should be stored in a system such as:

- JSON
- Local state for prototype
- Backend API
- Database
- User account storage

## Days 8 to 30 Learning Path

## Day 8: Editable Holiday Companion Bot Direction

Define the updated product direction.

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

## Day 9: AI Tool Backbone and Skill Map

Define the backbone of the AI product.

Output:

- AI_TOOL_BACKBONE.md
- SKILL_TOOL_MAP.md
- notes/day-09.md

## Day 10: Backend Save Behavior

Define how confirmed itinerary changes should be saved.

Output:

- BACKEND_SAVE_BEHAVIOR.md
- notes/day-10.md

## Day 11: Version History Design

Define how itinerary changes should be tracked and restored.

Output:

- VERSION_HISTORY.md
- notes/day-11.md

## Day 12: Confirmation Flow Design

Define how the user confirms, rejects, or revises itinerary changes.

Output:

- CONFIRMATION_FLOW.md
- notes/day-12.md

## Day 13: Sharing Workflow Design

Define how saved itineraries could be shared later.

Output:

- SHARING_WORKFLOW.md
- notes/day-13.md

## Day 14: Backbone Checkpoint

Review the product backbone.

Output:

- CHECKPOINT_DAY_14.md
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

## Day 17: Data Loading Plan

Define how the prototype will load itinerary state.

Output:

- DATA_LOADING_PLAN.md
- notes/day-17.md

## Day 18: Chat Interface Behavior

Define how the chat interface should behave.

Output:

- CHAT_BEHAVIOR_SPEC.md
- notes/day-18.md

## Day 19: Retrieval Strategy

Define how to retrieve the right day, city, activity, or edit target.

Output:

- RETRIEVAL_STRATEGY.md
- notes/day-19.md

## Day 20: Cost and API Safety Plan

Define what can be done free and what should require paid API controls.

Output:

- COST_AND_API_SAFETY_PLAN.md
- notes/day-20.md

## Day 21: Prototype Checkpoint

Review the planned prototype behavior.

Output:

- PROTOTYPE_CHECKPOINT.md
- notes/day-21.md

## Day 22: RAG Concept for This Product

Explain how RAG would work for the Holiday Companion Bot.

Output:

- RAG_DESIGN.md
- notes/day-22.md

## Day 23: Tool and Function Design

Define future backend tools and function calls.

Output:

- TOOL_FUNCTION_DESIGN.md
- notes/day-23.md

## Day 24: Agent Workflow Design

Define how the bot could become more agentic.

Output:

- AGENT_WORKFLOW_DESIGN.md
- notes/day-24.md

## Day 25: Evaluation Set

Create a compact evaluation set for the final product.

Output:

- EVALUATION_SET.md
- notes/day-25.md

## Day 26: Future Suggestion Planning Mode Design

Design the future mode that can build or suggest new itineraries.

Output:

- SUGGESTION_PLANNING_MODE.md
- notes/day-26.md

## Day 27: Product Requirements Review

Review whether the PRD, bot spec, state model, and workflows align.

Output:

- PRODUCT_REVIEW.md
- notes/day-27.md

## Day 28: Portfolio Case Study Draft

Write the product story.

Output:

- CASE_STUDY.md
- notes/day-28.md

## Day 29: Final Polish

Clean README, docs, examples, and demo flow.

Output:

- FINAL_POLISH.md
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
- AI tool backbone design
- Skill and tool map
- Itinerary state model
- Edit workflow design
- Backend save behavior
- Version history design
- Confirmation flow
- Sharing workflow
- UI behavior plan
- Retrieval strategy
- Cost and API safety plan
- Portfolio-ready case study

## Future After Day 30

After the MVP plan, the product can explore:

- Building the Vercel prototype
- Saving itinerary state in a real backend
- Adding user accounts
- Uploading new itineraries
- Suggestion planning
- Live APIs
- Weather integration
- Map integration
- Sharing links
