# Backend Save Behavior

## Purpose

This file defines how the Holiday Companion Bot should save itinerary changes in a future product.

The current project uses Markdown files for learning, but the final product should save itinerary changes inside the product.

This file explains what should happen after a user confirms an itinerary edit.

## Core Idea

The bot should not directly update the itinerary just because the user asks for a change.

The safe flow is:

```text
User requests change
↓
Bot proposes change
↓
User confirms change
↓
Backend validates change
↓
Backend saves updated itinerary state
↓
Backend records version history
↓
Bot shows updated itinerary summary
```

## Why Backend Save Behavior Matters

A chatbot can say:

```text
Here is a suggested change.
```

A product must be able to say:

```text
Your confirmed change has been saved and future answers will use the updated itinerary.
```

That requires backend save behavior.

## Current Learning State

Current learning dataset:

- sample-data/austria-13-day-sanitized.md

This file is protected and should not be treated as the final backend.

It is currently used to learn:

- Itinerary structure
- Retrieval behavior
- Prompt behavior
- Future state design
- Edit workflow design

## Future Itinerary State

In the final product, the itinerary should be stored as itinerary state.

Itinerary state means:

```text
The current saved version of the trip.
```

The bot reads from itinerary state when answering questions.

The backend updates itinerary state only after confirmed changes.

## Save Flow Overview

## Step 1: User Requests a Change

Example:

```text
Remove Schönbrunn from Day 2 and replace it with something lighter.
```

The bot should identify:

- Intent: Replace activity
- Affected day: Day 2
- Affected activity: Schönbrunn Palace and gardens
- Requested change: Replace with something lighter

## Step 2: Bot Creates a Proposed Change

The bot should output a proposed itinerary patch.

Example:

```text
Proposed change:
Remove Schönbrunn Palace and gardens from Day 2.

Replace with:
A lighter cafe and Karlsplatz-focused morning.

Do you want me to apply this change?
```

The bot should not say the itinerary has been updated yet.

## Step 3: User Confirms

Example confirmation:

```text
Yes, apply this change.
```

Only after this confirmation should the backend save the change.

## Step 4: Backend Validates the Change

Before saving, the backend should check:

- Does the trip exist?
- Does the affected day exist?
- Does the activity exist?
- Is the change allowed?
- Is the patch valid?
- Is the user authorized to edit this itinerary?
- Is the update only changing the intended fields?
- Is private data protected?

## Step 5: Backend Saves Updated Itinerary State

The backend should update only the affected day, activity, or section.

It should avoid rewriting the full itinerary when only one activity changes.

## Step 6: Backend Records Version History

Each confirmed change should create a version history entry.

This allows the product to:

- Show what changed
- Restore previous versions later
- Learn user preferences later
- Debug bad changes
- Build user trust

## Step 7: Bot Shows Updated Summary

After the backend saves the update, the bot can say:

```text
The itinerary has been updated.

Updated Day 2 now focuses on a lighter Vienna culture and cafe route.
```

This message should only happen after the save is successful.

## Save States

A future backend should handle these save states:

```text
proposed
confirmed
saving
saved
rejected
failed
```

## State 1: Proposed

The bot has suggested a change, but the user has not confirmed.

Example:

```text
Status: proposed
```

## State 2: Confirmed

The user approved the change.

Example:

```text
Status: confirmed
```

## State 3: Saving

The backend is applying the update.

Example:

```text
Status: saving
```

## State 4: Saved

The backend successfully saved the update.

Example:

```text
Status: saved
```

## State 5: Rejected

The user rejected the proposed change.

Example:

```text
Status: rejected
```

## State 6: Failed

The backend failed to save the update.

Example:

```text
Status: failed
```

The product should show an error message and preserve the previous itinerary state.

## Suggested Data Objects

## 1. Itinerary State

Example shape:

```json
{
  "trip_id": "austria-2026",
  "trip_name": "Austria Trip",
  "current_day": 2,
  "days": [],
  "version_history": [],
  "updated_at": "2026-06-04T10:00:00Z"
}
```

