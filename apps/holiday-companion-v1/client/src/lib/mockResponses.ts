export interface Day {
  dayNumber: number;
  city: string;
  theme: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  food: string[];
  transport: string[];
  notes: string[];
  edited: boolean;
}

export interface MockResponse {
  title: string;
  content: string;
}

export const DEFAULT_PROMPT_CHIPS = [
  "What's today's plan?",
  "What is tomorrow's plan?",
  "What food is planned today?",
  "What transport notes should I know?",
  "What can I skip if I am tired?",
  "Make today lighter",
  "Add a cafe break",
  "Replace an activity",
];

function formatList(items: string[], fallback: string) {
  if (!items || items.length === 0) {
    return fallback;
  }

  return items.map((item) => `- ${item}`).join("\n");
}

function summarizeDay(day: Day) {
  return [
    `Day ${day.dayNumber} — ${day.city}`,
    "",
    `Theme: ${day.theme}`,
    "",
    "Morning:",
    formatList(day.morning, "- No morning activities found."),
    "",
    "Afternoon:",
    formatList(day.afternoon, "- No afternoon activities found."),
    "",
    "Evening:",
    formatList(day.evening, "- No evening activities found."),
    "",
    "Food ideas:",
    formatList(day.food.slice(0, 6), "- No food ideas found."),
    "",
    "Transport notes:",
    formatList(day.transport, "- No transport notes found."),
    "",
    "Verify live:",
    "- Opening hours",
    "- Ticket availability",
    "- Weather",
    "- Public transport disruptions",
  ].join("\n");
}

export function createMockAssistantResponse(
  prompt: string,
  currentDay?: Day,
  tomorrowDay?: Day
): MockResponse {
  const normalizedPrompt = prompt.toLowerCase();

  if (!currentDay) {
    return {
      title: "I need trip data first",
      content:
        "I could not find the current day in the itinerary state. Please check that the Austria sample itinerary is loaded.",
    };
  }

  if (
    normalizedPrompt.includes("today") &&
    normalizedPrompt.includes("plan")
  ) {
    return {
      title: "Today's plan",
      content: summarizeDay(currentDay),
    };
  }

  if (normalizedPrompt.includes("tomorrow")) {
    if (!tomorrowDay) {
      return {
        title: "Tomorrow's plan",
        content:
          "This appears to be the final day or tomorrow is not available in the itinerary data.",
      };
    }

    return {
      title: "Tomorrow's plan",
      content: summarizeDay(tomorrowDay),
    };
  }

  if (
    normalizedPrompt.includes("food") ||
    normalizedPrompt.includes("eat") ||
    normalizedPrompt.includes("cafe")
  ) {
    return {
      title: "Food ideas for today",
      content: [
        `Here are the food and cafe ideas listed for Day ${currentDay.dayNumber}:`,
        "",
        formatList(currentDay.food, "- No food ideas found for today."),
        "",
        "Verify live:",
        "- Opening hours",
        "- Restaurant or cafe availability",
        "- Current location and route",
      ].join("\n"),
    };
  }

  if (
    normalizedPrompt.includes("transport") ||
    normalizedPrompt.includes("route") ||
    normalizedPrompt.includes("get around")
  ) {
    return {
      title: "Transport notes for today",
      content: [
        `Here are the transport notes listed for Day ${currentDay.dayNumber}:`,
        "",
        formatList(
          currentDay.transport,
          "- No transport notes found for today."
        ),
        "",
        "Verify live:",
        "- Public transport disruptions",
        "- Route changes",
        "- Weather impact",
      ].join("\n"),
    };
  }

  if (
    normalizedPrompt.includes("skip") ||
    normalizedPrompt.includes("tired") ||
    normalizedPrompt.includes("less packed")
  ) {
    return {
      title: "Lighter-day suggestion",
      content: [
        `Day ${currentDay.dayNumber} looks like this theme: ${currentDay.theme}`,
        "",
        "A lighter approach could be:",
        "- Keep one main activity as the priority.",
        "- Turn one museum or attraction into an optional stop.",
        "- Keep a cafe or food break as recovery time.",
        "- Leave one block as relax/free time.",
        "",
        "This is only a suggestion. No itinerary changes have been saved.",
      ].join("\n"),
    };
  }

  if (
    normalizedPrompt.includes("make today lighter") ||
    normalizedPrompt.includes("add a cafe") ||
    normalizedPrompt.includes("replace")
  ) {
    return {
      title: "Proposed change placeholder",
      content: [
        "This will create a proposed itinerary change in the next build step.",
        "",
        "For now, this mock chat layer only explains what would happen.",
        "",
        "Next build step:",
        "- Add ProposedChangeCard",
        "- Show 2–3 alternatives",
        "- Include relax/free-time option",
        "- Add Confirm / Reject buttons",
      ].join("\n"),
    };
  }

  return {
    title: "Mock assistant response",
    content:
      "I can currently answer basic itinerary questions using local sample data. Try one of the prompt chips below.",
  };
}
