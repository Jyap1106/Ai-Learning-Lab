# Frontend Component Plan

## Purpose

This file breaks the Holiday Companion Bot frontend MVP into smaller components.

The goal is to make the prototype easier to build manually or with AI tools while minimizing wasted credits.

## Product Context

The first frontend prototype should be:

- Frontend-only
- Local-state based
- Mock chat first
- No backend
- No database
- No paid APIs
- No real AI calls yet

## Main App Layout

The app should use this structure:

```text
AppShell
├── Header
├── MainContent
│   ├── TodayPlanCard
│   ├── TomorrowPlanCard
│   └── FullItineraryList
├── TripDashboard
├── ChatAssistant
│   └── PromptChips
├── ProposedChangeCard
└── VersionSummary
```

## Component 1: AppShell

## Purpose

AppShell controls the overall layout.

## Responsibilities

- Holds the page structure
- Passes state to child components
- Controls desktop and mobile layout
- Holds top-level app state

## State Needed

- currentTrip
- currentDay
- itineraryDays
- selectedDay
- chatMessages
- proposedChange
- saveStatus
- versionHistory

## Component 2: Header

## Purpose

Header shows the product and trip status.

## Props

```text
tripName
currentDay
saveStatus
onCreateTripClick
onSharePreviewClick
```

## Shows

- Product name
- Trip name
- Current day
- Save status
- Create New Trip button
- Share Preview button

## Component 3: TodayPlanCard

## Purpose

Shows the main daily plan.

## Props

```text
day
onAskToday
onMakeLighter
onAddCafeBreak
onReplaceActivity
onViewTomorrow
```

## Shows

- Day number
- City
- Theme
- Morning plan
- Afternoon plan
- Evening plan
- Food ideas
- Transport notes
- Quick action buttons

## Quick Actions

- Ask about today
- Make today lighter
- Add cafe break
- Replace activity
- View tomorrow

## Component 4: TomorrowPlanCard

## Purpose

Shows tomorrow's plan summary.

## Props

```text
day
onViewTomorrow
onAskTomorrow
```

## Shows

- Day number
- City
- Theme
- Main activities summary
- Food summary
- Transport summary

## Component 5: TripDashboard

## Purpose

Shows trip overview.

## Props

```text
trip
currentDay
versionHistory
saveStatus
upcomingDays
```

## Shows

- Trip name
- Destination
- Duration
- Current day
- Save status
- Version count
- Upcoming days
- Share preview placeholder

## Component 6: FullItineraryList

## Purpose

Shows all days in compact form.

## Props

```text
days
selectedDay
onSelectDay
```

## Shows

For each day:

- Day number
- City
- Theme
- Edited status

## Component 7: ChatAssistant

## Purpose

Lets the user ask questions and request changes.

## Props

```text
messages
onSendMessage
onPromptChipClick
```

## Shows

- Chat messages
- Input box
- Prompt chips
- Mock assistant responses

## Component 8: PromptChips

## Purpose

Shows quick actions to reduce typing.

## Props

```text
chips
onChipClick
```

## Initial Chips

- What's today's plan?
- What is tomorrow's plan?
- What food is planned today?
- What transport notes should I know?
- What can I skip if I am tired?
- Make today lighter
- Add a cafe break
- Replace an activity

## Component 9: ProposedChangeCard

## Purpose

Shows a proposed itinerary edit before saving.

## Props

```text
proposedChange
onConfirm
onReject
```

## Shows

- Detected intent
- Affected day
- Current item
- Proposed change
- Options
- Impact
- Confirm button
- Reject button

## Component 10: VersionSummary

## Purpose

Shows basic version history.

## Props

```text
versionHistory
```

## Shows

- Version count
- Latest version summary
- Recent changes

## Component 11: SharePreviewPlaceholder

## Purpose

Shows future sharing behavior.

## Props

```text
onClose
```

## Shows

- Sharing is a future feature
- Private data will be removed before sharing
- No real link is created in MVP

## Component 12: CreateTripPlaceholder

## Purpose

Shows future create-trip behavior.

## Props

```text
onClose
```

## Shows

- Create New Trip is a future feature
- MVP uses Austria sample trip
- Future options may include AI baseline itinerary, preferences, or import

## App State Shape

The app can use this state:

```text
currentTrip
days
currentDay
selectedDay
chatMessages
proposedChange
saveStatus
versionHistory
showSharePreview
showCreateTripModal
```

## Handler Functions

The first prototype needs these handlers:

```text
handlePromptChipClick(chip)
handleSendMessage(message)
handleCreateProposedChange(type)
handleConfirmChange()
handleRejectChange()
handleSelectDay(dayNumber)
handleViewTomorrow()
handleResetLocalData()
handleSharePreview()
handleCreateTripPlaceholder()
```

## Mock Chat Handler

The mock chat handler should map prompt chips to responses.

Example:

```text
"What is today's plan?" → read-only response from current day
"Add a cafe break" → proposed change object
"Make today lighter" → proposed change object
```

## Confirm Change Handler

When user confirms:

```text
Apply proposed change to local state
Add version history entry
Update save status
Save to localStorage
Clear proposed change
Add assistant message
```

## Reject Change Handler

When user rejects:

```text
Clear proposed change
Do not update itinerary
Add assistant message saying no changes were saved
```

## Component Build Order

Build in this order:

1. AppShell
2. Header
3. TodayPlanCard
4. TomorrowPlanCard
5. TripDashboard
6. FullItineraryList
7. ChatAssistant
8. PromptChips
9. ProposedChangeCard
10. VersionSummary
11. localStorage helpers
12. Placeholder modals

## Low-Credit Build Strategy

Do not ask AI to build every component at once.

Use this order:

```text
Build layout first
Build cards second
Build chat third
Build proposed change behavior fourth
Build localStorage last
```

## What Not To Build Yet

Do not build:

- Backend
- Database
- Authentication
- Real AI calls
- Live maps
- Live weather
- Real sharing links
- PDF export
- Multi-trip management
- Full manual editor

## Success Criteria

The component plan is successful if a builder can create the frontend prototype using small component tasks.

The MVP should be understandable even before code is written.

## Key Lesson

Components are how a big product becomes buildable.

The smaller the component task, the less likely an AI builder will waste credits or rewrite unrelated parts.
