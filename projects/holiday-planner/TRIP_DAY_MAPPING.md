# Trip Day Mapping

## Purpose

This document defines how the Austria Trip Companion Bot should identify which itinerary day is "today."

## Problem

When a user asks "What's today's plan?", the bot needs to know which day in the Austria itinerary to retrieve. Without this mapping, the bot cannot provide the correct daily briefing.

## Solution: Two Approaches

### Option 1: Manual Day Number (Recommended for MVP)

**How it works:**
The user explicitly tells the bot which day of the trip they are on.

**User interaction:**
```
User: "What's today's plan? I'm on Day 2."
Bot: Retrieves Day 2 from the Austria dataset and responds.
```

**Advantages:**
- Simple to implement
- No date calculation required
- Reliable in any timezone
- User is always in control
- Good for MVP testing

**Disadvantages:**
- User must remember their day number
- Requires manual input each time

**Implementation notes:**
- Bot asks: "Which day of the trip are you on?" if not provided
- Bot retrieves the corresponding day from the dataset
- Bot confirms: "You're on Day 2 in Vienna"

---

### Option 2: Date-Based Calculation (Future Enhancement)

**How it works:**
The user provides trip start date and current date. The bot calculates which day they are on.

**User interaction:**
```
User: "I started my trip on June 10. What's today's plan?"
Bot: "Today is June 12. You're on Day 3. Here's your plan..."
```

**Advantages:**
- More natural user experience
- No need to manually count days
- Could be stored in a profile or trip context
- Easier for multi-day conversations

**Disadvantages:**
- Requires date parsing and math
- Timezone handling complexity
- Assumes continuous travel (no rest days)
- Requires trip context to be remembered

**Implementation notes:**
- User provides trip start date once (stored in session or profile)
- Bot reads system date or user provides current date
- Bot calculates: `current_day = (current_date - trip_start_date).days + 1`
- Bot retrieves the corresponding day from the dataset

---

## Decision Matrix

| Feature | Option 1 (Manual) | Option 2 (Date-based) |
|---------|-------------------|----------------------|
| MVP Complexity | Low | Medium |
| User Friction | Medium | Low |
| Error Handling | Simple | Complex |
| Test Difficulty | Easy | Moderate |
| Reliability | High | Moderate |
| Recommended For | Testing, Day 6 | Future versions |

---

## For Day 6 Testing

**Use Option 1 (Manual Day Number)**

The test output will use Day 2 with explicit day reference:

```
User Question: "What's today's plan? I'm on Day 2 of my Austria trip."
Bot Context: Current day = Day 2, City = Vienna
Dataset Retrieval: Fetch "## Day 2" from austria-13-day-sanitized.md
```

---

## Error Handling

### If day number is not provided:

```
User: "What's today's plan?"
Bot: "I need to know which day of your trip you're on.
     Are you on Day 1, Day 2, Day 3... up to Day 13?"
```

### If day number is out of range:

```
User: "What's today's plan? I'm on Day 15."
Bot: "The Austria itinerary has 13 days total.
     Could you confirm your day number (1-13)?"
```

### If day number is ambiguous:

```
User: "What's today's plan?"
Bot: "Please specify which day you're on.
     Example: 'What's Day 2's plan?' or 'I'm on Day 5, what should I do?'"
```

---

## Future Enhancements

1. **Session Memory**: Store the user's trip start date in the conversation session
2. **Multi-day Queries**: Support "What about tomorrow?" or "What was yesterday?"
3. **Lightweight Profile**: Save trip metadata (start date, destination, day) between sessions
4. **Smart Defaults**: If the bot detects a previous day reference, reuse it
5. **Time-aware Responses**: Adjust messaging based on time of day (morning, afternoon, evening)

---

## Testing Checklist

When testing the bot with Day 2:

- [ ] User specifies "Day 2" in the question
- [ ] Bot correctly retrieves Day 2 from the dataset
- [ ] Bot includes Vienna location confirmation
- [ ] Bot extracts Schönbrunn, Belvedere, Wien Museum, Karlskirche
- [ ] Bot includes all food, transport, and preparation sections
- [ ] Bot includes "Verify Live" section
- [ ] Output follows BOT_SPEC.md format

---

## Related Files

- `BOT_SPEC.md` - Bot specification and output format
- `prompts/today-plan-bot.md` - Bot prompt template
- `sample-data/austria-13-day-sanitized.md` - Austria itinerary dataset
- `test-output/day-2-today-plan-test.md` - Day 2 test output
