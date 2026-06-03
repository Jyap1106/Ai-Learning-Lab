# Day 7 Learning Notes: Bot Question Pattern Testing

**Date**: Day 7 of AI Learning Lab  
**Project**: Holiday Planner: Austria Trip Companion Bot  
**Focus**: Testing bot question patterns across different query types

---

## What I Worked On Today

Today I tested whether the Austria Trip Companion Bot can answer 7 different question patterns using only the Austria itinerary dataset:

1. **Food question** (day-specific): "What food is planned today? I am on Day 2."
2. **Tiredness rating** (day-specific): "Is today a heavy day? I am on Day 2."
3. **Skip if tired** (conditional): "What can I skip if I am tired? I am on Day 2."
4. **Tomorrow's plan** (future calculation): "What is tomorrow's plan? I am currently on Day 2."
5. **Intercity travel days** (cross-day search): "Which days involve intercity travel?"
6. **Museum days** (cross-day ranked search): "Which days are best for museums?"
7. **Cafe days** (cross-day ranked search): "Which days are best for cafes?"

All 7 tests **PASSED**, validating that the dataset structure supports diverse question patterns.

---

## Why This Matters

This testing phase is critical because:

1. **Dataset Validation**: Proves the Austria itinerary dataset is well-structured for bot retrieval
2. **Question Diversity**: Confirms the bot can handle more than just "What's today's plan?" questions
3. **Bot Readiness**: Shows we're ready to move from single-question testing (Day 6) to multi-intent bot design (Task 11)
4. **Pattern Recognition**: Identifies which question types work well and which need "Verify Live" disclaimers
5. **Future RAG Preparation**: Demonstrates that cross-day scanning and filtering will work for semantic search

---

## Source of Truth

**Primary Dataset**: `sample-data/austria-13-day-sanitized.md`

The dataset contains:
- **13 structured days** (Day 1 - Day 13)
- **Consistent sections per day**: Morning, Afternoon, Evening, Food, Transport, Notes
- **Specific names**: Cafe names (Demel, Cafe Central), attractions (Schönbrunn, Belvedere), restaurants
- **Metadata**: Paid/free status, city card coverage, seasonal notes
- **Flexibility**: Optional activities, lighter-day alternatives, backup plans

**Why this dataset works**:
- ✅ Searchable keywords (intercity, paid, free, Salzburg Card, etc.)
- ✅ Ranked content (must-do cafes vs. optional stops)
- ✅ Clear structure (morning/afternoon/evening)
- ✅ Specific details (cafe recommendations, transport notes)

---

## What I Learned

### Learning 1: Day-Specific Questions Work Excellently

When a question specifies a day, retrieval is straightforward:
- "What food is planned on Day 2?" → Extract Day 2 → Retrieve Food section
- "Is Day 2 heavy?" → Extract Day 2 → Count attractions + transport → Assess complexity
- "What can I skip on Day 2?" → Extract Day 2 → Separate required vs. optional → Suggest filters

**Key insight**: The dataset's day-by-day structure is ideal for day-specific queries.

### Learning 2: Tomorrow Calculation is Simple Math

Calculating tomorrow requires:
1. Extract current day from user question
2. Add 1 to day number
3. Retrieve next day's section
4. Return formatted answer

Day 2 → Day 3 is straightforward. This pattern scales to all 13 days.

**Key insight**: No complex logic needed; simple arithmetic works.

### Learning 3: Cross-Day Scanning Needs Keywords

For "Which days involve intercity travel?", the bot scans all days looking for keywords:
- "intercity train" (appears in Days 4, 9, 11)
- "regional train" (appears in Days 7, 9)
- "long train journey" (appears in Day 9)

Results found:
- Day 4: Vienna → Salzburg
- Day 7: Salzburg → Obertraun
- Day 9: Obertraun → Innsbruck (explicitly "long")
- Day 11: Innsbruck → Vienna

**Key insight**: Cross-day searches work when the dataset uses consistent terminology.

### Learning 4: Ranking and Assessment Require Content Analysis

For "Which days are best for cafes?", the bot must:
1. Scan all days for cafe counts and mentions
2. Identify cafe-themed days vs. casual stops
3. Rank by concentration: Day 3 > Day 6 > Day 12 > others
4. Justify with cafe names and specialties

**Key insight**: Ranking requires understanding context, not just counting occurrences.

### Learning 5: Specific Details Enable Confidence

Questions like "What cafes are on Day 3?" work because the dataset names specific cafes:
- Demel (famous patisserie)
- Cafe Central (classical Vienna)
- Fenster Cafe (specialty: Fensterccino)

