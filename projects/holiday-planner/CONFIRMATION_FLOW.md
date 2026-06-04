# Confirmation Flow Design

## Purpose

This file defines how the Holiday Companion Bot should ask for confirmation before saving itinerary changes.

The bot should never silently update the itinerary.

The product should make itinerary changes safe, clear, and reversible.

## Core Idea

The bot can propose itinerary changes, but the user must confirm before the backend saves them.

The safe flow is:

```text
User asks for change
↓
Bot proposes change
↓
User reviews proposed change
↓
User confirms, rejects, or revises
↓
Backend saves only confirmed changes
↓
Version history records saved change
```

## Why Confirmation Flow Matters

Travel plans can affect:

- Tickets
- Timing
- Food plans
- Transport
- Reservations
- Energy level
- Daily route
- Shared plans with other people

The bot should not change these silently.

The user must remain in control.

## Main Confirmation States

The product should understand these states:

```text
no_change_requested
change_requested
proposal_generated
awaiting_confirmation
confirmed
rejected
revision_requested
saving
saved
save_failed
```

## State 1: no_change_requested

The user is only asking a question.

Example:

```text
What is today's plan?
```

No confirmation is needed because nothing is being changed.

## State 2: change_requested

The user asks for an edit.

Example:

```text
Remove Schönbrunn from Day 2.
```

The bot should not save anything yet.

## State 3: proposal_generated

The bot creates a proposed change.

Example:

```text
Proposed change:
Remove Schönbrunn Palace and gardens from Day 2.

Impact:
Day 2 becomes lighter and more flexible.
```

## State 4: awaiting_confirmation

The bot asks:

```text
Do you want me to apply this change to the itinerary?
```

At this point, the product is waiting for the user.

## State 5: confirmed

The user confirms.

Examples:

```text
Yes, apply it.
```

```text
Confirm.
```

```text
Yes, save this change.
```

Only now should the backend save the update.

## State 6: rejected

The user rejects the change.

Examples:

```text
No, keep the original plan.
```

```text
Cancel.
```

```text
Do not change it.
```

The itinerary should remain unchanged.

## State 7: revision_requested

The user wants a different proposal.

Example:

```text
Not that one. Replace it with a cafe instead.
```

The bot should create a revised proposal.

The backend should still not save anything.

## State 8: saving

The backend is applying the confirmed change.

The product can show:

```text
Saving your itinerary update...
```

## State 9: saved

The backend successfully saves the update.

The bot can say:

```text
Your itinerary has been updated.
```

This phrase should only be used after the backend confirms the save.

## State 10: save_failed

The backend fails to save.

The product should say:

```text
I could not save the itinerary change. Your previous itinerary is unchanged.
```

The user should not be left uncertain.

## Confirmation Flow Diagram

```text
Change requested
↓
Proposal generated
↓
Awaiting confirmation
↓
User chooses one:
    → Confirmed → Saving → Saved
    → Rejected → No change saved
    → Revision requested → New proposal generated
    → Save failed → Previous itinerary preserved
```

## Confirm Intent Detection

The system should treat these as confirmation:

```text
yes
confirm
apply it
save it
yes update it
looks good
go ahead
```

## Reject Intent Detection

The system should treat these as rejection:

```text
no
cancel
keep original
do not change
ignore that
reject
```

## Revision Intent Detection

The system should treat these as revision requests:

```text
change the replacement
try another option
make it more relaxed
replace it with food instead
move it to another day
```

## Proposed Change Format

Every proposed change should show:

- Affected day
- Current itinerary item
- Requested change
- Proposed change
- Impact on day
- What stays unchanged
- What should be verified live
- Confirmation question

## Example Proposal

```text
Proposed itinerary change

Affected day:
Day 2, Vienna

Current item:
Schönbrunn Palace and gardens

Requested change:
Remove Schönbrunn and make the day lighter.

Proposed change:
Remove Schönbrunn from the morning.
Add a slower cafe-focused morning near Karlsplatz.

Impact:
Day 2 becomes less palace-heavy and more relaxed.

What stays unchanged:
Upper Belvedere remains optional.
Wien Museum remains optional.
Karlskirche remains an evening option.

Verify live:
Cafe opening hours, weather, public transport.

Confirmation:
Do you want me to apply this change to the itinerary?
```

## UI Behavior

In a future interface, the confirmation flow could show:

- Proposed change card
- Before and after preview
- Confirm button
- Reject button
- Revise button
- Save status
- Updated itinerary preview

## Suggested UI Buttons

Possible buttons:

```text
Confirm change
Reject change
Revise proposal
View original day
View updated preview
```

## Backend Behavior After Confirmation

After confirmation, the backend should:

1. Validate the patch.
2. Apply the patch to itinerary state.
3. Save the updated itinerary.
4. Create a version history entry.
5. Return the updated itinerary preview.
6. Keep previous version available.

## Backend Behavior After Rejection

After rejection, the backend should:

1. Keep itinerary unchanged.
2. Mark the proposal as rejected or discard it.
3. Tell the user no changes were saved.

## Backend Behavior After Revision Request

After revision request, the backend should:

1. Keep itinerary unchanged.
2. Generate a revised proposal.
3. Ask for confirmation again.
4. Save only after the user confirms.

## Error Handling

If the save fails, the system should:

- Preserve the previous itinerary
- Tell the user the save failed
- Avoid partial updates
- Allow the user to retry
- Avoid creating a misleading version history entry

## What the Bot Should Not Say Too Early

The bot should not say:

```text
Done, I updated your itinerary.
```

before the backend saves the update.

The bot should say:

```text
Here is the proposed change. Do you want me to apply it?
```

## Confirmation Flow and Version History

Confirmation flow and version history work together.

Confirmation flow decides whether the change should be saved.

Version history records the change after it is saved.

The sequence is:

```text
Proposal
↓
Confirmation
↓
Save
↓
Version history
```

## MVP Confirmation Strategy

For the MVP, confirmation can be simple.

The bot can ask:

```text
Do you want me to apply this change to the itinerary?
```

The user can reply:

```text
Yes
```

or:

```text
No
```

A full UI can come later.

## Future Confirmation Strategy

Later, the product can use buttons:

- Confirm
- Reject
- Revise

This will reduce ambiguity and make the product easier to use.

## Safety Rules

The confirmation flow should follow these rules:

1. Do not save changes without confirmation.
2. Do not claim a save happened before the backend confirms it.
3. Make before and after changes easy to review.
4. Keep the user in control.
5. Preserve the previous itinerary if saving fails.
6. Record saved changes in version history.
7. Do not expose private data in shared confirmations.
8. Ask for clarification when the change request is unclear.

## Key Lesson

Confirmation flow is what turns AI from a risky editor into a safe assistant.

The bot can suggest.

The user decides.

The backend saves.

The product remembers.
