# Next Steps: Holiday Companion Bot V1

## Overview

This document outlines the recommended tasks for the next Manus build run. The V1 static dashboard slice is complete and functional. The next priority is to add interactive features that allow users to request changes to their itinerary.

> [!NOTE]
> **Post-Build Fixes**: The compile issues due to the missing `@/lib/utils` component and dev server warnings due to `%VITE_ANALYTICS_*%` placeholders have been successfully resolved by creating `client/src/lib/utils.ts` and removing the analytics script block from `client/index.html`. The app now compiles and runs cleanly local out-of-the-box.

## Recommended Build Sequence

### Task 1: Add Chat Assistant and Prompt Chips (High Priority)

**Objective**: Enable users to ask questions and request changes through quick prompt chips.

**What to Build**:
- Create `client/src/components/holiday/ChatAssistant.tsx` component
- Create `client/src/components/holiday/PromptChips.tsx` component
- Create `client/src/lib/mockResponses.ts` for mock chat responses
- Add chat state to `Home.tsx` (chatMessages array)
- Wire up prompt chip click handlers

**Prompt Chips to Implement**:
- "What's today's plan?" → Summarize current day activities
- "What is tomorrow's plan?" → Summarize tomorrow's activities
- "What food is planned today?" → List today's food options
- "What transport notes should I know?" → List today's transport
- "What can I skip if I am tired?" → Suggest optional activities
- "Make today lighter" → Generate proposed change
- "Add a cafe break" → Generate proposed change
- "Replace an activity" → Generate proposed change

**Mock Response Examples**:
- For "What's today's plan?": "Today you have a culture-heavy day in Vienna. Morning: Schönbrunn Palace and gardens. Afternoon: Upper Belvedere, Wien Museum, and tea time. Evening: Karlskirche and dinner. Remember to verify ticket availability and transport live."
- For "Make today lighter": Generate a proposed change object suggesting to remove one museum
- For "Add a cafe break": Generate a proposed change object suggesting to add a cafe break

**Acceptance Criteria**:
- Prompt chips display in a horizontal scrollable area
- Clicking a chip adds user message to chat
- Mock response appears after chip click
- Chat messages display in chronological order
- Chat area is positioned at bottom of page

**Estimated Effort**: 2-3 hours

---

### Task 2: Add Proposed Change Card (High Priority)

**Objective**: Show users proposed itinerary changes before they confirm.

**What to Build**:
- Create `client/src/components/holiday/ProposedChangeCard.tsx` component
- Add proposedChange state to `Home.tsx`
- Implement change generation logic for different prompt types
- Wire up Confirm and Reject handlers
- Update version history when changes are confirmed

**Proposed Change Structure**:
```typescript
{
  changeId: string;
  status: "awaiting_confirmation";
  type: "replace_activity" | "make_lighter" | "add_cafe_break";
  affectedDay: number;
  currentItem: string;
  proposedReplacement: string;
  impact: string;
  options?: string[]; // For replacement activities
}
```

**Change Types to Handle**:

1. **Replace Activity**: Show 3 options (relaxed cafe break, short scenic walk, free time)
2. **Make Today Lighter**: Remove one afternoon activity
3. **Add Cafe Break**: Insert cafe break into afternoon

**Confirm Behavior**:
- Apply change to local state
- Mark affected day as edited
- Add version history entry
- Update save status to "saved_locally"
- Clear proposed change
- Add assistant message: "Change saved locally"

**Reject Behavior**:
- Clear proposed change
- Do not update itinerary
- Add assistant message: "Change rejected"

**Acceptance Criteria**:
- Proposed change card displays when change is generated
- Shows all required information (intent, affected day, current item, proposed change, impact)
- Confirm button applies change and updates UI
- Reject button clears change without updating
- Version history updates on confirm
- Edited badge appears on affected day

**Estimated Effort**: 2-3 hours

---

### Task 3: Add localStorage Support (Medium Priority)

**Objective**: Persist itinerary changes across browser sessions.

**What to Build**:
- Create `client/src/lib/storage.ts` with save/load functions
- Update `Home.tsx` to save on app startup and after each change
- Implement localStorage keys:
  - `holiday_companion_current_trip` → Full trip state
  - `holiday_companion_version_history` → Version history

**Storage Functions**:
```typescript
// Save current trip to localStorage
export function saveTrip(trip: ItineraryState): void

// Load trip from localStorage
export function loadTrip(): ItineraryState | null

// Clear localStorage
export function clearTrip(): void

// Check if saved trip exists
export function hasSavedTrip(): boolean
```

**Startup Logic**:
1. Check if localStorage has saved trip
2. If yes, load saved trip and set saveStatus to "saved_locally"
3. If no, load sample data and set saveStatus to "using_sample_data"
4. Display appropriate message in header

**Acceptance Criteria**:
- Changes persist after page refresh
- Save status updates correctly
- Version history persists
- Edited day status persists
- localStorage keys are used correctly

