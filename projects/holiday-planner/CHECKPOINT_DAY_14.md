# Day 14 Backbone Checkpoint

## Purpose

This checkpoint reviews the Holiday Companion Bot product backbone before moving into UI and prototype planning.

The goal is to confirm that the product logic is clear before building screens or app code.

## Current Product

The active product is:

```text
Holiday Companion Bot
```

The first working example is:

```text
Austria trip
```

The current protected learning dataset is:

```text
sample-data/austria-13-day-sanitized.md
```

## Product Direction

The product should help users:

- Build an itinerary
- Check today's plan
- Check tomorrow's plan
- Ask food, transport, and preparation questions
- Ask for lighter alternatives
- Remove activities
- Replace activities
- Add activities
- Reschedule activities
- Confirm changes before saving
- Save updated itinerary state
- Track version history
- Share a cleaned itinerary later

## Backbone Files Reviewed

## 1. README.md

Purpose:

Explains the project purpose and current MVP direction.

Status:

```text
Ready
```

## 2. PRD.md

Purpose:

Defines product requirements, user flows, supported intents, and MVP constraints.

Status:

```text
Ready
```

## 3. BOT_SPEC.md

Purpose:

Defines bot behavior, supported intents, read-only behavior, edit behavior, and safety rules.

Status:

```text
Ready
```

## 4. ROADMAP.md

Purpose:

Defines the Day 30 product outcome and learning path.

Status:

```text
Ready
```

## 5. TASKS.md

Purpose:

Tracks product backbone tasks and next steps.

Status:

```text
Ready
```

## 6. ITINERARY_STATE_MODEL.md

Purpose:

Explains the future saved itinerary state.

Status:

```text
Ready
```

## 7. EDIT_WORKFLOW.md

Purpose:

Explains how itinerary edits should be proposed, confirmed, and saved.

Status:

```text
Ready
```

## 8. BACKEND_SAVE_BEHAVIOR.md

Purpose:

Explains how confirmed changes should be saved in a future backend.

Status:

```text
Ready
```

## 9. VERSION_HISTORY.md

Purpose:

Explains how itinerary changes should be tracked and restored.

Status:

```text
Ready
```

## 10. CONFIRMATION_FLOW.md

Purpose:

Explains how users confirm, reject, or revise proposed itinerary changes.

Status:

```text
Ready
```

## 11. SHARING_WORKFLOW.md

Purpose:

Explains how the product could share a cleaned itinerary later.

Status:

```text
Ready
```

## 12. AI_TOOL_BACKBONE.md

Purpose:

Explains the overall AI product architecture.

Status:

```text
Ready
```

## 13. SKILL_TOOL_MAP.md

Purpose:

Maps product skills and future tools.

Status:

```text
Ready
```

## Current Product Backbone

The product backbone is:

```text
User interface
↓
Prompt layer
↓
Intent classification
↓
Skills
↓
Tools or backend actions
↓
Itinerary state
↓
Confirmation flow
↓
Backend save behavior
↓
Version history
↓
Sharing workflow
```

## Current Core Flow

The core future flow is:

```text
User opens product
↓
Product loads saved itinerary state
↓
User asks a question or gives a command
↓
Bot classifies intent
↓
Bot retrieves relevant itinerary information
↓
Bot answers or proposes a change
↓
If change is proposed, user confirms or rejects
↓
Backend saves confirmed change
↓
Version history records the update
↓
Future answers use updated itinerary state
```

## Product Decisions Confirmed

## Decision 1: One Trip First

The current MVP focuses on the Austria trip first.

Other trips are future work.

## Decision 2: Markdown Is Learning Scaffolding

Markdown files help design and understand the system.

The final product should not require users to manually edit Markdown files.

## Decision 3: Itinerary State Is Required

The final product needs saved itinerary state.

Without state, the product cannot remember changes.

## Decision 4: Bot Must Propose Before Saving

The bot should not silently change the itinerary.

It should propose changes and ask for confirmation.

## Decision 5: Version History Is Needed

Version history makes itinerary edits trackable and reversible.

## Decision 6: Sharing Requires Privacy Filtering

The product should not share private details, version history, or preference memory by default.

## What Is Ready

The product now has a strong backbone for:

- Product requirements
- Bot behavior
- Prompt behavior
- Itinerary state
- Edit workflow
- Backend save behavior
- Version history
- Confirmation flow
- Sharing workflow
- Skill and tool mapping
- AI product architecture

## What Is Not Built Yet

The product does not yet have:

- UI screens
- Vercel prototype
- Backend
- Database
- Real save function
- Real share link
- Real user accounts
- Live APIs
- Real itinerary builder

These are future build steps.

## Risks to Watch

## Risk 1: Bot Invents Live Details

The bot must not invent opening hours, ticket availability, weather, prices, or live transport details.

## Risk 2: Bot Claims It Saved Changes Too Early

The bot must not say the itinerary has been updated unless the user confirms and the backend saves it.

## Risk 3: Private Data Gets Shared

Sharing should exclude private notes, booking information, payment details, and version history.

## Risk 4: Scope Gets Too Big

The MVP should not include every future feature.

Focus first on:

- Read itinerary
- Answer questions
- Propose edits
- Confirm changes
- Save state design

## UI Planning Readiness

The project is ready to move into UI planning.

The next file should be:

```text
UI_SPEC.md
```

The UI should focus on:

- Today plan card
- Tomorrow plan card
- Chat assistant
- Full itinerary view
- Proposed change preview
- Confirm and reject buttons
- Save status
- Share preview later

## Day 14 Checkpoint Result

Status:

```text
Passed
```

Reason:

The product backbone is now clear enough to begin UI and prototype planning.

## Next Step

Proceed to Day 15:

```text
Day 15 — UI Specification
```

Suggested file:

```text
projects/holiday-planner/UI_SPEC.md
```
