# MVP Scope: Holiday Companion Bot

## Purpose

This file defines what should be included in the MVP and what should be saved for later.

The goal is to keep the first product focused, useful, and buildable without using too many AI credits or adding too much complexity.

## MVP Product Goal

The MVP should prove that a user can:

1. Create or load a baseline itinerary
2. View today's plan
3. View tomorrow's plan
4. Ask the bot practical travel questions
5. Ask for itinerary changes
6. Preview suggested changes
7. Confirm or reject changes
8. Save updated itinerary state locally
9. View version history conceptually

## MVP User

The first MVP user is:

```text
Me
```

The product should first solve my own trip workflow.

Future users can include:

- Friends and family
- General travellers
- Travel planners or agencies
- Content creators

These future users should not distract from the first MVP.

## MVP Trip

The first MVP trip is:

```text
Austria trip
```

The existing Austria itinerary dataset is used as learning scaffolding.

In the final product, the user should not need to manually edit Markdown files.

## MVP Core Modes

## 1. Itinerary Builder Mode

The MVP should support a simple itinerary creation flow.

Minimum version:

```text
User enters a trip request
↓
System creates a baseline itinerary structure
```

Example:

```text
Plan me a 13-day Austria trip with cafes, museums, scenic views, and relaxed pacing.
```

MVP version can be simulated with sample data or local state.

## 2. Trip Companion Mode

The MVP should show:

- Today's plan
- Tomorrow's plan
- Main activities
- Food or cafe suggestions
- Transport notes

This is the main daily-use experience.

## 3. Chat Assistant Mode

The MVP should include a simple chat assistant area.

The user can ask:

- What is today's plan?
- What is tomorrow's plan?
- What food is planned today?
- What transport notes should I know?
- What can I skip if I am tired?
- What if I missed one timing?

## 4. Itinerary Edit Mode

The MVP should support change requests.

Examples:

- Remove this activity
- Replace this activity
- Add a cafe break
- Move this activity to tomorrow
- Make today less packed

The bot should show 2 to 3 alternatives when replacing an activity.

One option should be:

```text
Leave this time as relax/free time.
```

## 5. Confirmation Mode

The MVP should not silently update the itinerary.

The user should see:

- Proposed change
- Before and after preview
- Confirm button
- Reject button

Only confirmed changes should update the saved itinerary state.

## 6. Local Save Mode

The MVP should save changes locally first.

Possible storage:

- Browser local state
- localStorage
- JSON mock data

No database is required for the first prototype.

## MVP Home Screen

The home screen should include:

## Main Area

Today's plan.

This should be the main focus.

## Bottom Area

Chat assistant.

The user can ask questions or request changes.

## Right Area

Trip dashboard.

This should show trip overview, upcoming days, or itinerary summary.

## Secondary Area

Create new trip button.

This can be at the bottom or in a secondary navigation area.

## MVP Today's Plan Content

Today's plan should include:

- Main activities
- Food or cafe suggestions
- Transport notes

Future additions:

- Things to prepare
- Ticket reminders
- Weather checks
- Backup plan
- Map links
- Estimated budget

## MVP Chat Behaviors

The chat assistant should support:

- Today's plan question
- Tomorrow's plan question
- Food question
- Transport question
- Tired-mode question
- Missed timing question
- Remove activity request
- Replace activity request
- Add activity request
- Move activity request

## MVP Edit Behavior

When the user asks to edit the itinerary, the bot should:

1. Detect the edit type
2. Identify the affected day
3. Identify the affected activity
4. Suggest 2 to 3 alternatives
5. Include one relax/free-time option
6. Show before and after preview
7. Ask for confirmation
8. Save only after confirmation

## MVP Version Control

The MVP should show or simulate version control.

Minimum version:

- Show previous version summary
- Show current version summary
- Record what changed
- Allow conceptual rollback later

Full restore behavior can come later.

## MVP Sharing

Sharing is not required in the first prototype.

However, the product should have a future sharing design.

Possible future sharing:

- Full itinerary
- Selected days
- Private link
- PDF/export
- Social-media-friendly version

## MVP AI Scope

The MVP can use AI conceptually first.

The first prototype can simulate AI responses if credits are low.

The product can start with:

- Hardcoded prompt outputs
- Mock bot responses
- Local sample itinerary
- Manual change previews

Real AI API integration can come later.

## MVP Technical Scope

The MVP should avoid:

- Backend database
- Authentication
- Paid APIs
- Live maps
- Live weather
- Real-time transport
- Booking integrations
- Social media generation
- Multi-user accounts

The MVP should use:

- Frontend only
- Static itinerary JSON
- Local state
- localStorage
- Simple components
- Mock chat behavior

## MVP Build Path

The safest build path is:

```text
Product docs
↓
UI spec
↓
Data loading plan
↓
Frontend-only prototype
↓
Local itinerary state
↓
Mock chat behavior
↓
Confirm/reject edit flow
↓
Local save behavior
↓
Backend later
```

## MVP Success Criteria

The MVP is successful if the user can:

- Open the product
- See today's plan
- See tomorrow's plan
- Ask basic itinerary questions
- Request a change
- Preview suggested alternatives
- Confirm or reject a change
- See the itinerary update locally
- Understand that future backend saving is possible

## Out of Scope for MVP

Do not include these in the MVP:

- Real AI API calls if credits are limited
- Database
- User accounts
- Payment
- Live weather
- Live maps
- Real-time public transport
- Booking systems
- Social media image generation
- Multi-trip platform
- Full preference memory
- Full RAG implementation

## Future After MVP

After the MVP works, future upgrades may include:

- Real AI chat
- Backend save
- Database
- User login
- Share links
- PDF export
- Multiple trips
- Itinerary upload
- Google Docs or Sheets import
- Preference learning
- Suggestion planning
- Live APIs
- Social media version generation

## Key Lesson

The MVP should not try to build the whole dream product.

The MVP should prove the core loop:

```text
Open itinerary
↓
Understand today
↓
Ask for change
↓
Preview alternatives
↓
Confirm
↓
Save updated plan
```
