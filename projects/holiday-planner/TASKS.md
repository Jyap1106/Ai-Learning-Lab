# TASKS: Holiday Companion Bot

## Task 1: Create sample itinerary data

Status: Completed

Goal:
Create a small sanitized itinerary example that can be used for testing.

Acceptance Criteria:

- Use no private booking information
- Include destination, duration, travel style, activities, food ideas, and notes
- Keep the format easy to read
- Use Markdown first

Suggested file:

- sample-data/sample-itinerary.md

---

## Task 2: Create itinerary planner prompt

Status: Completed

Goal:
Create a reusable prompt that turns user preferences and itinerary examples into a day-by-day travel plan.

Acceptance Criteria:

- Prompt asks for destination, duration, budget, travel style, and preferences
- Output includes day-by-day itinerary
- Output includes assumptions
- Output avoids inventing exact facts not provided
- Prompt can use sample itinerary data

Suggested file:

- prompts/itinerary-planner.md

---

## Task 3: Test the planner manually

Status: Parked

Goal:
Use the sample itinerary data and itinerary planner prompt to generate one test itinerary manually.

Reason Parked:
The project direction has shifted from generating new itineraries to building a Holiday Companion Bot that can read, explain, edit, and save itinerary state.

Suggested file:

- test-output/first-generated-itinerary.md

---

## Task 4: Create dataset guide

Status: Completed

Goal:
Document how itinerary data should be cleaned and stored.

Acceptance Criteria:

- Explain what data is safe to store
- Explain what data should be removed
- Define a simple itinerary format
- Prepare for future RAG usage

Suggested file:

- DATASET_GUIDE.md

---

## Task 5: Add Austria 13-day sanitized itinerary

Status: Completed

Goal:
Create a sanitized Austria itinerary dataset for future bot testing.

Acceptance Criteria:

- Use no private booking information
- Remove names, emails, phone numbers, booking codes, payment details, and passport details
- Include destination, duration, travel style, activities, food ideas, transport notes, and general tips
- Structure the itinerary by day
- Keep the format consistent with DATASET_GUIDE.md
- Use proper Markdown headings and line breaks

Suggested file:

- sample-data/austria-13-day-sanitized.md

---

## Task 6: Define trip companion bot spec

Status: Completed

Goal:
Create a bot specification for the first Austria Trip Companion Bot.

Acceptance Criteria:

- Explain the bot purpose
- Define the main user flow
- List example user questions
- Define answer style
- Define source of truth
- Define important rules

Suggested file:

- BOT_SPEC.md

---

## Task 7: Create today's plan bot prompt

Status: Completed

Goal:
Create a reusable prompt that answers "What's today's plan?" using the Austria itinerary dataset.

Acceptance Criteria:

- Uses the Austria itinerary as source of truth
- Includes user question and current trip context
- Outputs highlights, timeline, food, transport, preparation, and live verification reminders
- Avoids inventing opening hours, prices, or live transport details

Suggested file:

- prompts/today-plan-bot.md

---

## Task 8: Manually test the bot with Day 2

Status: Completed

Goal:
Test whether the bot can retrieve and explain Day 2 from the Austria itinerary dataset.

Acceptance Criteria:

- Use the question: "What's today's plan?"
- Use Day 2 from the Austria dataset
- Output includes Schönbrunn, Belvedere, Wien Museum, and Karlskirche
- Output includes food suggestions
- Output includes transport notes
- Output includes things to prepare
- Output includes things to verify live
- Avoid exact times, routes, durations, rankings, or claims not present in the dataset

Suggested file:

- test-output/day-2-today-plan-test.md

---

## Task 9: Create trip day mapping rule

Status: Completed

Goal:
Define how the bot should know which itinerary day is "today."

Acceptance Criteria:

- Option 1: User manually says the day number
- Option 2: User provides trip start date and current date
- Bot calculates trip day
- Bot asks for clarification if the day is unknown

Suggested file:

- TRIP_DAY_MAPPING.md

---

## Task 10: Test more bot question patterns

Status: Completed

Goal:
Test whether the bot can answer different travel-assistant questions using the Austria dataset.

Example questions:

- What food is planned today?
- Is today a heavy day?
- What can I skip if I am tired?
- What is tomorrow's plan?
- Which days involve intercity travel?
- Which days are best for cafes?
- Which days are best for museums?

Acceptance Criteria:

- Test at least 5 question patterns
- Use only the Austria dataset
- Do not use outside knowledge
- Save the results
- Note what worked and what needs improvement
- Avoid exact times, routes, durations, rankings, or claims not present in the dataset

Suggested file:

- test-output/bot-question-pattern-tests.md

---

## Task 11: Create multi-intent bot prompt

Status: Completed

Goal:
Create a stricter prompt that helps the bot handle multiple question types.

Supported question types:

- Today's plan
- Tomorrow's plan
- Food questions
- Transport questions
- Preparation questions
- Tired-mode questions
- Remove activity
- Replace activity
- Add activity
- Reschedule activity

Acceptance Criteria:

- Uses the Austria dataset as source of truth
- Asks for clarification when the day is unknown
- Avoids unsupported facts
- Provides different output styles depending on question type
- Separates dataset information from live information to verify
- Explains ranking criteria when the user asks subjective questions
- Proposes itinerary changes without claiming they are saved

