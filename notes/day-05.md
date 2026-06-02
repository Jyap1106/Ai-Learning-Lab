# Day 5 Notes: Cleaning Itinerary Data

## What I worked on today

Today I started cleaning and structuring my Austria 13-day itinerary dataset.

The goal is to prepare the data for future use in the Holiday Planner project.

## What I learned

A useful AI dataset should be:

- Clean
- Structured
- Free of private information
- Easy to search
- Easy for humans and AI tools to understand

## Why this matters

If my itinerary data is messy, future AI tools may retrieve the wrong information or generate confusing itineraries.

If my itinerary data is structured clearly, I can later use it for:

- Prompt testing
- RAG
- A Vercel app
- An itinerary assistant
- A trip planning agent

## Dataset Cleaning Rules

Before uploading itinerary data, I should remove:

- Passport details
- Booking reference numbers
- Flight booking codes
- Hotel confirmation numbers
- Full traveler names
- Phone numbers
- Emails
- Payment details
- Private personal notes

## My Vienna Dataset

File:

- projects/holiday-planner/sample-data/austria-13-day-sanitized.md

## Reflection

### 1. What was difficult about cleaning the itinerary?

My answer: Making it concise for a huge dataset

### 2. What information was useful to keep?

My answer: Small cleaning works for future structuredness

### 3. What information did I remove for privacy?

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

### 4. How could this dataset help a future RAG assistant?

My answer:
It can help a future RAG assistant by retrieving relevant itinerary information from the sanitized itinerary dataset, such as destination-specific activities, food ideas, transport notes, day themes, and general travel tips.

### 5. What type of itinerary should I test next?

My answer:Not for now, I shall build on this trip first 