**Estimated Effort**: 1-2 hours

---

### Task 4: Add Reset Sample Trip Button (Medium Priority)

**Objective**: Allow users to clear all changes and reload the sample data.

**What to Build**:
- Add reset button to Trip Dashboard
- Implement reset handler in `Home.tsx`
- Clear localStorage on reset
- Reload sample data
- Reset version history to initial state

**Reset Behavior**:
1. Clear localStorage
2. Reload austria sample data
3. Reset version history to version 1
4. Clear all edited flags
5. Set saveStatus to "using_sample_data"
6. Add assistant message: "Sample trip reset. All changes cleared."

**UI Placement**: Add button in Trip Dashboard card

**Acceptance Criteria**:
- Reset button clears all changes
- Sample data reloads correctly
- Version history resets to 1
- All edited flags cleared
- Save status updates to "using_sample_data"

**Estimated Effort**: 1 hour

---

### Task 5: Polish and Refinement (Low Priority)

**Objective**: Improve visual polish and user experience.

**Potential Improvements**:
- Add smooth transitions when proposed change appears/disappears
- Add loading state while processing changes
- Improve chat message styling and animations
- Add empty state for chat before any messages
- Add scroll-to-bottom for chat messages
- Improve mobile layout for chat area
- Add keyboard shortcuts for common actions
- Add visual feedback on button clicks

**Estimated Effort**: 2-3 hours (optional)

---

## Build Order Recommendation

**Run 2 (Next)**:
1. Task 1: Chat Assistant and Prompt Chips
2. Task 2: Proposed Change Card
3. Task 3: localStorage Support

**Run 3**:
1. Task 4: Reset Button
2. Task 5: Polish and Refinement

**Run 4+**:
- Add real AI calls (replace mock responses)
- Add backend server
- Add database
- Add authentication
- Add maps integration
- Add weather integration
- Add real sharing
- Add PDF export

## Technical Notes

### Component Integration Points

**Home.tsx State to Add**:
```typescript
const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
const [proposedChange, setProposedChange] = useState<ProposedChange | null>(null);
```

**Handler Functions to Add**:
```typescript
const handlePromptChipClick = (chip: string) => { ... }
const handleConfirmChange = () => { ... }
const handleRejectChange = () => { ... }
const handleResetTrip = () => { ... }
```

### New Files to Create

```
client/src/
├── components/
│   └── holiday/
│       ├── ChatAssistant.tsx (new)
│       ├── PromptChips.tsx (new)
│       └── ProposedChangeCard.tsx (new)
├── lib/
│   ├── mockResponses.ts (new)
│   └── storage.ts (new)
└── types/
    └── holiday.ts (optional - for shared types)
```

### Dependencies Already Available

- `lucide-react` - Icons for chat, changes, etc.
- `sonner` - Toast notifications for feedback
- `framer-motion` - Smooth animations (optional)

### Testing Recommendations

1. **Chat System**: Test all 8 prompt chips with mock responses
2. **Change Flow**: Test confirm and reject for each change type
3. **localStorage**: Test persistence across page refreshes
4. **Reset**: Test that reset clears all changes and reloads sample data
5. **Mobile**: Test chat and proposed change on mobile devices
6. **Edge Cases**: Test with no upcoming days, last day of trip, etc.

## Questions for Next Builder

1. Should chat messages be cleared when user resets the trip?
2. Should proposed changes show a preview of the updated day?
3. Should users be able to undo confirmed changes?
4. Should there be a limit on how many changes can be made?
5. Should version history show timestamps for each change?

## Success Criteria for Next Run

- ✅ All 8 prompt chips working with mock responses
- ✅ Proposed change card displays correctly
- ✅ Confirm/reject buttons update state
- ✅ Changes persist after page refresh
- ✅ Reset button clears all changes
- ✅ No console errors
- ✅ Mobile layout works for chat
- ✅ Version history updates correctly
- ✅ Edited badges appear on changed days

## Resources

- **Component Plan**: See `projects/holiday-planner/FRONTEND_COMPONENT_PLAN.md`
- **Data Loading Plan**: See `projects/holiday-planner/DATA_LOADING_PLAN.md`
- **Build Brief**: See `projects/holiday-planner/MANUS_V1_BUILD_BRIEF.md`
- **Current Build**: See `BUILD_HANDOFF.md` and `BUILD_LOG.md`

## Estimated Timeline

- **Task 1 (Chat)**: 2-3 hours
- **Task 2 (Proposed Changes)**: 2-3 hours
- **Task 3 (localStorage)**: 1-2 hours
- **Task 4 (Reset)**: 1 hour
- **Task 5 (Polish)**: 2-3 hours (optional)

**Total for Run 2**: 5-8 hours (Tasks 1-3)

---

**Next Steps Document**

Ready for the next Manus build run. All components from V1 are stable and ready for extension.
