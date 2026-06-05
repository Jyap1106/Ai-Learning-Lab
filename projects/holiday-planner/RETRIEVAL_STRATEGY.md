# Retrieval Strategy

## Purpose

This file defines how the Holiday Companion Bot should retrieve the right itinerary information before answering a question or proposing an edit.

The goal is to avoid sending the whole itinerary to the AI every time.

A good retrieval strategy helps reduce token usage, improve accuracy, and keep the product focused.

## Core Idea

The bot should retrieve only the relevant part of itinerary state.

Example:

```text
User asks: What is today's plan?
Retrieve: current day only
```

```text
User asks: What is tomorrow's plan?
Retrieve: current day + next day
```

```text
User asks: What food is planned today?
Retrieve: current day's food section
```

```text
User asks: Replace Upper Belvedere with something lighter.
Retrieve: current day + affected activity + related food or lighter options
```

## Why Retrieval Matters

Without retrieval strategy, the product may:

- Send too much data to the AI
- Waste tokens
- Increase cost
- Get less accurate answers
- Mix up days
- Modify the wrong activity
- Invent unsupported details

With retrieval strategy, the product can:

- Find the right day
- Find the right activity
- Find the right section
- Ask for clarification when needed
- Keep responses grounded in itinerary state

## Retrieval Source

For the MVP, the retrieval source is local itinerary state.

The current learning dataset is:

```text
sample-data/austria-13-day-sanitized.md
```

But in the frontend prototype, this should eventually become structured local data such as:

```text
itineraryState.days
```

## Retrieval Flow

The general retrieval flow is:

```text
User message
↓
Intent classification
↓
Determine retrieval target
↓
Retrieve relevant itinerary section
↓
Generate response or proposed change
↓
Ask clarification if target is unclear
```

## Step 1: Classify Intent

The bot should classify the user message.

Supported retrieval intents:

- Today's plan
- Tomorrow's plan
- Specific day lookup
- Food question
- Transport question
- Preparation question
- Tired-mode question
- Remove activity
- Replace activity
- Add activity
- Reschedule activity
- Cross-day search
- Share itinerary
- Clarification needed

## Step 2: Determine Retrieval Target

The retrieval target could be:

- Current day
- Tomorrow
- Specific day
- Specific city
- Specific activity
- Food section
- Transport section
- Notes section
- Full itinerary summary
- Version history
- Shareable itinerary snapshot

## Step 3: Retrieve Relevant Data

The system should retrieve only what is needed.

Examples:

```text
Today's plan → currentDay object
Food question → currentDay.food
Transport question → currentDay.transport
Replace activity → currentDay + activity match
Move to tomorrow → currentDay + tomorrowDay + activity match
Cross-day cafe search → all days' food sections
```

## Step 4: Ask Clarification When Needed

If the retrieval target is unclear, the bot should ask a short clarification question.

Example:

```text
Which day should I update?
```

```text
Which activity would you like to replace?
```

```text
Do you mean Day 2 or Day 3?
```

## Retrieval Rules

## Rule 1: Do Not Retrieve Everything by Default

Avoid sending the full itinerary unless the user asks for a full summary or cross-day search.

## Rule 2: Prefer Current Day

If the user says:

```text
today
```

retrieve the current day.

If current day is unknown, ask for clarification.

## Rule 3: Tomorrow Is Current Day + 1

If user asks for tomorrow, retrieve:

```text
currentDay + 1
```

If current day is unknown, ask for clarification.

## Rule 4: Specific Day Beats Current Day

If the user says:

```text
Day 5
```

retrieve Day 5 even if current day is Day 2.

## Rule 5: Activity Lookup Needs Matching

If the user mentions an activity, search the current day first.

If not found, search all days and ask clarification if multiple matches exist.

## Rule 6: Cross-Day Search Can Scan All Days

Cross-day questions may require scanning the whole itinerary.

Examples:

```text
Which days involve intercity travel?
Which days are best for cafes?
Which days are museum-heavy?
```

Even then, retrieve only relevant sections such as theme, food, transport, and notes.

## Day Lookup Strategy

## Current Day Lookup

Input:

```text
currentDay = 2
```

Retrieve:

```text
days.find(dayNumber == 2)
```

## Tomorrow Lookup

Input:

```text
currentDay = 2
```

Retrieve:

```text
days.find(dayNumber == 3)
```

## Specific Day Lookup

Input:

```text
User asks for Day 7
```

Retrieve:

```text
days.find(dayNumber == 7)
```

## Activity Lookup Strategy

If user says:

```text
Replace Upper Belvedere.
```

The system should:

