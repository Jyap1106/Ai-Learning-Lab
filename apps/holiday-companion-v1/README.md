# Holiday Companion Bot V1

A frontend-only, local Minimum Viable Product (MVP) dashboard for the **Holiday Companion Bot**, built to display and manage a 13-day travel itinerary to Austria.

The main goal of V1 is to establish the core visual layout, component architecture, and responsive styling before integrating interactive chat services, state persistence, or real AI backends.

---

## 🚀 Current Build Status

* **Status**: ✅ Complete (Static Dashboard Slice V1)
* **Status Details**: The application compiles cleanly with TypeScript, starts immediately via Vite, and has all analytics placeholders removed. 

---

## 🛠️ Getting Started

### Prerequisites
* **Node.js**: Version 22+ recommended.
* **pnpm**: Version 10+ recommended.

### Installation

1. Navigate to the app directory:
   ```bash
   cd apps/holiday-companion-v1
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the App Locally

Start the Vite development server:
```bash
pnpm dev
```
The application will be available at `http://localhost:3000/`.

---

## ✨ Features

### Features Built
* **Header Component**: Displays trip metadata (e.g., "Austria Trip", "Day 2"), save status ("Saved locally"), and disabled buttons for new trip creation and sharing.
* **Today's Plan Card**: Focuses on Day 2 in Vienna, dividing activities into Morning, Afternoon, and Evening, showing food badges and transport details, plus mock buttons to edit or ask about the day.
* **Tomorrow's Plan Card**: Summarizes Day 3 in Vienna, including main highlights, food spots, and transport details.
* **Trip Dashboard (Sidebar)**: Displays version history, upcoming days list, and share preview placeholder instructions.
* **Full Itinerary List**: A scrollable vertical feed listing all 13 days of the Austria itinerary in a compact form.
* **TypeScript & Path Aliases**: Setup with `@/` resolving to `./client/src/` for clean absolute imports.

### Features NOT Built Yet (Scope for V2/Next Runs)
* **Chat Assistant**: No interactive chat console yet.
* **Prompt Chips**: Interactive query suggestions are placeholders.
* **Proposed Change Card**: Confirmation UI for accepting/rejecting itinerary edits is not active.
* **localStorage Support**: Itinerary state resets on refresh; persistence is not yet wired.
* **Backend, Database, and Real AI**: Fully frontend-driven with static local data.

---

## 📁 Repository Structure

### App Code Location
All V1 source code lives inside: **`apps/holiday-companion-v1/client/src/`**
* **`components/holiday/`**: Contains domain-specific UI components (`Header.tsx`, `TodayPlanCard.tsx`, `TomorrowPlanCard.tsx`, `TripDashboard.tsx`, `FullItineraryList.tsx`).
* **`components/ui/`**: Base design system/shadcn components (`card.tsx`, `button.tsx`, `badge.tsx`, `tooltip.tsx`, `sonner.tsx`).
* **`data/`**: Local sample trip data (`austriaItineraryState.json`).
* **`pages/`**: Main page templates (`Home.tsx`, `NotFound.tsx`).
* **`lib/`**: General helper files (`utils.ts`).

### Product Documentation Location
Original specification plans and sample itineraries are located in:
* **`projects/holiday-planner/`**:
  * `MANUS_V1_BUILD_BRIEF.md` - Overall product objectives.
  * `UI_SPEC.md` & `V1_BUILD_SPEC.md` - Design requirements and scope limits.
  * `DATA_LOADING_PLAN.md` & `FRONTEND_COMPONENT_PLAN.md` - Technical outlines.
  * `sample-data/` - Static Markdown and JSON source data.

---

## ➡️ Next Recommended Build Step

**Task 1: Add Chat Assistant and Prompt Chips**
* Create `ChatAssistant.tsx` and `PromptChips.tsx` in `client/src/components/holiday/`.
* Set up a list of interactive quick-actions to let users mock-query the itinerary details.
* Render mock answers and trigger change requests inside the React state.
