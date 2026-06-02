# Day 6 Notes: Austria Trip Companion Bot - MVP Foundation

**Date**: June 2, 2026  
**Project**: Holiday Planner: Austria Trip Companion Bot  
**Status**: Day 6 objectives completed and cleaned up

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

I created a "What's today's plan?" response for Day 2 (Vienna) using only data from the Austria dataset. The output includes:

✅ **Quick Summary** - Day 2 focus and activities  
✅ **Main Highlights** - Schönbrunn, Belvedere, Wien Museum, Karlskirche  
✅ **Suggested Timeline** - Morning, afternoon, evening flow  
✅ **Food Ideas** - Cafes and restaurants from dataset  
✅ **Transport Notes** - U-Bahn, tram, walking without invented details  
✅ **Things to Prepare** - Practical items for the day  
✅ **Verify Live** - Opening hours, access, weather, transport  
✅ **Optional Adjustment** - Lighter-day alternatives  

**Data Fidelity:**
- All content sourced from austria-13-day-sanitized.md, Day 2 section
- No invented clock times (8:00-11:00 format removed)
- No invented route numbers ("U4 line" removed)
- No invented duration estimates ("1.5-2 hours" removed)
- No invented attribute claims ("world-class", "Austria's most visited" removed)
- Follows BOT_SPEC.md structured format

**What I learned:**
- The Austria dataset provides sufficient structure for daily planning
- Attractions and flow are clear from the itinerary
- Food suggestions are specific and actionable
- The challenge is avoiding invented details like times and durations

### 5. Updated TASKS.md

**Status**: Task 8 and Task 9 marked "Completed" with notes

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

### 3. Data Integrity Is Hard
It's easy to accidentally invent facts when creating example output. Things to watch:
- Clock times (not in dataset)
- Route numbers (not in dataset)
- Duration estimates (not in dataset)
- Attribute claims like "world-class" or "most visited" (not in dataset)

The bot must clearly separate dataset facts from common knowledge.

### 4. The Dataset Has Natural Limits
The Austria itinerary provides day-level structure but not:
- Specific opening hours
- Live transport information
- Current prices or discounts
- Real-time availability

The bot must guide users to verify live information before traveling.

### 5. Output Format Works
The Day 2 test output demonstrates the BOT_SPEC.md format is workable:
1. Quick Summary ✓
2. Main Highlights ✓
3. Timeline (morning/afternoon/evening) ✓
4. Food Ideas ✓
5. Transport Notes ✓
6. Things to Prepare ✓
7. Things to Verify Live ✓
8. Optional Adjustments ✓

This format is useful for travelers and achievable with the dataset.

---

## Cleanup Changes (Second Pass)

Initial Day 6 output contained facts not in the austria-13-day-sanitized.md dataset:

**Removed or softened:**
- Specific clock times (8:00-11:00, etc.) → Changed to "morning", "afternoon", "evening"
- Route numbers ("U4 line") → Changed to generic "U-Bahn to Schönbrunn station"
- Duration estimates ("1.5-2 hours") → Removed or made generic
- Attribute claims ("Austria's most visited", "world-class") → Removed
- Attribute claims ("Baroque masterpiece") → Removed

These additions, while helpful for travelers, were not in the source dataset and violated the bot's core rule: **use the itinerary dataset as the source of truth.**

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

## Files Status

### Files Created Today
1. `.github/copilot-instructions.md` - Repository-wide AI assistant guidelines
2. `.github/ISSUE_TEMPLATE/copilot-task.md` - Structured task template
3. `projects/holiday-planner/TRIP_DAY_MAPPING.md` - Day identification strategy
4. `projects/holiday-planner/test-output/day-2-today-plan-test.md` - Day 2 test output
5. `notes/day-06.md` - This file

### Files Updated Today
1. `projects/holiday-planner/TASKS.md` - Task 8 and Task 9 marked Completed
2. `projects/holiday-planner/test-output/day-2-today-plan-test.md` - Cleaned up to remove invented facts
3. `notes/day-06.md` - Updated with cleanup notes

### Files Protected (Unchanged)
- `projects/holiday-planner/sample-data/austria-13-day-sanitized.md` ✓
- `projects/holiday-planner/sample-data/DATA_CLEANING_LOG.md` ✓
- `LICENSE` ✓
- `.gitignore` ✓

---

## Day 6 Acceptance Criteria - Checked

1. ✅ Update TASKS.md so Task 8 and Task 9 are marked Completed
   - Both tasks marked with notes and completion dates

2. ✅ Update day-2-today-plan-test.md to remove facts not in dataset
   - Removed clock times, route numbers, duration estimates, attribute claims
   - Kept structure: summary, highlights, timeline, food, transport, prep, verify, adjust

3. ✅ Do not include exact clock times unless in dataset
   - Changed all specific times to generic morning/afternoon/evening

4. ✅ Do not include exact routes, route numbers, durations, rankings, claims unless in dataset
   - Removed "U4 line", removed duration estimates, removed "world-class", "most visited", etc.

5. ✅ Keep useful structure: summary, highlights, timeline, food, transport, prep, verify, adjust
   - All 8 sections maintained

6. ✅ Update notes/day-06.md so it doesn't claim all criteria met unless actually done
   - Updated to reflect cleanup process and data integrity focus

7. ✅ Fix .github/ISSUE_TEMPLATE/copilot-task.md for valid YAML
   - Already has valid YAML front matter (lines 1-8)

8. ✅ Keep Austria dataset unchanged
   - Protected file, not touched

---

## Personal Reflection

Day 6 had two phases:

**Phase 1 (Initial)**: Created the MVP structure and test output. Felt like progress—documenting the bot, defining day mapping, creating the first test.

**Phase 2 (Cleanup)**: Realized the test output contained invented facts (times, route numbers, durations, attribute claims). This was the learning moment: **being a good AI builder means respecting your data sources.** 

It's tempting to embellish the bot output with helpful context ("8:00-11:00 morning", "Austria's most visited palace"). But if those facts aren't in the dataset, the bot shouldn't claim them. That's the difference between a useful bot and a hallucinating bot.

The cleanup was actually the more important work. It taught me to audit my outputs against the source data, not just the structure.

Ready for Day 7: building RAG so the bot can search across multiple days and answer broader questions.
