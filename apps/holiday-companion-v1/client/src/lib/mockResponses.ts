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

export interface ProposedChangeOption {
  id: string;
  label: string;
  description: string;
}

export interface ProposedChange {
  id: string;
  type: "make_lighter" | "add_cafe_break" | "replace_activity";
  title: string;
  affectedDay: number;
  affectedCity: string;
  currentItem: string;
  requestedChange: string;
  impact: string;
  options: ProposedChangeOption[];
  selectedOptionId: string;
  status: "awaiting_confirmation";
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

export function isEditPrompt(prompt: string) {
  const normalizedPrompt = prompt.toLowerCase();

  return (
    normalizedPrompt.includes("make today lighter") ||
    normalizedPrompt.includes("add a cafe") ||
    normalizedPrompt.includes("replace an activity")
  );
}

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
        `Day ${currentDay.dayNumber} theme: ${currentDay.theme}`,
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

  return {
    title: "Mock assistant response",
    content:
      "I can currently answer basic itinerary questions using local sample data. Try one of the prompt chips below.",
  };
}

export function createMockProposedChange(
  prompt: string,
  currentDay: Day
): ProposedChange {
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("add a cafe")) {
    return {
      id: `change-${Date.now()}`,
      type: "add_cafe_break",
      title: "Add a cafe break",
      affectedDay: currentDay.dayNumber,
      affectedCity: currentDay.city,
      currentItem: "Current afternoon plan",
      requestedChange: "Add one cafe break to today's itinerary.",
      impact:
        "This adds a recovery point without changing the whole day. The day becomes more comfortable and less rushed.",
      selectedOptionId: "cafe-break",
      status: "awaiting_confirmation",
      options: [
        {
          id: "cafe-break",
          label: "Add a relaxed cafe break",
          description:
            "Add one cafe stop using the food ideas already listed for today.",
        },
        {
          id: "dessert-break",
          label: "Add a dessert or bakery stop",
          description:
            "Use this as a lighter pause between culture or walking activities.",
        },
        {
          id: "relax-time",
          label: "Leave this time as relax/free time",
          description:
            "Keep the schedule open instead of adding a specific activity.",
        },
      ],
    };
  }

  if (normalizedPrompt.includes("replace")) {
    return {
      id: `change-${Date.now()}`,
      type: "replace_activity",
      title: "Replace an activity",
      affectedDay: currentDay.dayNumber,
      affectedCity: currentDay.city,
      currentItem: "Upper Belvedere",
      requestedChange:
        "Replace one planned activity with something lighter or more flexible.",
      impact:
        "This makes the day less museum-heavy and gives more flexibility for food, rest, or slower movement.",
      selectedOptionId: "relaxed-cafe",
      status: "awaiting_confirmation",
      options: [
        {
          id: "relaxed-cafe",
          label: "Relaxed cafe break",
          description:
            "Replace the activity with a cafe or tea-time stop from today's food ideas.",
        },
        {
          id: "short-walk",
          label: "Short scenic walk",
          description:
            "Replace the activity with a lighter walk or casual exploration block.",
        },
        {
          id: "relax-time",
          label: "Leave this time as relax/free time",
          description:
            "Do not add anything new. Keep this block open for rest or spontaneous plans.",
        },
      ],
    };
  }

  return {
    id: `change-${Date.now()}`,
    type: "make_lighter",
    title: "Make today lighter",
    affectedDay: currentDay.dayNumber,
    affectedCity: currentDay.city,
    currentItem: `Day ${currentDay.dayNumber} full plan`,
    requestedChange: "Reduce today's schedule and make it easier to follow.",
    impact:
      "This keeps the core experience but reduces pressure by making some stops optional.",
    selectedOptionId: "keep-main-plus-cafe",
    status: "awaiting_confirmation",
    options: [
      {
        id: "keep-main-plus-cafe",
        label: "Keep one main activity + one cafe break",
        description:
          "Prioritize one key experience and add a flexible food or rest stop.",
      },
      {
        id: "make-evening-optional",
        label: "Make the evening activity optional",
        description:
          "Keep the day plan but treat the evening item as optional depending on energy.",
      },
      {
        id: "relax-time",
        label: "Leave one block as relax/free time",
        description:
          "Remove pressure by leaving a time block open instead of filling it.",
      },
    ],
  };
}