## 2. Itinerary Patch

An itinerary patch is the proposed change.

Example shape:

```json
{
  "patch_id": "patch-001",
  "trip_id": "austria-2026",
  "change_type": "replace_activity",
  "affected_day": 2,
  "affected_activity": "Schönbrunn Palace and gardens",
  "remove": ["Schönbrunn Palace and gardens"],
  "add": ["Lighter cafe and Karlsplatz-focused morning"],
  "status": "proposed",
  "created_at": "2026-06-04T10:00:00Z"
}
```

## 3. Confirmed Patch

After the user confirms:

```json
{
  "patch_id": "patch-001",
  "confirmation_status": "confirmed",
  "confirmed_at": "2026-06-04T10:05:00Z",
  "confirmed_by": "user"
}
```

## 4. Version History Entry

After saving:

```json
{
  "version_id": "version-002",
  "trip_id": "austria-2026",
  "change_type": "replace_activity",
  "affected_day": 2,
  "previous_summary": "Day 2 included Schönbrunn Palace and gardens.",
  "new_summary": "Day 2 now includes a lighter cafe and Karlsplatz-focused morning.",
  "created_at": "2026-06-04T10:06:00Z"
}
```

## Possible Storage Options

## Option 1: Local State

Good for early prototype.

Stores itinerary temporarily in the browser.

Pros:

- Simple
- Fast
- No backend required
- Good for Vercel prototype

Cons:

- Not reliable across devices
- Can be lost
- Not good for sharing

## Option 2: JSON File

Good for learning and early local development.

Pros:

- Easy to understand
- Easy to inspect
- Good for version examples

Cons:

- Not ideal for real multi-user product
- Editing JSON manually is not user-friendly

## Option 3: Database

Good for real product.

Pros:

- Saves user-specific itineraries
- Supports version history
- Supports sharing
- Supports future authentication

Cons:

- More setup
- More security responsibility
- More cost and complexity

## Option 4: Backend API

Good for product architecture.

Possible endpoints:

```text
GET /api/trips/:tripId
GET /api/trips/:tripId/days/:dayNumber
POST /api/trips/:tripId/patches
POST /api/trips/:tripId/patches/:patchId/confirm
POST /api/trips/:tripId/patches/:patchId/reject
GET /api/trips/:tripId/history
```

## MVP Recommendation

For the early MVP, use this progression:

```text
Markdown dataset
↓
JSON itinerary state sample
↓
Local state in prototype
↓
Backend API later
↓
Database later
```

Do not jump straight to database too early.

## Save Behavior Rules

The backend should follow these rules:

1. Do not save unconfirmed changes.
2. Save only after explicit user confirmation.
3. Preserve the previous itinerary version.
4. Save the smallest possible change.
5. Update future answers to use the saved state.
6. Keep live information separate from saved itinerary.
7. Avoid saving private booking data.
8. Log what changed.
9. Allow rejected changes to disappear or be archived.
10. Handle failed saves safely.

## Failed Save Behavior

If saving fails, the product should say:

```text
I could not save the itinerary change. Your previous itinerary is unchanged.
```

The product should not leave the user unsure about whether the change was saved.

## Rejected Change Behavior

If the user rejects the change, the product should say:

```text
No changes were saved.
```

The itinerary should remain unchanged.

## Future Sharing Behavior

Sharing should use the saved itinerary state.

The product should not share:

- Private booking references
- Passport details
- Payment details
- Private contact details
- Private notes

Sharing should be designed separately in:

```text
SHARING_WORKFLOW.md
```

## Future Preference Learning

Saved changes can later teach the product user preferences.

Example signals:

- User often removes museum-heavy stops.
- User often adds cafe breaks.
- User often makes days lighter.
- User prefers flexible afternoons.

This should be treated as future work.

## Key Lesson

A useful AI product needs more than a good prompt.

It needs:

```text
Prompt
↓
Proposed change
↓
User confirmation
↓
Backend save
↓
Version history
↓
Updated future behavior
```

This is how the product moves from chatbot to real tool.
