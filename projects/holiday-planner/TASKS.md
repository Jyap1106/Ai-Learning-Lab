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
The project direction has shifted from generating new itineraries to building a Holiday Companion Bot that retrieves and explains existing itinerary datasets.

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
Create a bot specification for the Austria Trip Companion Bot.

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
- Food questions
- Tired-mode questions
- Tomorrow's plan
- Cross-day search
- Intercity travel days
- Museum days
- Cafe days

Acceptance Criteria:

- Uses the Austria dataset as source of truth
- Asks for clarification when the day is unknown
- Avoids unsupported facts
- Provides different output styles depending on question type
- Separates dataset information from live information to verify
- Explains ranking criteria when the user asks subjective questions such as "best cafes" or "best museums"

Suggested file:

- prompts/multi-intent-trip-bot.md

---

## Task 12: Create product roadmap

Status: Completed

Goal:
Create a roadmap that shows how the Holiday Companion Bot can evolve into a reusable product by Day 30.

Acceptance Criteria:

- Defines Day 30 product outcome
- Shows Austria as the first MVP dataset
- Explains future multi-trip support
- Includes suggestion planning as a future direction
- Lists next learning milestones

Suggested file:

- ROADMAP.md

---

## Task 13: Test the multi-intent bot prompt

Status: Not started

Goal:
Test the multi-intent prompt against the Day 7 question patterns.

Acceptance Criteria:

- Use the multi-intent prompt
- Test at least 7 question types
- Record detected intent for each question
- Record whether the answer stayed within the dataset
- Identify what worked and what needs improvement

Suggested file:

- test-output/multi-intent-prompt-test.md

---

## Task 14: Create reusable trip dataset template

Status: Not started

Goal:
Create a reusable template for future trip datasets.

Acceptance Criteria:

- Supports any future trip
- Uses consistent metadata
- Uses day-by-day structure
- Includes food, transport, notes, and general tips
- Makes future RAG easier

Suggested file:

- templates/TRIP_DATASET_TEMPLATE.md

---

## Task 15: Add a second sample trip dataset

Status: Not started

Goal:
Add a small fake or sanitized second trip dataset to prove that the bot can support more than Austria.

Acceptance Criteria:

- Use fake or sanitized data only
- Follow the reusable trip dataset template
- Include at least 3 days
- Do not include private travel information

Suggested file:

- sample-data/sample-future-trip-sanitized.md
