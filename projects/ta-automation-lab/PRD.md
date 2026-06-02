# PRD: TA Automation Lab

## Product Summary

TA Automation Lab is a collection of AI-assisted workflows that help Talent Acquisition professionals reduce repetitive work and improve hiring communication.

## Target User

Talent Acquisition partners, recruiters, recruitment coordinators, and hiring teams.

## Main Problem

Recruiters often spend too much time preparing candidate summaries, rewriting job descriptions, drafting outreach messages, creating interview questions, and preparing hiring manager updates.

## First Use Case

The first workflow will be a candidate summary generator using fake candidate data.

## User Story

As a Talent Acquisition partner, I want to paste a candidate profile and job description so that I can quickly generate a structured candidate summary for hiring manager review.

## Inputs

The workflow may use:

- Candidate profile
- Job description
- Recruiter notes
- Interview notes
- Role requirements

## Outputs

The workflow should produce:

- Candidate summary
- Skills match
- Relevant experience
- Potential concerns
- Suggested interview questions
- Hiring manager briefing paragraph

## Constraints

- Use fake or anonymized data only
- Do not send messages automatically
- Do not connect to real ATS systems yet
- Do not use paid APIs until cost controls are understood
- Start with manual prompts before automation
- The AI should not invent missing candidate information

## Success Criteria

This project is successful if it can turn a messy candidate profile into a clear, structured summary that a recruiter can review quickly.

## Future Possibilities

Later, this project could expand into:

- A spreadsheet-based workflow
- A Google Docs workflow
- A no-code automation using n8n
- A simple web app
- A private internal recruiter copilot