1. Search current day activities.
2. If found, use that activity.
3. If not found, search all days.
4. If found in one day, ask if that is the intended activity.
5. If found in multiple days, list possible matches.
6. If not found, ask the user to clarify.

## Activity Matching Fields

Search across:

- morning
- afternoon
- evening
- food
- transport
- notes
- theme

## Food Retrieval Strategy

Food questions should retrieve:

- currentDay.food
- currentDay.notes if food-related
- nearby time block if relevant

Do not invent restaurant availability.

Use "Verify Live" for:

- opening hours
- reservations
- current location
- crowd levels
- prices

## Transport Retrieval Strategy

Transport questions should retrieve:

- currentDay.transport
- currentDay.notes if transport-related
- intercity travel day sections if relevant

Do not invent exact route numbers, travel durations, or disruptions unless they exist in the data.

## Tired-Mode Retrieval Strategy

Tired-mode questions should retrieve:

- current day
- list of major activities
- optional notes
- food/rest options
- transport notes

The bot should suggest lighter alternatives, but should not save changes unless user confirms.

## Edit Retrieval Strategy

For edit requests, retrieve:

- affected day
- affected activity
- related time block
- related food or transport if relevant
- tomorrow day if rescheduling to tomorrow
- version history if needed later

## Remove Activity Retrieval

User:

```text
Remove Schönbrunn from Day 2.
```

Retrieve:

- Day 2
- Schönbrunn activity
- Day 2 structure

## Replace Activity Retrieval

User:

```text
Replace Upper Belvedere with something lighter.
```

Retrieve:

- Day 2
- Upper Belvedere
- Day 2 food and notes
- possible lighter options

## Add Activity Retrieval

User:

```text
Add a cafe break to Day 2.
```

Retrieve:

- Day 2
- Day 2 food section
- current day schedule

## Reschedule Activity Retrieval

User:

```text
Move Karlskirche to tomorrow.
```

Retrieve:

- Current day
- Karlskirche activity
- Tomorrow day

## Cross-Day Search Strategy

Cross-day search should retrieve compact summaries, not full days.

For each day, retrieve:

- dayNumber
- city
- theme
- food
- transport
- notes

This is enough for questions like:

```text
Which days are best for cafes?
Which days involve intercity travel?
Which days are museum-heavy?
```

## Share Retrieval Strategy

For sharing, retrieve the current saved itinerary state.

Then remove:

- private notes
- version history
- preference memory
- booking details
- payment details
- contact information

Sharing should use a clean snapshot, not raw state.

## Retrieval Output Format

A retrieval function could return:

```json
{
  "intent": "food_question",
  "retrievalTarget": "current_day_food",
  "dayNumber": 2,
  "retrievedSections": {
    "food": [],
    "notes": []
  },
  "missingInformation": [],
  "needsClarification": false
}
```

## Clarification Output Format

If clarification is needed:

```json
{
  "intent": "replace_activity",
  "needsClarification": true,
  "clarificationQuestion": "Which activity would you like to replace?"
}
```

## MVP Retrieval Strategy

For the first prototype, retrieval can be simple and hardcoded.

The app can use:

```text
currentDay
tomorrowDay
selectedDay
mock prompt chip handlers
```

No real RAG is needed yet.

## Future RAG Strategy

Later, if itinerary data becomes larger, the product could use RAG.

RAG could help retrieve:

- relevant day
- relevant activity
- relevant food section
- relevant transport notes
- relevant version history
- relevant user preferences

But the first MVP should not need vector databases.

## Future Tool Functions

Possible future retrieval tools:

```text
get_current_day(trip_id)
get_day_plan(trip_id, day_number)
get_tomorrow_plan(trip_id, current_day)
find_activity(trip_id, activity_name)
get_food_options(trip_id, day_number)
get_transport_notes(trip_id, day_number)
search_days_by_keyword(trip_id, keyword)
get_shareable_snapshot(trip_id)
```

## Token-Saving Principle

Retrieve small sections first.

Only retrieve more if needed.

Example:

```text
Food question → retrieve food section only
Edit question → retrieve affected day and activity
Cross-day search → retrieve compact day summaries
Full summary → retrieve full itinerary
```

## Safety Rules

- Do not invent missing details.
- Ask clarification when target is unclear.
- Keep live information under "Verify Live".
- Do not use private data.
- Do not modify itinerary state during retrieval.
- Retrieval should be read-only.
- Edits should happen only after confirmation.

## Key Lesson

Retrieval is how the bot finds the right context.

Good retrieval makes the product cheaper, more accurate, and safer.

The product should not always send the whole itinerary to the AI.

It should retrieve what is needed, then answer or propose a change.
