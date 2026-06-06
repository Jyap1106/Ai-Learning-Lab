import { useMemo, useState } from "react";

import ChatAssistant, { type ChatMessage } from "@/components/holiday/ChatAssistant";
import FullItineraryList from "@/components/holiday/FullItineraryList";
import Header from "@/components/holiday/Header";
import ProposedChangeCard from "@/components/holiday/ProposedChangeCard";
import TodayPlanCard from "@/components/holiday/TodayPlanCard";
import TomorrowPlanCard from "@/components/holiday/TomorrowPlanCard";
import TripDashboard from "@/components/holiday/TripDashboard";
import austriaData from "@/data/austriaItineraryState.json";
import {
  DEFAULT_PROMPT_CHIPS,
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

function getNextVersionNumber(versionHistory: VersionHistoryEntry[]) {
  if (versionHistory.length === 0) {
    return 1;
  }

  return Math.max(...versionHistory.map((entry) => entry.version)) + 1;
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

function normalizeTripState(trip: ItineraryState): ItineraryState {
  const cleanDays = cloneDays(trip.days ?? []);

  const versionHistory =
    trip.versionHistory && trip.versionHistory.length > 0
      ? trip.versionHistory
      : [createInitialVersionEntry(cleanDays)];

  const currentVersionNumber = Math.max(
    ...versionHistory.map((entry) => entry.version),
  );

  const normalizedVersionHistory = versionHistory.map((entry) => ({
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
    summary: `Day ${proposedChange.affectedDay}: ${proposedChange.title} → ${
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

function updateDayWithProposedChange(day: Day, proposedChange: ProposedChange): Day {
  const selectedOption = proposedChange.options.find(
    (option) => option.id === proposedChange.selectedOptionId,
  );

  const selectedLabel = selectedOption?.label ?? "Selected change";
  const updatedNote = `Updated locally: ${proposedChange.title} — ${selectedLabel}.`;

  if (proposedChange.selectedOptionId === "relax-time") {
    return {
      ...day,
      edited: true,
      afternoon: day.afternoon.slice(0, 1),
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

    const replacedAfternoon = day.afternoon.map((item) =>
      item === replacementTarget ? selectedLabel : item,
    );

    return {
      ...day,
      edited: true,
      afternoon: replacedAfternoon.includes(selectedLabel)
        ? replacedAfternoon
        : [...replacedAfternoon, selectedLabel],
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

export default function Home() {
  const [tripData, setTripData] = useState<ItineraryState>(() => loadInitialTripState());

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    createMessage(
      "assistant",
      "I loaded your Austria sample trip. Use the prompt chips to ask about today, tomorrow, food, transport, or local itinerary changes.",
      "Welcome",
    ),
  ]);

  const [proposedChange, setProposedChange] = useState<ProposedChange | null>(null);

  const currentDay = useMemo(() => {
    return tripData.days.find((day) => day.dayNumber === tripData.currentDay);
  }, [tripData]);

  const tomorrowDay = useMemo(() => {
    return tripData.days.find((day) => day.dayNumber === tripData.currentDay + 1);
  }, [tripData]);

  const upcomingDays = useMemo(() => {
    return tripData.days.filter(
      (day) =>
        day.dayNumber > tripData.currentDay && day.dayNumber <= tripData.currentDay + 3,
    );
  }, [tripData]);

  const handlePromptChipClick = (prompt: string) => {
    if (!currentDay) return;

    const userMessage = createMessage("user", prompt);

    if (isEditPrompt(prompt)) {
      const change = createMockProposedChange(prompt, currentDay);

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

    const assistantMessage = createMessage(
      "assistant",
      mockResponse.content,
      mockResponse.title,
    );

    setChatMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      assistantMessage,
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

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        [
          "Saved locally.",
          "",
          "Your itinerary has been updated in this prototype.",
          `Version ${nextVersion.version}: ${nextVersion.summary}`,
        ].join("\n"),
        "Change confirmed",
      ),
    ]);
  };

  const handleRejectChange = () => {
    setProposedChange(null);

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

    const currentVersionNumber = Math.max(
      ...tripData.versionHistory.map((entry) => entry.version),
    );

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
            "This can happen for older saved localStorage data created before version restore was added.",
            "Use Reset Sample Trip, then create new changes to test full restore behavior.",
          ].join("\n"),
          "Restore unavailable",
        ),
      ]);

      return;
    }

    const confirmed = window.confirm(
      `Restore version ${versionNumber}? This will create a new version from that older itinerary snapshot.`,
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
    setChatMessages([
      createMessage(
        "assistant",
        "Sample trip reset. All local changes in this browser have been cleared.",
        "Trip reset",
      ),
    ]);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Header
          tripName={tripData.tripName}
          currentDay={tripData.currentDay}
          saveStatus={tripData.saveStatus}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <section className="space-y-6">
            {currentDay ? (
              <TodayPlanCard day={currentDay} onPromptClick={handlePromptChipClick} />
            ) : (
              <div className="rounded-2xl border border-red-100 bg-white p-6 text-red-700 shadow-sm">
                Current day could not be found in the itinerary data.
              </div>
            )}

            {tomorrowDay && (
              <TomorrowPlanCard day={tomorrowDay} onPromptClick={handlePromptChipClick} />
            )}

            <ChatAssistant
              messages={chatMessages}
              prompts={DEFAULT_PROMPT_CHIPS}
              onPromptClick={handlePromptChipClick}
            />

            {proposedChange && (
              <ProposedChangeCard
                proposedChange={proposedChange}
                onSelectOption={handleSelectProposedOption}
                onConfirm={handleConfirmChange}
                onReject={handleRejectChange}
              />
            )}

            <FullItineraryList days={tripData.days} />
          </section>

          <aside className="space-y-6">
            <TripDashboard
              trip={tripData}
              currentDay={tripData.currentDay}
              versionHistory={tripData.versionHistory}
              saveStatus={tripData.saveStatus}
              upcomingDays={upcomingDays}
              onResetTrip={handleResetTrip}
              onRestoreVersion={handleRestoreVersion}
            />

            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-blue-900">V1 Build Status</p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">
                Local itinerary companion
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This build uses local sample data, mock assistant responses, proposed
                changes, confirm/reject behavior, localStorage, and restorable version
                history. Real AI and backend saving come later.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
