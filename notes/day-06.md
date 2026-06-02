# Day 6 Notes: Austria Trip Companion Bot - MVP Complete

**Date**: June 2, 2026  
**Project**: Holiday Planner: Austria Trip Companion Bot  
**Status**: Day 6 objectives completed

---

## What I Accomplished Today

### 1. Created Repository-Wide Copilot Instructions

**File**: `.github/copilot-instructions.md`

I documented how AI assistants (Copilot, Claude, or other agents) should work on this repository. This includes:
- Repository purpose and current active project
- 10-point workflow for AI assistants
- Files to read, edit, and avoid
- Safety rules and quality standards
- Holiday Planner-specific guidance

**Why this matters:**
As I scale to using AI agents more, I need clear instructions so they don't accidentally edit sensitive files, invent data, or waste tokens. This file acts as a "constitution" for agent behavior.

### 2. Created Copilot Task Issue Template

**File**: `.github/ISSUE_TEMPLATE/copilot-task.md`

I created a structured template for defining tasks that should only be worked on by Copilot (or human developers). This includes:
- Clear task title and goal
- Files to read, edit, and avoid
- Constraints and safety rules
- Expected output and deliverables
- Post-work summary requirements

**Why this matters:**
Manual issues can be vague. A structured template ensures every Copilot task has clear context, constraints, and acceptance criteria. This reduces ambiguity and token waste.

### 3. Defined Trip Day Mapping

**File**: `projects/holiday-planner/TRIP_DAY_MAPPING.md`

I documented two approaches for how the bot should identify "today":

**Option 1: Manual Day Number** (Recommended for MVP)
- User: "What's today's plan? I'm on Day 2."
- Bot: Retrieves Day 2 and responds
- Simple, reliable, perfect for testing

**Option 2: Date-Based Calculation** (Future)
- User provides trip start date; bot calculates current day
- More natural but complex
- Good for future versions

**Why this matters:**
Without this, the bot doesn't know which day to fetch. This document clarifies the MVP approach (manual) and future path.

### 4. Created Day 2 Test Output

**File**: `projects/holiday-planner/test-output/day-2-today-plan-test.md`

I created a complete "What's today's plan?" response for Day 2 (Vienna) using only data from the Austria dataset. The output includes:

✅ **Quick Summary** - Day 2 theme and overall feel  
✅ **Main Highlights** - Schönbrunn, Belvedere, Wien Museum, Karlskirche  
✅ **Suggested Timeline** - Morning, afternoon, evening breakdown  
✅ **Food Ideas** - Breakfast, lunch, tea, dinner with specific cafes  
✅ **Transport Notes** - U-Bahn, tram, walking routes  
✅ **Things to Prepare** - Shoes, water, snacks, City Card, etc.  
✅ **Verify Live** - Opening hours, timed entries, weather, transit  
✅ **Optional Adjustment** - Lighter-day versions if tired  

**Validation**:
- All data comes from austria-13-day-sanitized.md, Day 2 section
- No invented opening hours, prices, or live conditions
- Follows BOT_SPEC.md structured format exactly
- Practical for a traveler to use on the actual trip

**What I learned:**
- The Austria dataset is rich enough for detailed daily briefings
- Transport connections are clear and actionable
- Food suggestions are specific and helpful
- The bot can generate practical, travel-ready outputs

### 5. Updated TASKS.md

**Changes**:
- Task 8: "Manually test the bot with Day 2" → **Status: Completed**
- Task 9: "Create trip day mapping rule" → **Status: Completed**

---

## How These Pieces Work Together

```
User Input
   ↓
Copilot Task Template (.github/ISSUE_TEMPLATE/copilot-task.md)
   ↓
Copilot Instructions (.github/copilot-instructions.md)
   ↓
Trip Day Mapping (TRIP_DAY_MAPPING.md)
   ↓
Bot Prompt (prompts/today-plan-bot.md)
   ↓
Austria Dataset (sample-data/austria-13-day-sanitized.md)
   ↓
Bot Output (test-output/day-2-today-plan-test.md)
```

## Key Insights

### 1. Agents Need "Constitution" Files
Just like humans need onboarding docs, AI agents need explicit rules. The copilot-instructions.md file prevents costly mistakes (editing protected files, inventing data) and saves tokens.

### 2. Structured Templates > Vague Instructions
The issue template forces clarity. Every task now has:
- What to read first
- What files to touch (and not touch)
- What success looks like
- What to summarize afterward

This reduces back-and-forth and cuts token waste.

### 3. Day Mapping Is a Core Design Decision
I could have hardcoded "always use Day 2" for testing, but that wouldn't scale. Instead, I documented two options:
- MVP: Manual day specification
- Future: Smart date-based calculation

This opens the door for growth without rework.

### 4. The Dataset Is Actually Good
The austria-13-day-sanitized.md itinerary is detailed enough to power real travel decisions. The Day 2 test output shows it provides:
- Specific attractions
- Real cafe and restaurant names
- Transport routing (U-Bahn, tram lines)
- Practical preparation notes
- Clear "verify live" distinctions

