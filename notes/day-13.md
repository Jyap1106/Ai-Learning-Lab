# Day 13 Notes: Sharing Workflow

## What I worked on today

Today I designed how the Holiday Companion Bot could share a saved itinerary in the future.

The focus was sharing workflow.

## File Created

Today I created:

- projects/holiday-planner/SHARING_WORKFLOW.md

## Core Concept

A shared itinerary should be a cleaned version of the saved itinerary.

It should not include private notes, booking details, payment details, version history, or preference memory.

## Why This Matters

Sharing is useful because users may want to send their itinerary to other people.

But sharing also creates privacy risk.

The product should not share everything by default.

## Safe Sharing Flow

The safe sharing flow is:

```text
User requests sharing
↓
System creates share preview
↓
System removes private fields
↓
User reviews share preview
↓
User confirms sharing
↓
System creates shareable itinerary
```

## Sharing States

The product may use states such as:

- private
- share_preview_created
- awaiting_share_confirmation
- shared
- share_revoked
- share_failed

## What Can Be Shared

Safe content may include:

- Trip title
- Destination
- Trip duration
- Day-by-day plan
- Activities
- Food ideas
- General transport notes
- General tips

## What Should Not Be Shared

The product should avoid sharing:

- Passport details
- Booking reference numbers
- Hotel confirmation numbers
- Payment details
- Phone numbers
- Emails
- Private notes
- Version history
- Preference memory

## How This Helps the Final Product

The Holiday Companion Bot should eventually support sharing, but only after the itinerary is cleaned and the user confirms.

This makes the product safer and more useful.

## Next Step

The next step is a backbone checkpoint before moving into UI planning.

Suggested file:

```text
projects/holiday-planner/CHECKPOINT_DAY_14.md
```
