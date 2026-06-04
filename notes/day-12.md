# Day 12 Notes: Confirmation Flow Design

## What I worked on today

Today I designed how the Holiday Companion Bot should ask for confirmation before saving itinerary changes.

The focus was confirmation flow.

## File Created

Today I created:

- projects/holiday-planner/CONFIRMATION_FLOW.md

## Core Concept

The bot should not save itinerary changes immediately.

The safe flow is:

```text
User asks for change
↓
Bot proposes change
↓
User confirms, rejects, or revises
↓
Backend saves only confirmed changes
↓
Version history records the saved change
```

## Why This Matters

Travel plans are important.

A bad change can affect:

- Tickets
- Timing
- Food plans
- Transport
- Daily route
- Travel companions
- User trust

The bot should keep the user in control.

## Confirmation States

The product should understand states such as:

- no_change_requested
- change_requested
- proposal_generated
- awaiting_confirmation
- confirmed
- rejected
- revision_requested
- saving
- saved
- save_failed

These states make the product safer and easier to reason about.

## Confirm, Reject, Revise

The user should be able to:

```text
Confirm
```

to save the proposed change.

```text
Reject
```

to keep the itinerary unchanged.

```text
Revise
```

to ask for a different proposal.

## Important Rule

The bot should not say:

```text
Your itinerary has been updated.
```

until the backend has actually saved the update.

Before confirmation, the bot should say:

```text
Here is the proposed change. Do you want me to apply it?
```

## UI Direction

In the future app, the confirmation flow could use buttons:

- Confirm change
- Reject change
- Revise proposal
- View original day
- View updated preview

This will make the product clearer than a pure chat-only experience.

## How This Helps the Final Product

Confirmation flow is the safety layer between the bot and the itinerary state.

It prevents accidental edits.

It also connects to version history because confirmed changes become saved versions.

The product flow becomes:

```text
Proposal
↓
Confirmation
↓
Save
↓
Version history
```

## Next Step

The next backbone checkpoint is Day 14.

The checkpoint will review whether the product has the right core structure before moving into UI and prototype planning.