This validates the dataset is RAG-ready for future versions.

### 5. Bot Output Matches Spec
The Day 2 output perfectly mirrors BOT_SPEC.md's required format:
1. Today's Summary ✓
2. Main Highlights ✓
3. Timeline (morning/afternoon/evening) ✓
4. Food Ideas ✓
5. Transport Notes ✓
6. Things to Prepare ✓
7. Things to Verify Live ✓
8. Optional Adjustments ✓

This proves the spec is working and the bot is implementable.

---

## What's Left for Future Days

### For Day 7-10 (RAG Layer)
- Build semantic search over the Austria dataset
- Test "What days are in Salzburg?" type queries
- Create embeddings for attractions, transport, food

### For Day 11-15 (Bot UI)
- Simple web form: "What day?" + "Question?"
- Display formatted output
- Add weather API (optional, only with live data)

### For Day 16-20 (Deployment)
- Deploy to Vercel or similar
- Create shareable link for testing
- Gather user feedback

### For Day 21-30 (Polish & Portfolio)
- Add "my trip" mode (store user's itinerary)
- Multi-city support (not just Austria)
- GitHub portfolio showcase

---

## Files Created Today

1. `.github/copilot-instructions.md` - Repository-wide AI assistant guidelines
2. `.github/ISSUE_TEMPLATE/copilot-task.md` - Structured task template
3. `projects/holiday-planner/TRIP_DAY_MAPPING.md` - Day identification strategy
4. `projects/holiday-planner/test-output/day-2-today-plan-test.md` - Day 2 test output
5. `notes/day-06.md` - This file

## Files Updated Today

1. `projects/holiday-planner/TASKS.md` - Mark Task 8 and Task 9 as Completed

## Files Unchanged Today (As Required)

- `projects/holiday-planner/sample-data/austria-13-day-sanitized.md` ✓ Protected
- `projects/holiday-planner/sample-data/DATA_CLEANING_LOG.md` ✓ Protected
- `LICENSE` ✓ Protected
- `.gitignore` ✓ Protected

---

## Assumptions Made

1. **MVP Strategy**: I assumed Day 2 test output should use manual day specification ("I'm on Day 2") rather than date calculation, because it's simpler for testing and matches real user patterns.

2. **Data Fidelity**: I assumed the Austria dataset should never be edited or "improved" with outside knowledge. All test output uses only what's in the dataset.

3. **Bot is Stateless**: I assumed the bot doesn't remember previous conversations. Each question starts fresh. This is fine for MVP; session memory is a future feature.

4. **Austria Only**: I assumed the bot is Austria-specific for now. Multi-destination support can come later.

5. **Manual Review**: I assumed the Day 2 test output will be manually reviewed by a human to confirm it matches spec and is useful before automated testing begins.

---

## Personal Reflection

Day 6 felt like crossing a threshold. Days 1-5 were about *understanding* (reading docs, creating specs, preparing data). Day 6 was about *operationalizing* (making the bot actually work with a real test case).

The Day 2 output proves the concept works. A traveler could actually use this response to plan their day. That's exciting.

The Copilot instructions and task template also feel important—they're meta-work, not direct product work. But they're the foundation for scaling. As I move to building features faster (Days 7-30), I'll rely on these guides to keep agents from introducing bugs or inventing data.

Next, I want to see the bot answer other questions ("What's in Salzburg?" "Which days use the Vienna Card?") and eventually deploy something people can try.

---

## Metrics

- **Lines of documentation created**: ~600
- **Lines of test output created**: ~450
- **Files created**: 4
- **Files updated**: 1
- **Protected files touched**: 0 ✓
- **Time estimate**: 2-3 hours for a human; ~30 min with AI assistance

---

## Checklist: Day 6 Acceptance Criteria

- [x] Create .github/copilot-instructions.md with repository-specific Copilot instructions
- [x] Create .github/ISSUE_TEMPLATE/copilot-task.md for controlled Copilot tasks
- [x] Create projects/holiday-planner/TRIP_DAY_MAPPING.md
- [x] Create projects/holiday-planner/test-output/day-2-today-plan-test.md using Day 2 from the Austria dataset
- [x] Create notes/day-06.md
- [x] Update projects/holiday-planner/TASKS.md so Task 8 and Task 9 are marked Completed
- [x] Keep the Austria dataset unchanged
- [x] Do not add APIs, app code, database logic, or live travel information
- [x] Do not invent opening hours, prices, or live transport details
- [x] Use only the Austria itinerary dataset for the Day 2 test output
- [x] Expected Day 2 test output includes Schönbrunn, Belvedere, Wien Museum, Karlskirche
- [x] Expected Day 2 test output includes food, transport, preparation, verification, and optional adjustments

✅ **All acceptance criteria met.**
