# TASKS: Holiday Planner

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

Do not edit:

- README.md
- PRD.md

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

Status: Not started

Goal:
Use the sample itinerary data and planner prompt to generate one test itinerary manually.

Acceptance Criteria:

- Test with one travel request
- Save the generated itinerary
- Note what worked well
- Note what needs improvement

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

- ---

## Task 5: Add Vienna 14-day sanitized itinerary

Status: Not started

Goal:
Create a sanitized Vienna 14-day itinerary dataset for future planner testing.

Acceptance Criteria:

- Use no private booking information
- Remove names, emails, phone numbers, booking codes, and payment details
- Include destination, duration, travel style, activities, food ideas, transport notes, and general tips
- Structure the itinerary by day
- Keep the format consistent with DATASET_GUIDE.md

Suggested file:

- sample-data/vienna-14-day-sanitized.md