If the dataset only said "visit cafes," the answer would be vague. Specific names create specific answers.

**Key insight**: The dataset's level of detail directly enables bot confidence and usefulness.

### Learning 6: "Verify Live" is Essential for External Data

The dataset excels at "What's in the itinerary?" but fails at "What time does Schönbrunn open?"

For every answer, the bot must clearly identify:
- **From dataset**: Specific attractions and recommendations
- **Verify live**: Opening hours, prices, weather, crowd levels, reservations

**Key insight**: Separating dataset facts from live information is the bot's most important rule.

### Learning 7: Optional Activities Create Flexibility

Day 2 can be a "heavy day" or a "lighter day" because the dataset allows filtering:

**Heavy version**: All 4 attractions (Schönbrunn + Belvedere + Wien Museum + Karlskirche)
**Lighter version**: Core attractions only (Schönbrunn + Karlskirche, skip museums)

This flexibility makes the bot genuinely useful for tired travelers.

**Key insight**: Good datasets include optional alternatives, not just required activities.

---

## Day-Specific Questions

### Pattern Recognition

Day-specific questions follow this structure:
```
User: "[Question about activity/attributes] I am on Day [N]."
Bot: Extract Day N → Analyze → Answer
```

**Questions tested**:
1. "What food is planned today? I am on Day 2."
2. "Is today a heavy day? I am on Day 2."
3. "What can I skip if I am tired? I am on Day 2."

**Result**: ✅ All 3 passed

**Why they work**:
- Day number is explicit in user input
- Dataset has clear Day N sections
- Assessment criteria (food, heaviness, skippable items) are extractable

**Limitations**:
- Assumes user knows their day number
- Requires all day numbers to be spelled out (1-13)
- Cannot answer "What is next month?" (outside dataset scope)

---

## Cross-Day Questions

### Pattern Recognition

Cross-day questions search multiple days for a pattern:
```
User: "Which days [have pattern]?"
Bot: Scan all days → Identify pattern matches → Return ranked list
```

**Questions tested**:
1. "Which days involve intercity travel?"
2. "Which days are best for museums?"
3. "Which days are best for cafes?"

**Result**: ✅ All 3 passed

**Why they work**:
- Keywords are consistent across days (intercity, paid, cafe names)
- Dataset structure allows line-by-line scanning
- Days can be ranked by concentration

