# Sharing Workflow

## Purpose

This file defines how the Holiday Companion Bot should share an itinerary in a future product.

The current MVP does not need real sharing links yet.

This file explains the product logic for safe itinerary sharing later.

## Core Idea

The product should eventually allow a user to share a saved itinerary.

The shared itinerary should come from the current saved itinerary state, not from private notes, raw prompts, or version history.

The user should be able to review what will be shared before making it public or sending it to others.

## Why Sharing Matters

Users may want to share an itinerary with:

- Friends
- Family
- Travel companions
- Social media followers
- Future clients
- Their own future self

Sharing makes the product more useful because the itinerary becomes reusable and presentable.

## Important Safety Rule

The product should not share private travel data by default.

Do not share:

- Passport details
- Booking reference numbers
- Hotel confirmation numbers
- Payment details
- Phone numbers
- Emails
- Private personal notes
- Sensitive travel companion information
- Internal version history
- Private preference notes

## What Can Be Shared

Safe sharing content may include:

- Trip title
- Destination
- Trip duration
- Day-by-day itinerary
- Activities
- Food ideas
- Transport notes at a general level
- General tips
- Optional notes that the user approves
- Final saved itinerary summary

## Shareable Itinerary vs Saved Itinerary

## Saved Itinerary

The saved itinerary is the user's full working version.

It may include:

- Private notes
- Version history
- Edit reasons
- Draft changes
- Internal state
- Preferences

## Shareable Itinerary

The shareable itinerary is a cleaned version.

It should include only what the user wants others to see.

It should exclude:

- Private notes
- Internal edit history
- Sensitive data
- Backend state fields
- Draft proposals
- Unconfirmed changes

## Sharing Flow Overview

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
↓
User receives share option
```

## Sharing States

The product can use these sharing states:

```text
private
share_preview_created
awaiting_share_confirmation
shared
share_revoked
share_failed
```

## State 1: Private

Default state.

The itinerary is visible only to the user.

```text
share_status: private
```

## State 2: Share Preview Created

The system prepares a cleaned preview.

The itinerary is not shared yet.

```text
share_status: share_preview_created
```

## State 3: Awaiting Share Confirmation

The user reviews the preview.

The system asks:

```text
Do you want to share this itinerary?
```

## State 4: Shared

The user confirms.

The product creates a shareable version.

```text
share_status: shared
```

## State 5: Share Revoked

The user disables or removes access to the shared itinerary.

```text
share_status: share_revoked
```

## State 6: Share Failed

The system fails to create the share.

The product should say:

```text
I could not create the shareable itinerary. Your original itinerary is unchanged.
```

## Share Types

## 1. Private View

Only the user can see the itinerary.

This should be the default.

## 2. Share Link

Future feature.

The product creates a link that others can open.

Example:

```text
https://holiday-companion.app/share/austria-trip
```

## 3. Export

Future feature.

The user can export itinerary as:

- PDF
- Markdown
- Google Doc
- Plain text
- Calendar format later

## 4. Public Showcase

Future feature.

The user can publish a polished itinerary as a public travel guide.

This should require extra review because public sharing has more privacy risk.

## Recommended MVP Sharing Strategy

For the MVP, do not build real sharing yet.

Instead, design a share preview.

The share preview should show what would be shared.

Example:

```text
Share Preview:
Austria 13-Day Itinerary

Includes:
- Day-by-day plan
- Activities
- Food ideas
- General transport notes
- General tips

Excludes:
- Private notes
- Version history
- Booking details
- Personal information
```

## Share Preview Flow

The product should follow this flow:

```text
User asks: Share my itinerary.
↓
Bot explains what can be shared.
↓
System creates a clean preview.
↓
User reviews preview.
↓
User confirms.
↓
System creates shareable itinerary.
```

## Share Confirmation Rule

The bot should ask for confirmation before sharing.

Good:

```text
Here is the share preview. Do you want to create a shareable version?
```

Bad:

```text
I shared your itinerary.
```

The second response is only allowed after the user confirms and the share action succeeds.

## What the Bot Should Say

When user asks to share:

```text
I can prepare a shareable version of your itinerary.

Before sharing, I will remove private details such as booking references, payment details, private notes, and internal version history.

Would you like me to create a share preview?
```

## Share Preview Format

A share preview could include:

```text
Trip Title:
Destination:
Duration:
Travel Style:
Day-by-Day Plan:
Food Highlights:
Transport Notes:
General Tips:
Excluded Private Data:
Share Status:
```

## Version History and Sharing

By default, version history should not be shared.

Version history may include private reasons for changes, such as:

- User was tired
- User removed an activity
- User changed plans
- User preferred another style

The product should share the current saved itinerary only.

## Sharing and Preference Memory

Preference memory should not be shared by default.

Preference memory may include sensitive behavioral patterns.

Example:

```text
User often removes packed museum days.
User often prefers cafes.
User often makes days lighter.
```

This is useful internally, but not suitable for sharing unless explicitly approved.

## Backend Sharing Behavior

In a future backend, sharing may require:

- share_id
- trip_id
- share_status
- share_visibility
- created_at
- updated_at
- revoked_at
- shared_snapshot
- excluded_fields
- owner_user_id

## Example Share Object

```json
{
  "share_id": "share-001",
  "trip_id": "austria-2026",
  "share_status": "shared",
  "share_visibility": "link_only",
  "created_at": "2026-06-04T10:00:00Z",
  "shared_snapshot": {
    "trip_name": "Austria Trip",
    "duration": "13 days",
    "days": []
  },
  "excluded_fields": [
    "private_notes",
    "booking_references",
    "payment_details",
    "version_history",
    "preference_memory"
  ]
}
```

## Revoke Sharing

The user should be able to revoke sharing later.

Example user request:

```text
Stop sharing this itinerary.
```

Expected behavior:

```text
Share status changed from shared to share_revoked.
```

## Sharing Safety Checklist

Before sharing, the product should check:

- Is the user the owner?
- Has the user reviewed the share preview?
- Has private data been removed?
- Is version history excluded?
- Is preference memory excluded?
- Has the user confirmed the share action?
- Is the share visibility clear?

## Future UI Behavior

A future UI could include:

- Share button
- Share preview modal
- Private data warning
- Confirm share button
- Copy link button
- Revoke share button
- Export button

## What Not To Build Yet

Do not build these yet:

- Real public links
- User accounts
- Permissions system
- PDF generation
- Google Docs integration
- Social posting
- Payment or booking integrations

These can come later.

## Key Lesson

Sharing is not just a button.

Sharing requires:

```text
Saved itinerary state
↓
Clean share preview
↓
Privacy filtering
↓
User confirmation
↓
Shareable snapshot
↓
Revoke option
```

A safe AI product gives the user control over what gets shared.
