# Day 11 Notes: Version History Design

## What I worked on today

Today I designed how the Holiday Companion Bot should track itinerary changes over time.

The focus was version history.

## File Created

Today I created:

- projects/holiday-planner/VERSION_HISTORY.md

## Core Concept

Version history means the product remembers previous itinerary versions.

When a user confirms a change, the system should record what changed.

The product should know:

- What the itinerary looked like before
- What changed
- What the itinerary looks like after
- When the change happened
- Why the change was made
- Whether the user confirmed it

## Why This Matters

A travel itinerary can affect real plans.

If the bot changes the itinerary, the user should be able to understand and trust the change.

Version history makes changes:

- Trackable
- Explainable
- Reversible
- Safer
- More useful for future preference learning

## Proposed Patch vs Saved Version

A proposed patch is not saved yet.

A saved version is a confirmed change that has been applied to itinerary state.

The flow is:

```text
Proposed patch
↓
User confirms
↓
Backend saves
↓
Version history entry created
```

## What Version History Should Store

A version history entry should store:

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

## Restore Concept

Version history also makes restore possible.

A user could later say:

```text
Restore Day 2 to the previous version.
```

The product should not erase history.

A restore should create a new version history entry.

## How This Helps the Final Product

The final Holiday Companion Bot should not only save the latest itinerary.

It should also preserve what changed over time.

This will help with:

- Undo behavior
- Sharing the correct version
- Debugging bad changes
- Building trust
- Learning preferences later

## Next Step

The next backbone file is:

- projects/holiday-planner/CONFIRMATION_FLOW.md

This will define how the user confirms, rejects, or revises proposed itinerary changes.