**Limitations**:
- Requires precise keyword matching or semantic search
- Subjective rankings (what makes a "best" day?)
- Missing data (if a day lacks keywords, it's invisible)

---

## Tomorrow Questions

### Pattern Recognition

Tomorrow questions require day calculation:
```
User: "What is tomorrow's plan? I am currently on Day [N]."
Bot: Calculate N+1 → Extract Day N+1 → Return full day details
```

**Question tested**:
1. "What is tomorrow's plan? I am currently on Day 2."

**Result**: ✅ Passed

**Why it works**:
- Simple arithmetic (Day 2 + 1 = Day 3)
- Dataset has all days (1-13)
- Complete day details available for retrieval

**Limitations**:
- Only works within 13-day itinerary (can't ask for Day 14)
- Assumes "tomorrow" means next calendar day (doesn't account for rest days or split days)
- Requires current day to be specified

---

## Important Bot Rule

**Separation of Dataset Information from Live Information**

The bot must clearly distinguish:

**✅ From Dataset**:
- Attractions and activities scheduled
- Specific cafe and restaurant names
- Food recommendations and specialties
- Transport routes and methods
- City card coverage
- Paid vs. free status
- Optional alternatives

**⚠️ Verify Live**:
- Opening hours (hours of operation)
- Entry prices and discounts
- Weather forecasts
- Real-time transport status
- Crowd levels and wait times
- Reservations and timed-entry availability
- Restaurant availability and seating
- Seasonal closures or renovations

**The Rule**: "If something changes in real time, it must be verified live."

---

## Reflection Questions

### 1. Which question pattern felt most useful?

**Answer**: **Day-specific questions** (food, tiredness, skip options) felt most practically useful.

**Why**: A traveler during the trip needs immediate, actionable answers like "What food can I eat today?" or "Can I rest tomorrow instead?" These questions directly support decision-making.

**Ranking by usefulness**:
1. **Food questions** - Travelers eat multiple times per day; highly relevant
2. **Tiredness/adjustment questions** - Help travelers adapt on the fly
3. **Tomorrow questions** - Help with evening planning
4. **Cross-day searches** - Help with broader trip planning (less urgent)

---

### 2. Which question pattern was hardest for the bot?

**Answer**: **Cross-day ranking questions** (Which days are best for museums? Which days are best for cafes?) were hardest because they require subjective assessment.

**Why ranking is hard**:
- "Best" is subjective (best for first-time visitors? For art lovers? For quick walks?)
- Requires counting and comparing across 13 days
- Assumes the definition of "museum day" or "cafe day" (is one cafe stop a "cafe day"?)
- Day 5 has Mozart sites (museum-adjacent?) but isn't primarily a museum day

**What would help**:
- Explicit "museum focus" labels in dataset
- Quantity indicators (e.g., "3 major museums" vs. "1 secondary museum")
- Traveler preference context (e.g., "For art lovers" vs. "For quick walks")

---

### 3. What information does the dataset need more of?

**Critical gaps**:

1. **Durations**
   - Missing: How long does Schönbrunn take? (1 hour? 3 hours? Half day?)
   - Impact: Can't answer "Can I do Schönbrunn before lunch?"

2. **Opening Hours**
   - Missing: Exact times (e.g., "10:00-18:00")
   - Have: General reference ("tea time," "morning," "afternoon")
   - Impact: Can't answer "Is it open at 7 PM?"

3. **Typical Costs**
   - Missing: Price ranges (even as reference)
   - Have: Free/paid status
   - Impact: Can't answer "How much does this day cost?"

4. **Visitor Intensity**
   - Missing: Crowd levels, rush hours
   - Have: None
   - Impact: Can't answer "When should I visit to avoid crowds?"

5. **Weather Considerations**
   - Missing: Seasonal impacts, indoor alternatives
   - Have: One note on Day 8 ("check weather for Dachstein")
   - Impact: Can't answer "What should I do if it rains?"

6. **Travel Times**
   - Missing: Duration between locations (e.g., "U-Bahn is 15 minutes")
   - Have: Routes only (e.g., "use U-Bahn to Schönbrunn")
   - Impact: Can't answer "Can I walk or should I take transport?"

7. **Reservation/Booking Info**
   - Missing: Which attractions need advance booking?
   - Have: One note on Day 7 ("re-check 2026 reopening and booking status")
   - Impact: Can't answer "Do I need to book Hallstatt in advance?"

**Practical order of importance**:
1. Durations (affects planning)
2. Opening hours (affects scheduling)
3. Reservation requirements (affects booking)
4. Typical costs (affects budget)
5. Crowd/weather info (affects experience)

---

### 4. When should the bot ask for clarification?

**The bot should ask for clarification when**:

1. **Day number is missing**: "I need to know which day of your trip you're on. Are you on Day 1, Day 2, Day 3... up to Day 13?"

2. **Question is ambiguous**: 
   - User: "What's the best day for shopping?"
   - Bot: "The dataset doesn't specifically label shopping days. Do you mean souvenirs (many days), or food shopping (Naschmarkt on Day 12)?"

3. **Question is out of scope**: 
   - User: "What should I do on Day 20?"
   - Bot: "The Austria itinerary covers 13 days (Days 1-13). Your question asks for Day 20, which is outside the trip. Could you rephrase?"

4. **Multiple interpretations**:
   - User: "Which days are best for museums?"
   - Bot (in reality): "By 'best,' do you mean most museums on one day, or days with famous museums, or museums that align with your interests?"

5. **Live information needed**:
   - User: "Can I visit Cafe Central on Day 3?"
   - Bot: "Cafe Central is listed for Day 3. However, the dataset notes that Cafe Central was under renovation. Before your trip, check if it has reopened."

6. **Preferences unknown**:
   - User: "What should I skip if I'm tired?"
   - Bot: "Day 2 has 4 attractions. What interests you most: palaces (Schönbrunn) or museums (Belvedere, Wien Museum)? This will help me suggest what to skip."

---

### 5. What should the next prompt improve?

**The next prompt (Task 11: multi-intent-trip-bot.md) should improve**:

### **Improvement 1: Explicit Question Type Detection**

**Current issue**: today-plan-bot.md handles only "What's today's plan?" questions.

**Fix**: Add a question classification section that identifies:
- Type: Day-specific vs. Tomorrow vs. Cross-day
- Intent: Information vs. Assessment vs. Ranking vs. Filtering
- Scope: Single day vs. Multi-day vs. Whole trip

**Example**:
```
Classify the user question:
- "What food is planned today? I am on Day 2."
  → Type: Day-specific
  → Intent: Information retrieval
  → Scope: Single day (Day 2)
  → Action: Retrieve Day 2 → Extract Food section
```

### **Improvement 2: Separate Output Styles by Question Type**

**Current issue**: All answers follow the same "Today's Plan" format.

**Fix**: Define distinct output formats:
- **Day-specific food**: List format (Breakfast options, Lunch options, Tea time, Dinner)
- **Day-specific tiredness**: Assessment + breakdown (Heavy/Moderate/Light + justification + alternatives)
- **Tomorrow**: Full day summary (Theme, Timeline, Food, Transport, Things to prepare)
- **Cross-day search**: Ranked list with highlights per day
- **Cross-day ranking**: Tier-based ranking (Tier 1, Tier 2, Tier 3)

### **Improvement 3: Standardized "Verify Live" Section**

**Current issue**: "Verify Live" varies by question type.

**Fix**: For each question type, auto-generate relevant checks:
- **Food question**: Cafe hours, menu, seating, dietary restrictions
- **Tomorrow question**: All attractions' hours, prices, weather
- **Cross-day search**: Availability across all identified days

### **Improvement 4: Explicit Clarification Triggers**

**Current issue**: Prompt doesn't specify when to ask for clarification.

**Fix**: Add a clarification section:
```
Ask for clarification if:
1. Day number is not provided
2. Question uses undefined terms (e.g., "best," "nearby," "expensive")
3. Question references out-of-dataset timeframe (Day 20)
4. Multiple interpretations are possible
5. Live information must be verified before answering
```

### **Improvement 5: Ranking Logic for Cross-Day Questions**

**Current issue**: No systematic way to rank days for "best" questions.

**Fix**: Define ranking criteria:
```
For "Which days are best for cafes?":
- Tier 1 (Cafe-themed): Day 3 (3+ named cafes, "classic Vienna cafes" theme)
- Tier 2 (Cafe-rich): Day 6, Day 12 (2+ cafes per day)
- Tier 3 (Cafe-present): Days 1, 2, 4, 5, 10 (1+ cafe option)
- Not recommended: Days 7, 8, 9, 11, 13 (travel days, limited options)
```

### **Improvement 6: Lightweight Context Memory**

**Current issue**: Each question resets context; bot doesn't remember previous day references.

**Fix**: Add context from previous questions:
```
Session Context:
- Current trip day: Day 2 (from previous question)
- User interests: Food-focused (from previous questions)
- Accessibility needs: None specified (for future use)
```

### **Improvement 7: Explicit Rules About Outside Knowledge**

**Current issue**: Not clear whether bot can use general Austria knowledge.

**Fix**: Make it explicit:
```
✅ CAN use: Dataset-provided information, basic travel logic (tomorrow = next day)
❌ CANNOT use: Opening hours, prices, weather, reviews from external sources
⚠️ MUST DEFER: Any real-time information (crowds, transit status, availability)
```

### **Improvement 8: Error Handling by Question Type**

**Current issue**: No systematic error handling.

**Fix**: Define responses for common errors:
```
If day number is invalid (e.g., Day 20):
→ "The Austria itinerary covers Days 1-13. Could you specify a day within the trip?"

If question references missing data (e.g., "What's the weather on Day 2?"):
→ "The itinerary doesn't include weather data. Check your destination forecast before traveling."

If question requires outside knowledge (e.g., "Is Schönbrunn better than Versailles?"):
→ "The itinerary doesn't compare attractions. Both are listed with activities on specific days."
```

---

## Next Step

**Task 11: Create Multi-Intent Bot Prompt** 

Build `prompts/multi-intent-trip-bot.md` that:
- ✅ Handles all 7 question patterns tested today
- ✅ Defines distinct output styles per question type
- ✅ Includes explicit "Verify Live" guidelines
- ✅ Provides clarification triggers
- ✅ Implements ranking logic for cross-day questions
- ✅ Separates dataset facts from live information
- ✅ Includes error handling for out-of-scope questions

**Success criteria for Task 11**:
- Prompt supports 8 question types (today, food, tired, skip, tomorrow, intercity, museums, cafes)
- Each question type has clear instructions
- Every answer includes a "Verify Live" section
- Bot asks for clarification when inputs are ambiguous
- Output quality matches or exceeds day-2-today-plan-test.md

---

## Summary

Day 7 was about **validating the Austria itinerary dataset** against diverse question patterns. All 7 patterns passed testing, confirming the dataset is ready for multi-intent bot development.

Key takeaways:
- ✅ The dataset is well-structured for bot retrieval
- ✅ Day-specific questions work excellently
- ✅ Cross-day searches are feasible with consistent keywords
- ✅ The bot's main challenge is distinguishing dataset facts from live information
- ✅ We're ready to move to Task 11: multi-intent prompt design

The bot is **ready for production use** for the specific 7 question patterns tested. Future enhancements (RAG, live data integration, user preferences) can build on this foundation.
