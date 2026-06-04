# Itinerary Edit Command Tests

## Test Purpose

This test checks whether the Holiday Companion Bot can safely handle itinerary edit commands.

The bot should be able to:

- Detect the edit type
- Identify the affected day
- Identify the affected activity
- Propose a change
- Ask for confirmation
- Avoid claiming that the itinerary was saved before user confirmation

## Source File

- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

## Protected Source of Truth

The Austria dataset should not be modified during this test.

The bot should treat it as the current itinerary source of truth for manual testing.

## Bot Rules

The bot must follow these rules:

- Use only the Austria itinerary dataset or provided itinerary excerpt as the source of truth.
- Do not use outside knowledge.
- Do not invent opening hours, prices, exact travel times, exact transport routes, rankings, weather, or live transport details.
- If information is missing from the dataset, say so.
- If live accuracy matters, place it under "Verify Live".
- For edit requests, propose the change first.
- Ask for confirmation before saving.
- Do not say the itinerary has been updated unless the user confirms.
- Keep the change focused on the affected day or activity.

---

# Test 1: Remove Schönbrunn from Day 2 and suggest a lighter replacement

## User Request

```text
Remove Schönbrunn from Day 2 and suggest a lighter replacement.
```

## Expected Retrieval

The bot should retrieve Day 2 from the Austria itinerary dataset.

The affected activity is:

```text
Schönbrunn Palace and gardens
```

## Expected Detected Edit Type

```text
Replace activity
```

## Expected Bot Output

# Proposed Itinerary Change

## Detected Edit Type

Replace activity

## Affected Day

Day 2, Vienna

## Current Itinerary Item

Schönbrunn Palace and gardens

## User Request

The user wants to remove Schönbrunn from Day 2 and replace it with something lighter.

## Proposed Change

Remove:

- Schönbrunn Palace and gardens

Add or Replace With:

- A lighter Vienna culture and cafe-focused morning
- Keep the day slower before continuing to Belvedere, Wien Museum, or Karlskirche

Keep unchanged:

- Upper Belvedere, if the user still wants a culture stop
- Wien Museum, if time and energy allow
- Karlskirche as an evening or shorter stop
- Food and cafe options already listed in the itinerary

## Updated Day Preview

Morning:

- Start with a slower breakfast or cafe stop
- Keep the morning flexible instead of visiting Schönbrunn

Afternoon:

- Continue with Upper Belvedere or Wien Museum depending on energy level
- Add tea time near Belvedere or Karlsplatz if useful

Evening:

- Visit Karlskirche if energy allows
- Dinner around Wieden or Karlsplatz

Food:

- Bakery near accommodation
- Cafe near the activity area
- Cafe Goldegg
- Ahrnst Bakery
- Cafe Museum
- Wiener Melange
- Gugelhupf
- Apfelstrudel

Transport:

- Use local Vienna transport
- Keep the route simple and avoid unnecessary backtracking

Notes:

- This makes Day 2 less palace-heavy and more relaxed
- Check live opening hours, ticket availability, weather, and transport before travelling

## Confirmation Question

Do you want me to apply this change to the saved itinerary?

## Test Result

Status: Passed

## Notes

The bot proposed a change and asked for confirmation. It did not claim the itinerary was already saved.

---

# Test 2: Move Karlskirche to tomorrow

## User Request

```text
Move Karlskirche to tomorrow. I am currently on Day 2.
```

## Expected Retrieval

The bot should retrieve:

- Day 2 because Karlskirche appears in the Day 2 plan
- Day 3 because the user asks to move the activity to tomorrow

## Expected Detected Edit Type

```text
Reschedule activity
```

## Expected Bot Output

# Proposed Itinerary Change

## Detected Edit Type

Reschedule activity

## Affected Day

Original day: Day 2, Vienna  
Target day: Day 3

## Current Itinerary Item

Karlskirche

## User Request

The user wants to move Karlskirche from Day 2 to tomorrow.

## Proposed Change

Move:

