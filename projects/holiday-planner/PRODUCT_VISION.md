# Product Vision: Holiday Companion Bot

## Product Name

Holiday Companion Bot

## One-Sentence Vision

Holiday Companion Bot helps users build, organize, follow, edit, save, and share flexible travel itineraries with AI assistance.

## Product Summary

Holiday Companion Bot is an AI-assisted travel product that supports the full trip lifecycle:

1. Before the trip: build and organize an itinerary.
2. During the trip: guide the user through today and tomorrow.
3. During the trip: adjust plans when timing, energy, or preferences change.
4. After the trip: save, share, and reuse the itinerary.

The product should feel like a practical travel assistant and friendly travel buddy.

## Primary User

The first user is:

```text
Me
```

The product should first solve my own travel planning and trip companion needs.

## Future Users

After the product works for me, it can expand to:

1. Friends and family
2. General travellers
3. Travel planners or agencies
4. Content creators who want to share itineraries

These are future audiences, not the first MVP focus.

## Main Use Timeline

The product should support different moments in the travel journey.

## 1. Before the Trip

Before the trip, the user wants to create a strong baseline itinerary.

Important use cases:

- Generate a first itinerary idea
- Fill in preferences
- Import an existing itinerary
- Organize the trip into days
- Review the overall trip plan

This is important first because the Austria trip has not happened yet.

## 2. During the Trip

During the trip, the user wants quick guidance.

Important use cases:

- Check today's plan
- Check tomorrow's plan
- See activities, food, and transport notes
- Ask what is next
- Ask what can be skipped
- Ask for alternatives when a plan is missed
- Adjust the day when tired or delayed

This becomes more important when the trip starts.

## 3. After the Trip

After the trip, the user may want to save or share the itinerary.

Important use cases:

- Share the full itinerary
- Share selected days
- Export as PDF or document
- Create a private link for friends and family
- Generate a social-media-friendly version later

Sharing is useful, but not the first MVP priority.

## Main Problem

Travel itineraries are often hard to use in real life.

A user may have a long plan, but during the actual trip they still ask:

```text
What should I do now?
What is next?
Where should I eat?
What can I skip?
What if I missed the timing?
What is the backup plan?
What should I do tomorrow?
```

A static itinerary does not solve this well.

The product should make the itinerary flexible, interactive, and easier to follow.

## Product Promise

This product would be useful if it could help the user go through each day of a trip without worrying about what comes next.

When the user feels lost, delayed, tired, or unsure, they can return to the product for guidance.

## Core User Flow

The ideal product flow is:

```text
User opens product
↓
Product shows today's plan
↓
User checks activities, food, and transport
↓
User asks the bot what to do next
↓
Bot answers using the saved itinerary
↓
User asks to change the plan
↓
Bot suggests 2 to 3 alternatives
↓
User chooses one option or leaves it as relax time
↓
Product updates itinerary state after confirmation
↓
Future plans reflect the updated itinerary
```

## Itinerary Creation Flow

The user should be able to create the first itinerary in multiple ways.

## Option 1: AI Baseline Itinerary

The user can type:

```text
Plan me a 13-day Austria trip.
```

The product generates a first baseline itinerary.

This should be the first creation method.

## Option 2: Guided Preference Questions

After the user asks for a baseline itinerary, the product can ask follow-up questions:

- Destination
- Dates
- Budget
- Travel style
- Food preferences
- Activity preferences
- Pace
- Group type

This helps the AI improve the baseline plan.

## Option 3: Import Existing Itinerary

The user can paste or upload an existing itinerary.

This is useful for fast onboarding because many users already have plans in notes, documents, or spreadsheets.

## Option 4: Future Import Integrations

Later, the product may import from:

- Google Docs
- Google Sheets
- Notion
- Calendar
- Uploaded files

This is useful but not critical for the first MVP.

## Option 5: Template-Based Creation

The product may later offer itinerary templates.

Example:

- Relaxed city trip
- Food-heavy trip
- Museum-focused trip
- Couple trip
- Family trip

This is future work.

## Home Screen Vision

When the user opens the product, the home screen should show:

1. Today's plan as the main focus
2. Chat assistant near the bottom
3. Trip dashboard on the right
4. Create new trip button at the bottom or secondary area

## Today's Plan Should Include

The first version of today's plan should include:

- Main activities
- Food or cafe suggestions
- Transport notes

Future versions may include:

- Things to prepare
- Ticket reminders
- Weather checks
- Backup/lighter options
- Map links
- Estimated budget

## Editing Behavior

The user should be able to edit the itinerary in two ways:

1. Manual editing
2. Asking the bot to edit

When the bot edits, it should not directly apply changes without review.

For change requests, the bot should show:

- 2 to 3 alternative options
- One option to leave the time as relax/free time
- A confirmation step before saving

Example:

```text
User:
Replace this palace visit with something lighter.

Bot:
Here are 3 options:

Option A: Cafe break near the current area
Option B: Short scenic walk
Option C: Leave this block as relax time

Which option would you like to apply?
```

## AI Control Level

The AI should be able to help change:

- Activities
- Food stops
- Transport notes
- Whole-day structure
- Activity timing
- Movement across days
- New itinerary creation

However, the AI should always preview important changes before saving them.

## Version Control

The product should support version control.

The user should be able to preview previous versions of the itinerary.

This helps with:

- Undoing changes
- Comparing itinerary versions
- Understanding what changed
- Building trust
- Learning preferences later

## What Should Be Saved

When the user confirms a change, the product should save:

- Updated full itinerary
- Changed day
- Version history
- Shareable final itinerary later

The product does not need to save these in the early MVP:

- Reason for change
- Preference memory

These can come later.

## Sharing Vision

The product should eventually support sharing:

- Full itinerary
- Selected days
- Private link for friends or family
- PDF or export
- Social-media-friendly version later

Social media sharing is a far-future feature.

Sharing should always remove private information first.

## Bot Tone

The bot should be:

```text
Practical travel assistant + friendly travel buddy
```

The user should eventually be able to choose tone preference.

Possible tones:

- Practical and direct
- Friendly and casual
- Professional itinerary planner
- Minimal
- Concierge-style

## Day 30 Outcome

The main Day 30 outcome should be:

1. A clear product spec
2. A strong build-ready product backbone
3. A working local-state prototype plan
4. A path toward a usable Holiday Companion Bot

The good-to-have outcome is:

- AI-powered chat or chatbot assistance

A full production backend is not required by Day 30.

## Product Success Definition

This product is useful if it can help the user:

- Know what to do today
- Know what to do tomorrow
- Understand food and transport options
- Adjust when timing is missed
- Find alternative plans
- Save updated itinerary changes
- Revisit previous versions
- Share the final itinerary later

## Final Product Direction

The product should become:

```text
A flexible AI travel companion that helps users create, follow, edit, save, and share trip itineraries.
```
