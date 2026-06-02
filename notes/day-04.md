# Day 4 Notes: Holiday Planner Project Setup

## What I built today

Today I created the Holiday Planner project folder.

The project includes:

- README.md
- PRD.md
- TASKS.md
- DATASET_GUIDE.md
- sample-data/sample-itinerary.md
- prompts/itinerary-planner.md

## What I learned

Before building an AI app, I should first create the project context.

The important context files are:

- README.md for the project overview
- PRD.md for product requirements
- TASKS.md for controlled task execution
- DATASET_GUIDE.md for data cleaning rules
- Prompt files for reusable AI instructions

## Why this matters

This structure helps AI tools understand the project without needing me to repeat everything in chat.

It also helps reduce token waste because I can tell AI tools exactly which files to read.

## My current understanding

Holiday Planner can start as a simple prompt-based system.

Later, it can become:

- Dataset-powered
- RAG-powered
- A Vercel app
- API-powered
- An agent workflow

## Reflection

### 1. What type of itinerary data do I already have?

My answer: Full 14 Days itenerary data 

### 2. What private information should I remove before uploading itinerary data?

My answer:
- Passport details
- Booking reference numbers
- Flight booking codes
- Hotel confirmation numbers
- Full traveler names
- Phone numbers
- Emails
- Payment details
- Private personal notes

### 3. What would make a generated itinerary useful to me?

My answer: Retrieving these info with a simple command 

### 4. What should the first version avoid building?

My answer:A full workable app 

### 5. What is one destination I want to test first?

My answer: Vienna