- Karlskirche from Day 2 evening
- Proposed target: Day 3, if Day 3 has enough space

Keep unchanged:

- Day 2 can focus more on Schönbrunn, Belvedere, Wien Museum, food, and cafe stops
- Other Day 2 activities stay unchanged unless the user requests more changes

## Updated Day Preview

Day 2:

Morning:

- Continue with the main Day 2 culture or palace plan

Afternoon:

- Continue with Belvedere, Wien Museum, or cafe time depending on energy

Evening:

- Remove or skip Karlskirche from the evening plan
- Keep dinner simple

Day 3:

- Add Karlskirche only if it does not overload Day 3
- Check whether Day 3 already has a full schedule before applying the move

## Things to Consider

- The bot needs to check Day 3 before confirming the final placement
- If Day 3 is already full, the bot should ask whether the user wants to move it to another day instead

## Verify Live

- Karlskirche opening or service timing
- Day 3 schedule availability
- Weather
- Public transport disruptions

## Confirmation Question

Do you want me to apply this change to the saved itinerary?

## Test Result

Status: Passed

## Notes

The bot identified that this is a rescheduling request. It did not claim that Karlskirche was already moved.

---

# Test 3: Make Day 2 less packed

## User Request

```text
Make Day 2 less packed.
```

## Expected Retrieval

The bot should retrieve Day 2 from the Austria itinerary dataset.

## Expected Detected Edit Type

```text
Make day lighter
```

## Expected Bot Output

# Proposed Itinerary Change

## Detected Edit Type

Make day lighter

## Affected Day

Day 2, Vienna

## Current Itinerary Item

The full Day 2 plan, including Schönbrunn, Upper Belvedere, Wien Museum, Karlskirche, food options, transport notes, and cafe or tea-time options.

## User Request

The user wants Day 2 to become less packed.

## Proposed Change

Keep:

- One main culture or palace focus
- One food or cafe break
- One optional evening stop if energy allows

Make optional:

- Either Upper Belvedere or Wien Museum
- Karlskirche evening visit
- Tea time if the day becomes too full

Suggested lighter version:

Morning:

- Keep Schönbrunn Palace and gardens as the main focus

Afternoon:

- Choose either Upper Belvedere or Wien Museum
- Add a cafe or tea-time break if useful

Evening:

- Keep Karlskirche optional
- Have a simple dinner around Wieden or Karlsplatz

## Impact on the Day

This makes Day 2 easier to manage by reducing the number of major culture stops.

It keeps the core Vienna experience but gives the user more flexibility.

## Verify Live

- Opening hours
- Ticket availability
- Weather
- Public transport disruptions
- Restaurant or cafe availability

## Confirmation Question

Do you want me to apply this lighter version to the saved itinerary?

## Test Result

Status: Passed

## Notes

The bot proposed a lighter version without deleting the whole day or claiming the itinerary was saved.

---

# Test 4: Add one cafe break to Day 2

## User Request

```text
Add one cafe break to Day 2.
```

## Expected Retrieval

The bot should retrieve Day 2 from the Austria itinerary dataset and look for the Food section or cafe-related notes.

## Expected Detected Edit Type

```text
Add activity
```

## Expected Bot Output

# Proposed Itinerary Change

## Detected Edit Type

Add activity

## Affected Day

Day 2, Vienna

## Current Itinerary Item

Day 2 food and cafe options

## User Request

The user wants to add one cafe break to Day 2.

## Proposed Change

Add:

- A cafe or tea-time break near Belvedere or Karlsplatz

Possible cafe ideas from the dataset:

- Cafe Goldegg
- Ahrnst Bakery
- Cafe Museum

Keep unchanged:

- Main Day 2 activities
- Transport notes
- Dinner plan
- Verify-live reminders

## Updated Day Preview

Morning:

- Continue with the existing morning plan

Afternoon:

- Add one cafe or tea-time break after a museum or culture stop
- Keep the timing flexible to avoid making the day too packed

Evening:

- Continue with Karlskirche or dinner depending on energy

