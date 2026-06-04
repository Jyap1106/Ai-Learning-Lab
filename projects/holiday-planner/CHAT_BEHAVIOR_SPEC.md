# Chat Behavior Specification

## Purpose

This file defines how the Holiday Companion Bot chat assistant should behave in the first frontend MVP.

The goal is to design chat behavior before adding real AI calls.

The first prototype can use mock responses and quick actions to reduce cost and avoid unnecessary AI usage.

## Core Idea

The chat assistant should help the user:

- Understand today's plan
- Understand tomorrow's plan
- Ask food questions
- Ask transport questions
- Ask what can be skipped
- Request itinerary changes
- Preview proposed changes
- Confirm or reject changes

## MVP Chat Strategy

For the first MVP, the chat assistant should be:

```text
Mocked first
AI later
```

This means the app can simulate common bot responses without calling a real AI API.

## Why Mock Chat First?

Mock chat helps prove the product experience before spending money or credits.

It helps validate:

- Layout
- User flow
- Prompt chips
- Proposed change preview
- Confirm/reject flow
- Local save behavior
- Version history behavior

Real AI can be added later after the interface works.

## Chat Location

The chat assistant should appear near the bottom of the main layout.

It should be easy to access while the user is viewing today's plan.

## Chat Placeholder

Use this placeholder:

```text
Ask about your trip or request a change...
```

## Quick Prompt Chips

The chat assistant should show quick prompt chips.

Initial chips:

```text
What's today's plan?
What is tomorrow's plan?
What food is planned today?
What transport notes should I know?
What can I skip if I am tired?
Make today lighter
Add a cafe break
Replace an activity
Move this to tomorrow
```

## Supported Chat Intents

The MVP should support these intent types:

1. Today's plan
2. Tomorrow's plan
3. Food question
4. Transport question
5. Tired-mode question
6. Make day lighter
7. Add activity
8. Replace activity
9. Reschedule activity
10. Clarification needed

## Intent 1: Today's Plan

User examples:

```text
What's today's plan?
```

```text
What should I do today?
```

Mock behavior:

- Read current day from local state
- Summarize day theme
- List main activities
- Include food ideas
- Include transport notes

Response type:

```text
read_only_answer
```

## Intent 2: Tomorrow's Plan

User examples:

```text
What is tomorrow's plan?
```

```text
What should I prepare for tomorrow?
```

Mock behavior:

- Calculate tomorrow as currentDay + 1
- Show tomorrow's day theme
- List main activities
- Include food or transport notes if available

Response type:

```text
read_only_answer
```

## Intent 3: Food Question

User examples:

```text
What food is planned today?
```

```text
Where should I eat today?
```

Mock behavior:

- Read current day's food array
- Show food and cafe ideas
- Add verify-live reminder for restaurant availability

Response type:

```text
read_only_answer
```

## Intent 4: Transport Question

User examples:

```text
What transport notes should I know?
```

```text
How do I get around today?
```

Mock behavior:

- Read current day's transport notes
- Show general transport reminders
- Avoid exact live routes unless provided in data
- Add verify-live reminder

Response type:

```text
read_only_answer
```

## Intent 5: Tired-Mode Question

User examples:

```text
What can I skip if I am tired?
```

```text
Is today too packed?
```

Mock behavior:

- Identify major activities in current day
- Suggest keeping one or two main items
- Suggest making optional items flexible
- Do not update itinerary unless user confirms an edit

Response type:

```text
suggestion_answer
```

## Intent 6: Make Day Lighter

User examples:

```text
Make today lighter.
```

```text
Reduce today's plan.
```

Mock behavior:

- Create proposed change
- Suggest 2 to 3 alternatives
- Include relax/free-time option
- Show proposed change preview
- Ask for confirmation

Response type:

```text
proposed_change
```

## Intent 7: Add Activity

User examples:

```text
Add a cafe break.
```

```text
Add one relaxed food stop.
```

Mock behavior:

- Create proposed change
- Add the activity into a suitable time block
- Show impact on the day
- Ask for confirmation

Response type:

```text
proposed_change
```

## Intent 8: Replace Activity

User examples:

```text
Replace Upper Belvedere with something lighter.
```

```text
Replace this activity with a cafe.
```

Mock behavior:

- Ask for activity clarification if the activity is missing
- Create proposed change
- Show 2 to 3 alternatives
- Include relax/free-time option
- Ask for confirmation

Response type:

```text
proposed_change
```

## Intent 9: Reschedule Activity

User examples:

```text
Move Karlskirche to tomorrow.
```

```text
Move this to the evening.
```

Mock behavior:

