# Day 3 Notes: Tokens, Context Windows, and Cost Control

## What I learned today

Tokens are the pieces of text that AI models read and generate.

Input tokens are what I send to the AI.
Output tokens are what the AI sends back.
Tool usage and long conversations can also increase token usage.

## Context Window

The context window is the AI's working memory for a conversation or task.

A bigger context window helps, but it does not mean I should paste everything. Too much irrelevant context can make the AI less accurate and more expensive to use.

## Why My AI Builds Can Break After Multiple Edits

My first AI build can work well because the initial prompt is clear.

Later edits can become messy because:

- The chat becomes too long
- The AI has too much old context
- I ask for too many changes at once
- The project goal is not stored clearly in files
- The AI does not know which files to focus on

## My Token-Saving Rules

1. Store project context in repo files, not only in chat.
2. Ask AI to read only the relevant files.
3. Work on one task at a time.
4. Avoid broad prompts like "make it better."
5. Start a fresh chat when the conversation becomes too long.
6. Use manual prompts before APIs or agents.
7. Do not connect APIs to loops until I understand cost controls.
8. Use fake or anonymized data for Talent Acquisition experiments.

## Good AI Instruction Example

Read AGENTS.md first.

Then read only:

- projects/ta-automation-lab/README.md
- projects/ta-automation-lab/PRD.md
- projects/ta-automation-lab/TASKS.md

Do not edit anything yet.

Summarize:

1. What this project is
2. What the current task is
3. Which file should be edited next
4. Which files should not be touched

## Bad Prompt Example

Make this project better and add more automation features.

## Better Prompt Example

Complete Task 1 only.

Create:

- projects/ta-automation-lab/sample-data/fake-candidates.md

Acceptance criteria:

- 5 fake candidate profiles
- No real personal data
- Include current role, years of experience, skills, location, and notes
- Do not edit README.md or PRD.md

## Reflection

### 1. What usually causes me to waste tokens?

My answer:
Pasting a long PRD.
You paste code.
You paste your previous chat.
You ask for a detailed answer.
The AI reads everything and writes a long response.
That consumes many tokens.

### 2. When should I start a fresh chat?

My answer:Start a fresh chat when the conversation becomes too long.


### 3. What should go into repo files instead of staying in chat?

My answer:README.md, PRD.md, TASKS.md, AGENT.md
This would help to define the task and get to direct the AI to read from the right repo files to execute task

### 4. What should I avoid automating for now?

My answer:Not sure what can I even automate for now 

### 5. What is one workflow I can test manually before using APIs?

My answer:At the moment don't have much ideas yet 
