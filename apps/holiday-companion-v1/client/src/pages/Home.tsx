import { useEffect, useMemo, useState } from "react";

import ActivityDetailDrawer from "@/components/holiday/ActivityDetailDrawer";
import AddActivityPanel, {
  type NewActivityDraft,
} from "@/components/holiday/AddActivityPanel";
import type { ChatMessage } from "@/components/holiday/ChatAssistant";
import FloatingChatPanel from "@/components/holiday/FloatingChatPanel";
import GuidedActivityChangePanel, {
  type GuidedReplacementOption,
} from "@/components/holiday/GuidedActivityChangePanel";
import ManualActivityEditor, {
  type ManualActivityDraft,
} from "@/components/holiday/ManualActivityEditor";
import MoveActivityPanel, {
  type MoveActivityDraft,
} from "@/components/holiday/MoveActivityPanel";
import ProposedChangeCard from "@/components/holiday/ProposedChangeCard";
import VersionComparePanel from "@/components/holiday/VersionComparePanel";
import VamoAppShell from "@/components/vamo/VamoAppShell";
import { type VamoTab } from "@/components/vamo/VamoBottomNav";
import VamoHomeScreen from "@/components/vamo/VamoHomeScreen";
import VamoPlannerScreen from "@/components/vamo/VamoPlannerScreen";
import VamoProfileScreen from "@/components/vamo/VamoProfileScreen";
import austriaData from "@/data/austriaItineraryState.json";
import {
  createMockAssistantResponse,
  createMockProposedChange,
  isEditPrompt,
  type Day,
  type ProposedChange,
} from "@/lib/mockResponses";
import {
  clearTripStorage,
  loadTripFromStorage,
  saveTripToStorage,
} from "@/lib/storage";
import {
  buildTodayTimeline,
  getTimelineStatus,
  type TimelinePeriod,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

interface VersionHistoryEntry {
  version: number;
  summary: string;
  changeType?: string;
  affectedDay?: number | null;
  createdAt?: string;
  restoredFromVersion?: number;
  snapshot?: Day[];
}

interface ItineraryState {
  tripId: string;
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  shareStatus?: string;
  source?: string;
  tripStyle?: string[];
  days: Day[];
  versionHistory: VersionHistoryEntry[];
  proposedChange?: unknown;
  metadata?: Record<string, unknown>;
}

type PeriodField = "morning" | "afternoon" | "evening";

const TODAY_MODE_PROMPTS = [
  "What should I do now?",
  "What's today's plan?",
  "I'm running late. What should I skip or adjust?",
  "What food is planned today?",
  "What transport notes should I know?",
  "Make today lighter",
  "Add a cafe break",
  "Replace an activity",
];

function createMessage(
  role: "user" | "assistant",
  content: string,
  title?: string,
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    title,
  };
}

function cloneJson<TValue>(value: TValue): TValue {
  return JSON.parse(JSON.stringify(value)) as TValue;
}

function cloneDays(days: Day[]): Day[] {
  return days.map((day) => ({
    ...day,
    morning: [...day.morning],
    afternoon: [...day.afternoon],
    evening: [...day.evening],
    food: [...day.food],
    transport: [...day.transport],
    notes: [...day.notes],
  }));
}

function getCurrentVersionNumber(versionHistory: VersionHistoryEntry[]) {
  if (versionHistory.length === 0) {
    return 0;
  }

  return Math.max(...versionHistory.map((entry) => entry.version));
}

function getNextVersionNumber(versionHistory: VersionHistoryEntry[]) {
  return getCurrentVersionNumber(versionHistory) + 1;
}

function getPeriodField(period: TimelinePeriod): PeriodField {
  switch (period) {
    case "Morning":
      return "morning";
    case "Evening":
      return "evening";
    default:
      return "afternoon";
  }
}

function updateArrayAtIndex(items: string[], index: number, value: string) {
  const nextItems = [...items];

  while (nextItems.length <= index) {
    nextItems.push("");
  }

  nextItems[index] = value;

  return nextItems.filter((item) => item.trim().length > 0);
}