- Identify affected activity
- Identify target day or time
- Ask clarification if target is missing
- Create proposed change
- Ask for confirmation

Response type:

```text
proposed_change
```

## Intent 10: Clarification Needed

User examples:

```text
Replace this.
```

```text
Move it.
```

Mock behavior:

Ask a short clarification question.

Example:

```text
Which activity would you like to replace?
```

Response type:

```text
clarification
```

## Chat Response Types

The MVP should support these response types:

```text
read_only_answer
suggestion_answer
proposed_change
clarification
system_status
```

## Read-Only Answer Format

Use this for today's plan, tomorrow's plan, food, and transport.

```text
Quick Summary:
...

Details:
...

Food:
...

Transport:
...

Verify Live:
...
```

## Suggestion Answer Format

Use this for tired-mode questions that do not directly request saving.

```text
Suggestion:
...

Recommended lighter approach:
...

Optional items:
...

Verify Live:
...
```

## Proposed Change Format

Use this for edit requests.

```text
Proposed Change:
...

Affected Day:
...

Current Item:
...

Options:
1. ...
2. ...
3. Leave this time as relax/free time

Impact:
...

Confirm this change?
```

## Clarification Format

Use this when the request is incomplete.

```text
I need one detail before I can propose the change:

Which activity would you like to replace?
```

## Proposed Change Card Trigger

The app should show the ProposedChangeCard when response type is:

```text
proposed_change
```

The ProposedChangeCard should include:

- Detected intent
- Affected day
- Current item
- Proposed options
- Impact
- Confirm button
- Reject button

## Confirm Behavior

When the user confirms a proposed change:

```text
Apply proposed change to local itinerary state
Save to localStorage
Add version history entry
Clear proposed change
Show saved locally status
Add confirmation message to chat
```

Confirmation message:

```text
Saved locally. Your itinerary has been updated in this prototype.
```

This is acceptable only after local state has actually updated.

## Reject Behavior

When the user rejects a proposed change:

```text
Clear proposed change
Do not update itinerary
Add rejection message to chat
```

Rejection message:

```text
No changes were saved.
```

## Revise Behavior

Revise behavior can be future work.

For MVP, the app can say:

```text
Revision is a future feature. Please ask for a new change.
```

## Mock Chat Responses

The first prototype can hardcode responses for these chips:

```text
What's today's plan?
What is tomorrow's plan?
What food is planned today?
What transport notes should I know?
What can I skip if I am tired?
Make today lighter
Add a cafe break
Replace an activity
```

## Chat Message Object

Suggested message shape:

```json
{
  "id": "msg-001",
  "role": "user",
  "content": "What's today's plan?",
  "timestamp": "2026-06-04T10:00:00Z",
  "responseType": "read_only_answer"
}
```

Assistant message shape:

```json
{
  "id": "msg-002",
  "role": "assistant",
  "content": "Today focuses on Vienna culture, cafes, and transport notes.",
  "timestamp": "2026-06-04T10:00:05Z",
  "responseType": "read_only_answer",
  "source": "local_itinerary_state"
}
```

## Proposed Change Object

Suggested object:

```json
{
  "id": "change-001",
  "type": "replace_activity",
  "affectedDay": 2,
  "currentItem": "Upper Belvedere",
  "options": [
    "Relaxed cafe break near Karlsplatz",
    "Short scenic walk",
    "Leave this time as relax/free time"
  ],
  "selectedOption": null,
  "status": "awaiting_confirmation"
}
```

## Live Information Rule

The chat assistant should not invent live details.

Do not invent:

- Weather
- Opening hours
- Ticket availability
- Public transport disruptions
- Restaurant availability
- Prices
- Exact travel times

Use:

```text
Verify Live
```

for these items.

## No Real AI in First Prototype

The first prototype should not require real AI calls.

This avoids:

- API cost
- Token usage
- Latency
- Hallucinated responses
- Complex backend setup

Real AI can be added later when the product flow works.

## Future AI Behavior

Later, the chat assistant can use:

- Multi-intent prompt
- Itinerary edit prompt
- Retrieval over itinerary state
- Tool calls
- Backend functions
- RAG
- Live APIs with cost controls

## MVP Success Criteria

The chat behavior is successful if the prototype can:

- Display chat messages
- Respond to quick prompt chips
- Show today's plan
- Show tomorrow's plan
- Show food notes
- Show transport notes
- Generate a mock proposed change
- Confirm or reject the mock change
- Save confirmed changes locally
- Avoid real AI calls

## Key Lesson

The chat assistant is not just a text box.

It is the control surface for the product.

It lets the user read the itinerary, request changes, confirm edits, and eventually control the saved itinerary state.
