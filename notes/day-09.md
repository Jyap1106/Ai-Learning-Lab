# Day 9 Notes: AI Tool Backbone and Skill Map

## What I worked on today

Today I shifted from testing into understanding the backbone of an AI product.

The focus was to understand how prompts, skills, tools, workflows, state, and `.md` files work together to create a real AI product.

## Files Created

Today I created:

- projects/holiday-planner/AI_TOOL_BACKBONE.md
- projects/holiday-planner/SKILL_TOOL_MAP.md

## Core Concept

A useful AI product is not just a chatbot.

A useful AI product needs:

- Product goal
- User flow
- Prompt layer
- Intent classification
- Skills
- Tools
- State
- Backend storage
- Safety rules
- UI behavior
- Evaluation

## Prompt vs Skill vs Tool

## Prompt

A prompt tells the AI how to behave.

Example:

```text
You are the Holiday Companion Bot. Use only the itinerary state as the source of truth.
```

## Skill

A skill is a reusable ability the AI system can perform.

Example:

```text
Summarize today's plan.
```

## Tool

A tool is a callable action or function the system can use.

Example:

```text
get_day_plan(day_number)
```

## State

State is the saved information the product uses.

Example:

```text
The current saved version of the itinerary.
```

## Workflow

A workflow is the step-by-step process.

Example:

```text
User requests edit → bot proposes change → user confirms → backend saves update
```

## Why This Matters

This helps me understand how to build AI tools in the future.

Instead of only asking AI to answer questions, I can design systems where AI can:

- Read context
- Use skills
- Call tools
- Update state
- Ask for confirmation
- Save changes
- Create a useful product experience

## Holiday Companion Bot Backbone

The Holiday Companion Bot should eventually have:

- A chat interface
- A saved itinerary state
- A today's plan skill
- A food question skill
- A transport question skill
- An itinerary edit skill
- A confirmation workflow
- A backend save workflow
- A sharing workflow later

## Testing Direction

Testing is still important, but I do not need to test every day.

Testing will be grouped into checkpoint days.

For now, the focus is to build the product structure and understand the backbone.

## How This Helps the Final Product

The final product should not just answer:

```text
What is today's plan?
```

It should eventually support:

```text
Remove this activity.
Replace it with something lighter.
Save the updated itinerary.
Show me tomorrow based on the updated itinerary.
Share the final itinerary.
```

To do that, the product needs state, skills, tools, workflows, and backend logic.

## Next Step

The next step is to design how confirmed itinerary changes should be saved.

Next file:

```text
projects/holiday-planner/BACKEND_SAVE_BEHAVIOR.md
```