Food:

- Add one cafe break using an option already listed in the dataset
- Keep other food ideas as optional

Transport:

- Keep local Vienna transport notes
- Check live routing before travelling

## Impact on the Day

This adds a rest point and makes the day more comfortable.

The day may become too packed if all activities remain, so the cafe break should be treated as a flexible rest stop.

## Verify Live

- Cafe opening hours
- Table availability
- Current location
- Weather
- Public transport disruptions

## Confirmation Question

Do you want me to apply this cafe break to the saved itinerary?

## Test Result

Status: Passed

## Notes

The bot used cafe ideas from the dataset and asked for confirmation before applying the change.

---

# Test 5: Replace Upper Belvedere with a relaxed food-focused activity

## User Request

```text
Replace Upper Belvedere with a relaxed food-focused activity.
```

## Expected Retrieval

The bot should retrieve Day 2 from the Austria itinerary dataset.

The affected activity is:

```text
Upper Belvedere
```

The relevant food-related options include the Day 2 food and cafe notes.

## Expected Detected Edit Type

```text
Replace activity
```

## Expected Bot Output

# Proposed Itinerary Change

## Detected Edit Type

Replace activity

## Affected Day

Day 2, Vienna

## Current Itinerary Item

Upper Belvedere

## User Request

The user wants to replace Upper Belvedere with a relaxed food-focused activity.

## Proposed Change

Remove:

- Upper Belvedere

Add or Replace With:

- A relaxed cafe or tea-time stop near Belvedere or Karlsplatz
- Food and drink ideas already listed in the dataset, such as Wiener Melange, Gugelhupf, Apfelstrudel, soup, schnitzel, or goulash

Possible places from the dataset:

- Cafe Goldegg
- Ahrnst Bakery
- Cafe Museum

Keep unchanged:

- Morning plan, unless the user wants to change it
- Wien Museum, if time and energy allow
- Karlskirche as optional evening stop
- Dinner around Wieden or Karlsplatz

## Updated Day Preview

Morning:

- Continue with the existing morning plan

Afternoon:

- Replace Upper Belvedere with a relaxed food-focused stop
- Keep Wien Museum optional if the user still wants a lighter culture stop

Evening:

- Keep Karlskirche optional
- Dinner around Wieden or Karlsplatz

Food:

- Add a stronger focus on cafe, dessert, or Austrian food options

Transport:

- Use local Vienna transport
- Check live route and opening details before leaving

## Impact on the Day

This changes Day 2 from a museum-heavy day into a more relaxed culture and food day.

It may reduce the number of major attractions and make the day easier to enjoy.

## Verify Live

- Cafe opening hours
- Restaurant availability
- Museum opening hours if still visiting Wien Museum
- Weather
- Public transport disruptions

## Confirmation Question

Do you want me to apply this replacement to the saved itinerary?

## Test Result

Status: Passed

## Notes

The bot proposed a replacement using existing food and cafe options from the dataset. It did not claim the itinerary was already updated.

---

# Overall Test Summary

## What Worked

- The bot can identify edit intent.
- The bot can identify the affected day.
- The bot can identify the affected activity.
- The bot can propose an itinerary change.
- The bot can ask for confirmation.
- The bot avoids saying the itinerary was already saved.
- The bot keeps live details under "Verify Live".

## What Needs Improvement

- The bot will eventually need real itinerary state instead of Markdown.
- The bot needs backend logic to save confirmed changes.
- The bot needs version history to track previous itinerary versions.
- The bot needs stronger handling when the user does not provide a day number.
- The bot needs UI behavior for proposed changes and confirmation.

## Important Lesson

The bot should not behave like this:

```text
Done, I updated your itinerary.
```

The bot should behave like this:

```text
Here is the proposed change.
Do you want me to apply it?
```

## Next Step

The next step is to design how confirmed itinerary changes should be saved in a future app.

Suggested next file:

- projects/holiday-planner/BACKEND_SAVE_BEHAVIOR.md
