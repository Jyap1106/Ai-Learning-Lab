# Version History Design

## Purpose

This file defines how the Holiday Companion Bot should track itinerary changes over time.

The product should not only save the latest itinerary. It should also remember what changed, when it changed, and why it changed.

Version history is important because travel plans are flexible. Users may remove, replace, add, or reschedule activities, and the product should keep a record of those changes.

## Core Idea

Every confirmed itinerary change should create a version history entry.

The version history entry should answer:

- What changed?
- Which day changed?
- Which activity changed?
- What was the old value?
- What is the new value?
- When did the change happen?
- Why did the user request the change?
- Was the change confirmed?
- Can the previous version be restored?

## Why Version History Matters

A travel itinerary is not just random text. It may include important plans, tickets, food stops, transport notes, and timing assumptions.

If the bot changes the itinerary, the user should be able to:

- See what changed
- Trust the change
- Understand the impact
- Restore an earlier version if needed
- Share the correct version later

## Version History in the Product Flow

The safe flow is:

```text
User requests change
↓
Bot proposes itinerary patch
↓
User confirms
↓
Backend saves updated itinerary state
↓
Backend creates version history entry
↓
Bot summarizes the saved change
```

Version history happens only after the user confirms and the backend saves the update.

## Important Rule

Do not create a final version history entry for unconfirmed changes.

Unconfirmed changes should stay as proposed patches.

Confirmed and saved changes should become version history entries.

## Proposed Patch vs Saved Version

## Proposed Patch

A proposed patch is a change that the bot suggests but has not saved yet.

Example:

```text
Remove Schönbrunn from Day 2 and replace it with a lighter cafe-focused morning.
```

Status:

```text
proposed
```

## Saved Version

A saved version is a confirmed change that has been applied to itinerary state.

Example:

```text
Version 2: Day 2 updated to remove Schönbrunn and add a lighter cafe-focused morning.
```

Status:

```text
saved
```

## Version History Object

A future version history entry could look like this:

```json
{
  "version_id": "version-002",
  "trip_id": "austria-2026",
  "created_at": "2026-06-04T10:30:00Z",
  "change_type": "replace_activity",
  "affected_day": 2,
  "affected_activity": "Schönbrunn Palace and gardens",
  "previous_value": {
    "morning": ["Schönbrunn Palace and gardens"]
  },
  "new_value": {
    "morning": ["Lighter cafe and Karlsplatz-focused morning"]
  },
  "reason": "User wanted a lighter day",
  "confirmed_by_user": true,
  "summary": "Day 2 was changed from a palace-heavy morning to a lighter cafe-focused morning."
}
```

## Suggested Version Fields

Each version history entry should include:

- version_id
- trip_id
- created_at
- change_type
- affected_day
- affected_activity
- previous_value
- new_value
- reason
- confirmed_by_user
- summary
- created_by
- restore_available

## Change Types

The first change types should be:

```text
remove_activity
replace_activity
add_activity
reschedule_activity
make_day_lighter
update_food_plan
update_transport_notes
restore_previous_version
```

## Version Numbering

Simple version numbering is enough for the MVP.

Example:

```text
version-001
version-002
version-003
```

The first saved itinerary can be:

```text
version-001
```

The next confirmed change becomes:

```text
version-002
```

## Before and After Snapshots

For each change, the product should store the before and after value.

Example:

Before:

```json
{
  "day": 2,
  "morning": ["Schönbrunn Palace and gardens"]
}
```

After:

```json
{
  "day": 2,
  "morning": ["Lighter cafe and Karlsplatz-focused morning"]
}
```

This helps the user understand exactly what changed.

## Restore Behavior

Restoring means going back to a previous itinerary version.

Example:

```text
Restore Day 2 back to version-001.
```

A restore should also create a new version history entry.

Example:

```text
version-004: Restored Day 2 to version-001.
```

This means the system does not erase history. It adds a new restore action to the history.

## Restore Flow

The restore flow should be:

```text
User asks to restore previous version
↓
Bot shows the version to restore
↓
User confirms
↓
Backend restores the selected version
↓
Backend creates a new restore version entry
↓
Bot summarizes restored itinerary
```

## Version History and Sharing

When a user shares an itinerary, the product should share only the current saved version by default.

The product should not share private version history unless the user chooses to include it.

Version history may contain sensitive notes about why changes were made, so it should be treated carefully.

## Version History and Preference Learning

Version history can later help the product understand user preferences.

Examples:

- User often removes museum-heavy activities
- User often adds cafe breaks
- User often makes days lighter
- User often reschedules evening activities
- User prefers flexible plans over packed plans

This should be future work, not the current MVP.

## MVP Version History Strategy

For the MVP, keep version history simple.

The first version history design only needs:

- version_id
- change_type
- affected_day
- previous_summary
- new_summary
- confirmed_by_user
- created_at

No database is needed yet.

The product can start with a simple JSON-like version history model.

## Example MVP Version History

```json
[
  {
    "version_id": "version-001",
    "change_type": "initial_itinerary",
    "affected_day": null,
    "previous_summary": null,
    "new_summary": "Initial Austria itinerary created.",
    "confirmed_by_user": true,
    "created_at": "2026-06-04T09:00:00Z"
  },
  {
    "version_id": "version-002",
    "change_type": "replace_activity",
    "affected_day": 2,
    "previous_summary": "Day 2 included Schönbrunn Palace and gardens.",
    "new_summary": "Day 2 replaced Schönbrunn with a lighter cafe-focused morning.",
    "confirmed_by_user": true,
    "created_at": "2026-06-04T10:30:00Z"
  }
]
```

## Safety Rules

Version history should follow these rules:

1. Do not save unconfirmed changes as final versions.
2. Always record what changed.
3. Preserve the previous state.
4. Do not overwrite history.
5. Treat restore actions as new history entries.
6. Do not expose private history in shared itineraries by default.
7. Keep version records simple in the MVP.
8. Avoid storing private booking data.
9. Clearly separate proposed patches from saved versions.
10. Make it easy to understand before and after changes.

## Key Lesson

Version history makes AI itinerary editing safer.

A bot that edits without history can confuse the user.

A product with version history gives the user confidence because changes are trackable, reversible, and explainable.
