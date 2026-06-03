# Itinerary Edit Workflow

## Purpose

This file defines how the Holiday Companion Bot should handle itinerary edit requests.

The bot should not silently change the itinerary.

It should propose changes, ask for confirmation, and only then update the saved itinerary state.

## Core Workflow

1. User asks for a change.
2. Bot identifies the affected day.
3. Bot identifies the affected activity or section.
4. Bot checks the current itinerary state.
5. Bot proposes a change.
6. Bot explains the impact of the change.
7. Bot asks for confirmation.
8. User confirms or rejects.
9. Backend updates itinerary state only after confirmation.
10. Bot summarizes the updated plan.

## Supported Edit Types

The bot should support:

- Remove activity
- Replace activity
- Add activity
- Reschedule activity
- Make day lighter
- Add food stop
- Move activity to tomorrow
- Shorten a day
- Restore previous version later

## Edit Type 1: Remove Activity

Example user request:

- Remove Schönbrunn from Day 2.

Bot should identify:

- Affected day: Day 2
- Activity: Schönbrunn Palace and gardens
- Edit type: Remove activity

Bot should respond with:

- Current activity to remove
- Impact on the day
- Updated day preview
- Confirmation question

The bot should not say the activity was removed until the user confirms.

## Edit Type 2: Replace Activity

Example user request:

- Replace Upper Belvedere with something more relaxing.

Bot should identify:

- Affected day
- Existing activity
- Desired replacement style
- Whether replacement exists in the itinerary or needs to be suggested

Bot should respond with:

- Activity to replace
- Proposed replacement
- Reasoning
- Updated day preview
- Confirmation question

## Edit Type 3: Add Activity

Example user request:

- Add a cafe break to Day 2.

Bot should identify:

- Affected day
- New activity type
- Best time slot based on current itinerary
- Whether the schedule may become too packed

Bot should respond with:

- Proposed time slot
- Activity to add
- Impact on the schedule
- Confirmation question

## Edit Type 4: Reschedule Activity

Example user request:

- Move Karlskirche to tomorrow.

Bot should identify:

- Original day
- Target day
- Activity to move
- Impact on both days

Bot should respond with:

- Original placement
- Proposed new placement
- Updated preview for both days
- Confirmation question

## Edit Type 5: Make Day Lighter

Example user request:

- Make Day 2 less packed.

Bot should identify:

- Heaviest parts of the day
- Activities that can be shortened, skipped, or moved
- Food or rest options
- What should remain as the core experience

Bot should respond with:

- Lighter version of the day
- Removed or optional activities
- Updated day preview
- Confirmation question

## Confirmation Rule

The bot must ask:

- Do you want me to apply this change to the saved itinerary?

The bot must not say:

- Your itinerary has been updated.

unless the user confirms and the backend saves the change.

## Backend Update Rule

The backend should update only after confirmation.

After update, the backend should:

1. Save the new itinerary state.
2. Add a version history entry.
3. Record what changed.
4. Preserve previous version if possible.
5. Return the updated itinerary preview.

## Version History

Each edit should create a version history entry.

Suggested fields:

- version_id
- timestamp
- edit_type
- affected_day
- affected_activity
- old_value
- new_value
- user_reason
- confirmation_status

## Example Full Edit Flow

User:

- Remove Schönbrunn from Day 2 and replace it with something lighter.

Bot:

- Detected intent: Replace activity
- Affected day: Day 2
- Current activity: Schönbrunn Palace and gardens
- Proposed replacement: relaxed cafe and Karlsplatz area exploration
- Impact: Day 2 becomes less palace-heavy and more relaxed
- Confirmation: Do you want me to apply this change?

User:

- Yes, update it.

System:

- Saves updated itinerary state
- Adds version history entry
- Returns updated Day 2 preview

Bot:

- The updated Day 2 now focuses on a lighter Vienna culture and cafe route.

## What Not To Do

The bot should not:

- Edit silently
- Claim a save happened before confirmation
- Invent live facts
- Replace activities with unsupported facts without saying it is a suggestion
- Rewrite the full itinerary when only one activity changed
- Delete version history
- Modify private data

## MVP Approach

For the MVP, we can simulate this workflow using Markdown test outputs.

Later, this should become:

- Real frontend action
- Backend update
- Saved itinerary state
- Version history
- User confirmation flow