function removeArrayAtIndex(items: string[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function createInitialVersionEntry(days: Day[]): VersionHistoryEntry {
  return {
    version: 1,
    summary: "Initial Austria itinerary sample loaded",
    changeType: "initial_load",
    affectedDay: null,
    createdAt: new Date().toISOString(),
    snapshot: cloneDays(days),
  };
}

function createDirectVersionEntry(
  versionHistory: VersionHistoryEntry[],
  updatedDays: Day[],
  summary: string,
  changeType: string,
  affectedDay: number | null,
): VersionHistoryEntry {
  return {
    version: getNextVersionNumber(versionHistory),
    summary,
    changeType,
    affectedDay,
    createdAt: new Date().toISOString(),
    snapshot: cloneDays(updatedDays),
  };
}

function normalizeTripState(trip: ItineraryState): ItineraryState {
  const cleanDays = cloneDays(trip.days ?? []);

  const existingVersionHistory =
    trip.versionHistory && trip.versionHistory.length > 0
      ? trip.versionHistory
      : [createInitialVersionEntry(cleanDays)];

  const currentVersionNumber = getCurrentVersionNumber(existingVersionHistory);

  const normalizedVersionHistory = existingVersionHistory.map((entry) => ({
    ...entry,
    snapshot: entry.snapshot
      ? cloneDays(entry.snapshot)
      : entry.version === currentVersionNumber
        ? cloneDays(cleanDays)
        : undefined,
  }));

  return {
    ...trip,
    days: cleanDays,
    versionHistory: normalizedVersionHistory,
  };
}

function createInitialTripState(): ItineraryState {
  const sampleTrip = cloneJson(austriaData as ItineraryState);

  const cleanDays = cloneDays(sampleTrip.days).map((day) => ({
    ...day,
    edited: false,
  }));

  return {
    ...sampleTrip,
    tripName: sampleTrip.tripName || "Austria Trip",
    saveStatus: "using_sample_data",
    days: cleanDays,
    versionHistory: [createInitialVersionEntry(cleanDays)],
  };
}

function loadInitialTripState(): ItineraryState {
  const savedTrip = loadTripFromStorage<ItineraryState>();

  if (savedTrip) {
    return {
      ...normalizeTripState(savedTrip),
      saveStatus: "saved_locally",
    };
  }

  return createInitialTripState();
}

function createChangeVersionEntry(
  versionHistory: VersionHistoryEntry[],
  proposedChange: ProposedChange,
  updatedDays: Day[],
): VersionHistoryEntry {
  const selectedOption = proposedChange.options.find(
    (option) => option.id === proposedChange.selectedOptionId,
  );

  return {
    version: getNextVersionNumber(versionHistory),
    changeType: proposedChange.type,
    affectedDay: proposedChange.affectedDay,
    createdAt: new Date().toISOString(),
    snapshot: cloneDays(updatedDays),
    summary: `Day ${proposedChange.affectedDay}: ${proposedChange.title} -> ${
      selectedOption?.label ?? "selected option"
    }`,
  };
}

function createRestoreVersionEntry(
  versionHistory: VersionHistoryEntry[],
  restoredFromVersion: number,
  restoredDays: Day[],
): VersionHistoryEntry {
  return {
    version: getNextVersionNumber(versionHistory),
    summary: `Restored itinerary from version ${restoredFromVersion}`,
    changeType: "restore_version",
    affectedDay: null,
    restoredFromVersion,
    createdAt: new Date().toISOString(),
    snapshot: cloneDays(restoredDays),
  };
}

function appendUnique(items: string[], item: string) {
  if (items.includes(item)) {
    return items;
  }

  return [...items, item];
}

function replaceMatchingActivity(
  items: string[],
  currentItem: string,
  replacementItem: string,
) {
  let didReplace = false;

  const updatedItems = items.map((item) => {
    if (item === currentItem) {
      didReplace = true;
      return replacementItem;
    }

    return item;
  });

  return {
    didReplace,
    items: Array.from(new Set(updatedItems)),
  };
}

function getSelectedReplacementLabel(day: Day, proposedChange: ProposedChange) {
  const selectedOption = proposedChange.options.find(
    (option) => option.id === proposedChange.selectedOptionId,
  );

  switch (proposedChange.selectedOptionId) {
    case "replace-food":
      return `Food / cafe break: ${day.food[0] ?? "nearby food option"}`;

    case "replace-activity":
      return `Lighter activity in ${day.city}`;

    case "replace-nearby":
      return `Nearby flexible stop in ${day.city}`;

    case "cafe-break":
      return `Cafe break: ${day.food[0] ?? "nearby cafe"}`;

    case "dessert-break":
      return `Dessert or bakery stop: ${day.food[1] ?? day.food[0] ?? "nearby bakery"}`;

    case "relaxed-cafe":
      return `Relaxed cafe break: ${day.food[0] ?? "nearby cafe"}`;

    case "short-walk":
      return `Short scenic walk in ${day.city}`;

    case "relax-time":
      return "Free and easy time";

    default:
      return selectedOption?.label ?? "Selected change";
  }
}

function updateSpecificActivity(day: Day, proposedChange: ProposedChange) {
  const currentItem = proposedChange.currentItem;
  const replacementLabel = getSelectedReplacementLabel(day, proposedChange);

  const morningResult = replaceMatchingActivity(day.morning, currentItem, replacementLabel);
  const afternoonResult = replaceMatchingActivity(day.afternoon, currentItem, replacementLabel);
  const eveningResult = replaceMatchingActivity(day.evening, currentItem, replacementLabel);

  const didReplace =
    morningResult.didReplace || afternoonResult.didReplace || eveningResult.didReplace;

  if (!didReplace) {
    return {
      didReplace: false,
      day,
    };
  }

  return {
    didReplace: true,
    day: {
      ...day,
      edited: true,
      morning: morningResult.items,
      afternoon: afternoonResult.items,
      evening: eveningResult.items,
      notes: appendUnique(
        day.notes,
        `Updated locally: ${proposedChange.title} - ${replacementLabel}.`,
      ),
    },
  };
}

function updateDayWithProposedChange(day: Day, proposedChange: ProposedChange): Day {
  const selectedOption = proposedChange.options.find(
    (option) => option.id === proposedChange.selectedOptionId,
  );

  const selectedLabel = getSelectedReplacementLabel(day, proposedChange);
  const updatedNote = `Updated locally: ${proposedChange.title} - ${
    selectedOption?.label ?? selectedLabel
  }.`;

  if (
    proposedChange.currentItem &&
    !proposedChange.currentItem.toLowerCase().includes("full plan")
  ) {
    const specificActivityUpdate = updateSpecificActivity(day, proposedChange);

    if (specificActivityUpdate.didReplace) {
      return specificActivityUpdate.day;
    }
  }

  if (proposedChange.selectedOptionId === "relax-time") {
    return {
      ...day,
      edited: true,
      afternoon:
        day.afternoon.length > 0
          ? Array.from(new Set([day.afternoon[0], "Free and easy time"]))
          : ["Free and easy time"],
      notes: appendUnique(day.notes, updatedNote),
    };
  }

  if (proposedChange.selectedOptionId === "make-evening-optional") {
    return {
      ...day,
      edited: true,
      evening: day.evening.map((item, index) =>
        index === 0 && !item.includes("(optional)") ? `${item} (optional)` : item,
      ),
      notes: appendUnique(day.notes, updatedNote),
    };
  }

  if (proposedChange.type === "add_cafe_break") {
    return {
      ...day,
      edited: true,
      afternoon: appendUnique(day.afternoon, selectedLabel),
      notes: appendUnique(day.notes, updatedNote),
    };
  }

  if (proposedChange.type === "replace_activity") {
    const replacementTarget = proposedChange.currentItem || "Upper Belvedere";

    const replacedMorning = day.morning.map((item) =>
      item === replacementTarget ? selectedLabel : item,
    );

    const replacedAfternoon = day.afternoon.map((item) =>
      item === replacementTarget ? selectedLabel : item,
    );

    const replacedEvening = day.evening.map((item) =>
      item === replacementTarget ? selectedLabel : item,
    );

    const replacementAlreadyExists =
      replacedMorning.includes(selectedLabel) ||
      replacedAfternoon.includes(selectedLabel) ||
      replacedEvening.includes(selectedLabel);

    return {
      ...day,
      edited: true,
      morning: replacedMorning,
      afternoon: replacementAlreadyExists
        ? replacedAfternoon
        : appendUnique(replacedAfternoon, selectedLabel),
      evening: replacedEvening,
      notes: appendUnique(day.notes, updatedNote),
    };
  }

  return {
    ...day,
    edited: true,
    afternoon: appendUnique(day.afternoon.slice(0, 1), selectedLabel),
    notes: appendUnique(day.notes, updatedNote),
  };
}

function createTimelineProposedChange(
  item: TodayTimelineItem,
  currentDay: Day,
  action: "replace" | "skip",
  guidedOption?: GuidedReplacementOption,
): ProposedChange {
  const isSkipAction = action === "skip";

  if (guidedOption) {
    return {
      id: `change-${Date.now()}`,
      type: "replace_activity",
      title: `Replace ${item.title}`,
      affectedDay: currentDay.dayNumber,
      affectedCity: currentDay.city,
      currentItem: item.title,
      requestedChange: `Replace ${item.title} with ${guidedOption.label}.`,
      impact:
        "This replaces one timeline item while keeping the rest of today's itinerary intact.",
      selectedOptionId: guidedOption.id,
      status: "awaiting_confirmation",
      options: [
        {
          id: guidedOption.id,
          label: guidedOption.label,
          description: guidedOption.description,
        },
        {
          id: "relax-time",
          label: "Keep this time free and easy",
          description:
            "Remove the activity and leave the time open for rest or spontaneous plans.",
        },
      ],
    };
  }

  return {
    id: `change-${Date.now()}`,
    type: isSkipAction ? "make_lighter" : "replace_activity",
    title: isSkipAction ? `Remove ${item.title}` : `Replace ${item.title}`,
    affectedDay: currentDay.dayNumber,
    affectedCity: currentDay.city,
    currentItem: item.title,
    requestedChange: isSkipAction
      ? `Remove ${item.title} from today's plan and keep the time flexible.`
      : `Replace ${item.title} with another option.`,
    impact: isSkipAction
      ? "This keeps the time block open so the day feels less rushed."
      : "This changes one activity while keeping the rest of today's itinerary intact.",
    selectedOptionId: isSkipAction ? "relax-time" : "replace-food",
    status: "awaiting_confirmation",
    options: [
      {
        id: "relax-time",
        label: "Keep this time free and easy",
        description: "Remove the activity and leave the time open for rest or spontaneous plans.",
      },
      {
        id: "replace-food",
        label: "Replace with food or cafe",
        description: `Use a food option such as ${
          currentDay.food[0] ?? "a nearby cafe or meal stop"
        }.`,
      },
      {
        id: "replace-activity",
        label: "Replace with a lighter activity",
        description: "Swap this for something easier and less time-sensitive.",
      },
      {
        id: "replace-nearby",
        label: "Replace with a nearby location",
        description: "Choose a flexible nearby stop so travel time stays low.",
      },
    ],
  };
}

function createNowResponse(
  timelineStatus: ReturnType<typeof getTimelineStatus>,
  currentDay: Day,
) {
  if (timelineStatus.currentItem) {
    return {
      title: "What to do now",
      content: [
        `You are on Day ${currentDay.dayNumber} in ${currentDay.city}.`,
        "",
        `Now: ${timelineStatus.currentItem.title}`,
        `Location: ${timelineStatus.currentItem.location}`,
        `Transport: ${timelineStatus.currentItem.transport}`,
        `Remark: ${timelineStatus.currentItem.remarks}`,
        "",
        timelineStatus.nextItem
          ? `Next: ${timelineStatus.nextItem.title}`
          : "There are no more planned activities after this.",
      ].join("\n"),
    };
  }

  if (timelineStatus.nextItem) {
    return {
      title: "Before the next activity",
      content: [
        `You are on Day ${currentDay.dayNumber} in ${currentDay.city}.`,
        "",
        "The first upcoming activity is:",
        `${timelineStatus.nextItem.title}`,
        `Transport: ${timelineStatus.nextItem.transport}`,
        "",
        "Use the remaining time to prepare, travel, or keep things relaxed.",
      ].join("\n"),
    };
  }

  return {
    title: "No current activity",
    content: "I could not find a current or upcoming activity for today.",
  };
}

function createRunningLateResponse(
  timelineStatus: ReturnType<typeof getTimelineStatus>,
  currentDay: Day,
) {
  const bestItemToAdjust = timelineStatus.currentItem ?? timelineStatus.nextItem;

  return {
    title: "Running late suggestion",
    content: [
      `Day ${currentDay.dayNumber} in ${currentDay.city} looks adjustable.`,
      "",
      bestItemToAdjust
        ? `Best item to adjust: ${bestItemToAdjust.title}`
        : "I could not detect a specific item to adjust.",
      "",
      "Suggested approach:",
      "- Keep the main must-do activity.",
      "- Replace one time-sensitive stop with free time.",
      "- Use the timeline's Free time or Replace button to save the change.",
      "",
      "No itinerary changes have been saved yet.",
    ].join("\n"),
  };
}

export default function Home() {
  const [tripData, setTripData] = useState<ItineraryState>(() => loadInitialTripState());
  const [activeTab, setActiveTab] = useState<VamoTab>("home");
  const [now, setNow] = useState(() => new Date());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedActivityItem, setSelectedActivityItem] = useState<TodayTimelineItem | null>(null);
  const [activityChangeItem, setActivityChangeItem] = useState<TodayTimelineItem | null>(null);
  const [manualEditItem, setManualEditItem] = useState<TodayTimelineItem | null>(null);
  const [moveActivityItem, setMoveActivityItem] = useState<TodayTimelineItem | null>(null);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [versionToCompare, setVersionToCompare] = useState<VersionHistoryEntry | null>(null);
  const [proposedChange, setProposedChange] = useState<ProposedChange | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    createMessage(
      "assistant",
      "Welcome to Vamo. Your Austria trip is loaded. Ask me about today, your next stop, food, transport, or changes.",
      "Vamo ready",
    ),
  ]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentDay = useMemo(() => {
    return tripData.days.find((day) => day.dayNumber === tripData.currentDay);
  }, [tripData]);

  const tomorrowDay = useMemo(() => {
    return tripData.days.find((day) => day.dayNumber === tripData.currentDay + 1);
  }, [tripData]);

  const todayTimelineItems = useMemo(() => {
    return currentDay ? buildTodayTimeline(currentDay) : [];
  }, [currentDay]);

  const timelineStatus = useMemo(() => {
    return getTimelineStatus(todayTimelineItems, now);
  }, [todayTimelineItems, now]);

  const saveUpdatedTrip = (
    updatedDays: Day[],
    summary: string,
    changeType: string,
    affectedDay: number | null,
  ) => {
    const nextVersion = createDirectVersionEntry(
      tripData.versionHistory,
      updatedDays,
      summary,
      changeType,
      affectedDay,
    );

    const updatedTrip: ItineraryState = {
      ...tripData,
      saveStatus: "saved_locally",
      days: updatedDays,
      versionHistory: [...tripData.versionHistory, nextVersion],
    };

    saveTripToStorage(updatedTrip);
    setTripData(updatedTrip);

    return nextVersion;
  };

  const clearActivePanels = () => {
    setSelectedActivityItem(null);
    setActivityChangeItem(null);
    setManualEditItem(null);
    setMoveActivityItem(null);
    setIsAddActivityOpen(false);
    setProposedChange(null);
  };

  const handleShareComingSoon = () => {
    setIsChatOpen(true);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        "Sharing is planned for V2. For now, Vamo keeps your Austria itinerary saved locally in this browser.",
        "Share coming soon",
      ),
    ]);
  };

  const handlePromptChipClick = (prompt: string) => {
    if (!currentDay) return;

    setIsChatOpen(true);

    const userMessage = createMessage("user", prompt);
    const normalizedPrompt = prompt.toLowerCase();

    if (
      normalizedPrompt.includes("what should i do now") ||
      normalizedPrompt.includes("what do i do now") ||
      normalizedPrompt.includes("do now")
    ) {
      const nowResponse = createNowResponse(timelineStatus, currentDay);

      setChatMessages((previousMessages) => [
        ...previousMessages,
        userMessage,
        createMessage("assistant", nowResponse.content, nowResponse.title),
      ]);

      return;
    }

    if (normalizedPrompt.includes("running late") || normalizedPrompt.includes("late")) {
      const lateResponse = createRunningLateResponse(timelineStatus, currentDay);

      setChatMessages((previousMessages) => [
        ...previousMessages,
        userMessage,
        createMessage("assistant", lateResponse.content, lateResponse.title),
      ]);

      return;
    }

    if (isEditPrompt(prompt)) {
      const change = createMockProposedChange(prompt, currentDay);

      clearActivePanels();
      setProposedChange(change);
      setTripData((previousTrip) => ({
        ...previousTrip,
        saveStatus: "awaiting_confirmation",
      }));

      const assistantMessage = createMessage(
        "assistant",
        [
          "I created a proposed itinerary change for you to review.",
          "",
          "Nothing has been saved yet.",
          "Choose an option, then confirm or reject the change.",
        ].join("\n"),
        change.title,
      );

      setChatMessages((previousMessages) => [
        ...previousMessages,
        userMessage,
        assistantMessage,
      ]);

      return;
    }

    const mockResponse = createMockAssistantResponse(prompt, currentDay, tomorrowDay);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      createMessage("assistant", mockResponse.content, mockResponse.title),
    ]);
  };

  const handleAskAboutItem = (item: TodayTimelineItem) => {
    setSelectedActivityItem(null);
    handlePromptChipClick(`What should I know about ${item.title} in today's plan?`);
  };

  const handleStartTimelineChange = (
    item: TodayTimelineItem,
    action: "replace" | "skip",
  ) => {
    if (!currentDay) return;

    setSelectedActivityItem(null);
    setManualEditItem(null);
    setMoveActivityItem(null);
    setIsAddActivityOpen(false);

    if (action === "replace") {
      setActivityChangeItem(item);
      setProposedChange(null);
      setIsChatOpen(false);
      return;
    }

    const change = createTimelineProposedChange(item, currentDay, "skip");

    setActivityChangeItem(null);
    setProposedChange(change);
    setIsChatOpen(false);

    setTripData((previousTrip) => ({
      ...previousTrip,
      saveStatus: "awaiting_confirmation",
    }));

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage("user", `Keep ${item.title} as free time`),
      createMessage(
        "assistant",
        [
          "I created a focused change for this timeline item.",
          "",
          "Nothing is saved until you confirm.",
        ].join("\n"),
        change.title,
      ),
    ]);
  };

  const handleGuidedKeepFreeTime = (item: TodayTimelineItem) => {
    if (!currentDay) return;

    const change = createTimelineProposedChange(item, currentDay, "skip");

    setActivityChangeItem(null);
    setProposedChange(change);

    setTripData((previousTrip) => ({
      ...previousTrip,
      saveStatus: "awaiting_confirmation",
    }));

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage("user", `Remove ${item.title} and keep the time free`),
      createMessage(
        "assistant",
        "I prepared a free-time change for review. Confirm it if you want to save it.",
        change.title,
      ),
    ]);
  };

  const handleGuidedReplacement = (
    item: TodayTimelineItem,
    option: GuidedReplacementOption,
  ) => {
    if (!currentDay) return;

    const change = createTimelineProposedChange(item, currentDay, "replace", option);

    setActivityChangeItem(null);
    setProposedChange(change);

    setTripData((previousTrip) => ({
      ...previousTrip,
      saveStatus: "awaiting_confirmation",
    }));

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage("user", `Replace ${item.title} with ${option.label}`),
      createMessage(
        "assistant",
        [
          "I prepared a replacement for review.",
          "",
          `Suggested replacement: ${option.label}`,
          "Nothing is saved until you confirm.",
        ].join("\n"),
        change.title,
      ),
    ]);
  };

  const handleManualActivitySave = (draft: ManualActivityDraft) => {
    const periodField = getPeriodField(draft.period);

    const updatedDays = tripData.days.map((day) => {
      if (day.dayNumber !== draft.dayNumber) {
        return day;
      }

      return {
        ...day,
        edited: true,
        [periodField]: updateArrayAtIndex(day[periodField], draft.sourceIndex, draft.title),
        transport: updateArrayAtIndex(day.transport, draft.sourceIndex, draft.transport),
        notes: appendUnique(
          updateArrayAtIndex(day.notes, draft.sourceIndex, draft.remarks),
          `Manual edit saved: ${draft.title}. Time: ${draft.time}. Location: ${draft.location}.`,
        ),
      };
    });

    const version = saveUpdatedTrip(
      updatedDays,
      `Day ${draft.dayNumber}: manually edited ${draft.title}`,
      "manual_activity_edit",
      draft.dayNumber,
    );

    setManualEditItem(null);
    setSelectedActivityItem(null);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        `Manual edit saved locally as version ${version.version}.`,
        "Activity edited",
      ),
    ]);
  };

  const handleAddActivitySave = (draft: NewActivityDraft) => {
    const periodField = getPeriodField(draft.period);

    const updatedDays = tripData.days.map((day) => {
      if (day.dayNumber !== draft.dayNumber) {
        return day;
      }

      return {
        ...day,
        edited: true,
        [periodField]: appendUnique(day[periodField], draft.title),
        food:
          draft.category === "food"
            ? appendUnique(day.food, draft.title)
            : day.food,
        transport: appendUnique(day.transport, draft.transport),
        notes: appendUnique(
          day.notes,
          `Added manually at ${draft.time}: ${draft.title}. Location: ${draft.location}. ${draft.remarks}`,
        ),
      };
    });

    const version = saveUpdatedTrip(
      updatedDays,
      `Day ${draft.dayNumber}: added ${draft.title}`,
      "add_activity",
      draft.dayNumber,
    );

    setIsAddActivityOpen(false);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        `Added ${draft.title} and saved it locally as version ${version.version}.`,
        "Activity added",
      ),
    ]);
  };

  const handleMoveActivitySave = (draft: MoveActivityDraft) => {
    if (!moveActivityItem) return;

    const sourcePeriodField = getPeriodField(moveActivityItem.period);
    const targetPeriodField = getPeriodField(draft.targetPeriod);

    const updatedDays = tripData.days.map((day) => {
      let nextDay = { ...day };

      if (day.dayNumber === moveActivityItem.dayNumber) {
        nextDay = {
          ...nextDay,
          edited: true,
          [sourcePeriodField]: removeArrayAtIndex(
            nextDay[sourcePeriodField],
            moveActivityItem.sourceIndex,
          ),
          notes: appendUnique(
            nextDay.notes,
            `Moved out: ${moveActivityItem.title} from ${moveActivityItem.period}.`,
          ),
        };
      }

      if (day.dayNumber === draft.targetDayNumber) {
        nextDay = {
          ...nextDay,
          edited: true,
          [targetPeriodField]: appendUnique(
            nextDay[targetPeriodField],
            moveActivityItem.title,
          ),
          notes: appendUnique(
            nextDay.notes,
            `Moved in: ${moveActivityItem.title} to ${draft.targetPeriod} around ${draft.targetTime}.`,
          ),
        };
      }

      return nextDay;
    });

    const version = saveUpdatedTrip(
      updatedDays,
      `Moved ${moveActivityItem.title} to Day ${draft.targetDayNumber}`,
      "move_activity",
      draft.targetDayNumber,
    );

    setMoveActivityItem(null);
    setSelectedActivityItem(null);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        `Moved ${moveActivityItem.title} and saved it locally as version ${version.version}.`,
        "Activity moved",
      ),
    ]);
  };

  const handleMarkActivityDone = (item: TodayTimelineItem) => {
    const periodField = getPeriodField(item.period);

    const updatedDays = tripData.days.map((day) => {
      if (day.dayNumber !== item.dayNumber) {
        return day;
      }

      const doneTitle = item.title.startsWith("Done:") ? item.title : `Done: ${item.title}`;

      return {
        ...day,
        edited: true,
        [periodField]: updateArrayAtIndex(day[periodField], item.sourceIndex, doneTitle),
        notes: appendUnique(day.notes, `Marked done: ${item.title}.`),
      };
    });

    const version = saveUpdatedTrip(
      updatedDays,
      `Day ${item.dayNumber}: marked ${item.title} as done`,
      "mark_activity_done",
      item.dayNumber,
    );

    setSelectedActivityItem(null);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        `Marked ${item.title} as done and saved version ${version.version}.`,
        "Activity done",
      ),
    ]);
  };

  const handleSelectProposedOption = (optionId: string) => {
    setProposedChange((previousChange) =>
      previousChange
        ? {
            ...previousChange,
            selectedOptionId: optionId,
          }
        : previousChange,
    );
  };

  const handleConfirmChange = () => {
    if (!proposedChange) return;

    const updatedDays = tripData.days.map((day) =>
      day.dayNumber === proposedChange.affectedDay
        ? updateDayWithProposedChange(day, proposedChange)
        : day,
    );

    const nextVersion = createChangeVersionEntry(
      tripData.versionHistory,
      proposedChange,
      updatedDays,
    );

    const updatedTrip: ItineraryState = {
      ...tripData,
      saveStatus: "saved_locally",
      days: updatedDays,
      versionHistory: [...tripData.versionHistory, nextVersion],
    };

    saveTripToStorage(updatedTrip);
    setTripData(updatedTrip);
    setProposedChange(null);
    setActivityChangeItem(null);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        [
          "Saved locally.",
          "",
          "Today's plan has been updated.",
          "Version history is available in Profile.",
        ].join("\n"),
        "Change confirmed",
      ),
    ]);
  };

  const handleRejectChange = () => {
    setProposedChange(null);
    setActivityChangeItem(null);

    setTripData((previousTrip) => ({
      ...previousTrip,
      saveStatus:
        previousTrip.versionHistory.length > 1 ? "saved_locally" : "using_sample_data",
    }));

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        "No changes were saved. Your itinerary remains unchanged.",
        "Change rejected",
      ),
    ]);
  };

  const handleRestoreVersion = (versionNumber: number) => {
    const versionToRestore = tripData.versionHistory.find(
      (entry) => entry.version === versionNumber,
    );

    if (!versionToRestore) {
      setChatMessages((previousMessages) => [
        ...previousMessages,
        createMessage(
          "assistant",
          `I could not find version ${versionNumber}. No changes were made.`,
          "Restore unavailable",
        ),
      ]);

      return;
    }

    const currentVersionNumber = getCurrentVersionNumber(tripData.versionHistory);

    if (versionToRestore.version === currentVersionNumber) {
      setChatMessages((previousMessages) => [
        ...previousMessages,
        createMessage(
          "assistant",
          `Version ${versionNumber} is already the current version.`,
          "Already current",
        ),
      ]);

      return;
    }

    if (!versionToRestore.snapshot) {
      setChatMessages((previousMessages) => [
        ...previousMessages,
        createMessage(
          "assistant",
          [
            `Version ${versionNumber} does not have a restorable snapshot.`,
            "",
            "This can happen for older localStorage data created before version restore was added.",
            "Use Reset Sample Trip, then create new changes to test full restore behavior.",
          ].join("\n"),
          "Restore unavailable",
        ),
      ]);

      return;
    }

    const confirmed = window.confirm(
      `Restore version ${versionNumber}? This creates a new version from that older itinerary snapshot.`,
    );

    if (!confirmed) return;

    const restoredDays = cloneDays(versionToRestore.snapshot);

    const restoreVersion = createRestoreVersionEntry(
      tripData.versionHistory,
      versionToRestore.version,
      restoredDays,
    );

    const updatedTrip: ItineraryState = {
      ...tripData,
      saveStatus: "saved_locally",
      days: restoredDays,
      versionHistory: [...tripData.versionHistory, restoreVersion],
    };

    saveTripToStorage(updatedTrip);
    setTripData(updatedTrip);
    setProposedChange(null);
    setActivityChangeItem(null);
    setManualEditItem(null);
    setMoveActivityItem(null);
    setSelectedActivityItem(null);
    setVersionToCompare(null);

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        [
          `Restored version ${versionToRestore.version}.`,
          "",
          `I created version ${restoreVersion.version} from that older snapshot, so your history is preserved.`,
        ].join("\n"),
        "Version restored",
      ),
    ]);
  };

  const handleResetTrip = () => {
    const confirmed = window.confirm(
      "Reset the sample trip? This clears local saved changes in this browser.",
    );

    if (!confirmed) return;

    clearTripStorage();

    const freshTrip = createInitialTripState();

    setTripData(freshTrip);
    setProposedChange(null);
    setActivityChangeItem(null);
    setManualEditItem(null);
    setMoveActivityItem(null);
    setSelectedActivityItem(null);
    setIsAddActivityOpen(false);
    setVersionToCompare(null);
    setActiveTab("home");
    setChatMessages([
      createMessage(
        "assistant",
        "Sample trip reset. All local changes in this browser have been cleared.",
        "Trip reset",
      ),
    ]);
  };

  const openAddActivity = () => {
    clearActivePanels();
    setIsAddActivityOpen(true);
  };

  const openEditDay = () => {
    const itemToEdit = timelineStatus.currentItem ?? timelineStatus.nextItem ?? todayTimelineItems[0];

    if (itemToEdit) {
      clearActivePanels();
      setManualEditItem(itemToEdit);
    }
  };

  const hasActiveEditor =
    isAddActivityOpen ||
    Boolean(manualEditItem) ||
    Boolean(moveActivityItem) ||
    Boolean(activityChangeItem) ||
    Boolean(proposedChange);

  return (
    <VamoAppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {!currentDay ? (
        <div className="p-4">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-red-100">
            Current day could not be found in the itinerary data.
          </div>
        </div>
      ) : (
        <>
          {hasActiveEditor && (
            <div className="space-y-4 px-4 py-4">
              {isAddActivityOpen && (
                <AddActivityPanel
                  dayNumber={currentDay.dayNumber}
                  city={currentDay.city}
                  onCancel={() => setIsAddActivityOpen(false)}
                  onSave={handleAddActivitySave}
                />
              )}

              {manualEditItem && (
                <ManualActivityEditor
                  item={manualEditItem}
                  onCancel={() => setManualEditItem(null)}
                  onSave={handleManualActivitySave}
                />
              )}

              {moveActivityItem && (
                <MoveActivityPanel
                  item={moveActivityItem}
                  availableDays={tripData.days.map((day) => ({
                    dayNumber: day.dayNumber,
                    city: day.city,
                    theme: day.theme,
                  }))}
                  onCancel={() => setMoveActivityItem(null)}
                  onSave={handleMoveActivitySave}
                />
              )}

              {activityChangeItem && (
                <GuidedActivityChangePanel
                  item={activityChangeItem}
                  day={currentDay}
                  onClose={() => setActivityChangeItem(null)}
                  onKeepFreeTime={handleGuidedKeepFreeTime}
                  onSelectReplacement={handleGuidedReplacement}
                />
              )}

              {proposedChange && (
                <ProposedChangeCard
                  proposedChange={proposedChange}
                  onSelectOption={handleSelectProposedOption}
                  onConfirm={handleConfirmChange}
                  onReject={handleRejectChange}
                />
              )}
            </div>
          )}

          {!hasActiveEditor && activeTab === "home" && (
            <VamoHomeScreen
              trip={tripData}
              currentDay={currentDay}
              now={now}
              timelineItems={todayTimelineItems}
              timelineStatus={timelineStatus}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenPlanner={() => setActiveTab("planner")}
              onShareComingSoon={handleShareComingSoon}
              onEditDay={openEditDay}
              onViewItemDetails={setSelectedActivityItem}
              onAskAboutItem={handleAskAboutItem}
              onChangeItem={(item) => handleStartTimelineChange(item, "replace")}
              onSkipItem={(item) => handleStartTimelineChange(item, "skip")}
            />
          )}

          {!hasActiveEditor && activeTab === "planner" && (
            <VamoPlannerScreen
              trip={tripData}
              onAddActivity={openAddActivity}
              onViewItemDetails={setSelectedActivityItem}
              onAskAboutItem={handleAskAboutItem}
              onChangeItem={(item) => handleStartTimelineChange(item, "replace")}
              onSkipItem={(item) => handleStartTimelineChange(item, "skip")}
              onShareComingSoon={handleShareComingSoon}
            />
          )}

          {!hasActiveEditor && activeTab === "profile" && (
            <VamoProfileScreen
              trip={tripData}
              versionHistory={tripData.versionHistory}
              onResetTrip={handleResetTrip}
              onRestoreVersion={handleRestoreVersion}
              onCompareVersion={setVersionToCompare}
              onShareComingSoon={handleShareComingSoon}
            />
          )}

          <ActivityDetailDrawer
            item={selectedActivityItem}
            isOpen={Boolean(selectedActivityItem)}
            isCurrent={selectedActivityItem?.id === timelineStatus.currentItem?.id}
            isNext={selectedActivityItem?.id === timelineStatus.nextItem?.id}
            onClose={() => setSelectedActivityItem(null)}
            onAskAboutItem={handleAskAboutItem}
            onReplaceItem={(item) => handleStartTimelineChange(item, "replace")}
            onKeepFreeTime={(item) => handleStartTimelineChange(item, "skip")}
            onEditItem={(item) => {
              setSelectedActivityItem(null);
              setManualEditItem(item);
            }}
            onMoveItem={(item) => {
              setSelectedActivityItem(null);
              setMoveActivityItem(item);
            }}
            onMarkDone={handleMarkActivityDone}
            onSkipItem={(item) => handleStartTimelineChange(item, "skip")}
          />

          <FloatingChatPanel
            isOpen={isChatOpen}
            messages={chatMessages}
            prompts={TODAY_MODE_PROMPTS}
            onPromptClick={handlePromptChipClick}
            onOpen={() => setIsChatOpen(true)}
            onClose={() => setIsChatOpen(false)}
          />

          <VersionComparePanel
            isOpen={Boolean(versionToCompare)}
            version={versionToCompare}
            currentDays={tripData.days}
            onClose={() => setVersionToCompare(null)}
            onRestoreVersion={handleRestoreVersion}
          />
        </>
      )}
    </VamoAppShell>
  );
}