Suggested file:

- prompts/multi-intent-trip-bot.md

---

## Task 12: Create product roadmap

Status: Completed

Goal:
Create a roadmap that shows how the Holiday Companion Bot can evolve into an editable itinerary product by Day 30.

Acceptance Criteria:

- Defines Day 30 product outcome
- Shows Austria as the first MVP trip
- Explains itinerary state
- Includes itinerary edit workflow
- Includes saved-state design
- Includes next learning milestones

Suggested file:

- ROADMAP.md

---

## Task 13: Define itinerary state model

Status: Completed

Goal:
Define the future itinerary state model for the Holiday Companion Bot.

Acceptance Criteria:

- Defines itinerary state
- Explains why Markdown is only a learning format
- Lists future storage options
- Defines trip-level fields
- Defines day-level fields
- Defines activity-level fields
- Defines version history
- Defines user preferences

Suggested file:

- ITINERARY_STATE_MODEL.md

---

## Task 14: Define itinerary edit workflow

Status: Completed

Goal:
Define how the bot should handle itinerary edit requests.

Acceptance Criteria:

- Explains remove activity
- Explains replace activity
- Explains add activity
- Explains reschedule activity
- Explains make-day-lighter behavior
- Requires confirmation before saving changes
- Defines proposed change format

Suggested file:

- EDIT_WORKFLOW.md

---

## Task 15: Create itinerary edit bot prompt

Status: Completed

Goal:
Create a reusable prompt for itinerary edit requests.

Acceptance Criteria:

- Uses itinerary state or dataset as source of truth
- Classifies edit type
- Identifies affected day
- Identifies affected activity
- Produces a proposed change
- Asks for confirmation
- Avoids claiming changes are saved before confirmation

Suggested file:

- prompts/itinerary-edit-bot.md

---

## Task 16: Test itinerary edit commands manually

Status: Parked

Goal:
Test whether the bot can safely handle itinerary edit commands.

Reason Parked:
Testing will be grouped into future checkpoint days instead of being the daily focus.

Suggested file:

- test-output/itinerary-edit-command-tests.md

---

## Task 17: Define AI tool backbone

Status: Completed

Goal:
Explain the backbone of the Holiday Companion Bot as an AI product.

Acceptance Criteria:

- Explains user interface
- Explains prompt layer
- Explains intent classification
- Explains skills
- Explains tools or actions
- Explains itinerary state
- Explains backend storage
- Explains safety rules
- Explains testing checkpoints

Suggested file:

- AI_TOOL_BACKBONE.md

---

## Task 18: Create skill and tool map

Status: Completed

Goal:
Map the skills and future tools needed for the Holiday Companion Bot.

Acceptance Criteria:

- Defines prompt, skill, tool, workflow, state, and Markdown files
- Lists current skills
- Lists future tools
- Groups skills into read, edit, save, and future categories
- Explains how Markdown files help build AI products

Suggested file:

- SKILL_TOOL_MAP.md

---

## Task 19: Design backend save behavior

Status: Completed

Goal:
Define how confirmed itinerary edits could be saved in a future app.

Acceptance Criteria:

- Defines storage options
- Explains MVP option
- Explains future backend option
- Includes version history concept
- Explains save flow
- Defines save states
- Avoids paid APIs for now

Suggested file:

- BACKEND_SAVE_BEHAVIOR.md

---

## Task 20: Design version history behavior

Status: Completed

Goal:
Define how the product should track, compare, and restore itinerary versions.

Acceptance Criteria:

- Defines version history purpose
- Defines version entry fields
- Explains before and after snapshots
- Explains rollback or restore behavior
- Keeps version history simple for MVP

Suggested file:

- VERSION_HISTORY.md

---

## Task 21: Design confirmation flow

Status: Completed

Goal:
Define how the user confirms, rejects, or revises proposed itinerary changes.

Acceptance Criteria:

- Defines confirm flow
- Defines reject flow
- Defines revise flow
- Explains UI states
- Prevents accidental saves
- Connects confirmation to version history

Suggested file:

- CONFIRMATION_FLOW.md

---

## Task 22: Design sharing workflow

Status: Not started

Goal:
Define how a user could share the final itinerary later.

Acceptance Criteria:

- Defines shareable itinerary concept
- Includes public/private options
- Includes what data should not be shared
- Includes future share link idea

Suggested file:

- SHARING_WORKFLOW.md

---

## Task 23: Design UI behavior

Status: Not started

Goal:
Define how the first user interface should behave.

Acceptance Criteria:

- Defines main screens
- Defines chat behavior
- Defines today/tomorrow plan cards
- Defines proposed change preview
- Defines confirm/reject buttons

Suggested file:

- UI_SPEC.md

---

## Task 24: Create backbone checkpoint

Status: Not started

Goal:
Review the product backbone before moving into UI and prototype planning.

Acceptance Criteria:

- Reviews PRD
- Reviews bot spec
- Reviews itinerary state model
- Reviews backend save behavior
- Reviews version history
- Reviews confirmation flow
- Identifies gaps before UI planning

Suggested file:

- CHECKPOINT_DAY_14.md
