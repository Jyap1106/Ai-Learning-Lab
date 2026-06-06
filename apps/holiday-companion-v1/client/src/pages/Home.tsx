import { useEffect, useMemo, useState } from "react";
import Header from "@/components/holiday/Header";
import TodayPlanCard from "@/components/holiday/TodayPlanCard";
import TomorrowPlanCard from "@/components/holiday/TomorrowPlanCard";
import TripDashboard from "@/components/holiday/TripDashboard";
import FullItineraryList from "@/components/holiday/FullItineraryList";
import ChatAssistant, {
  type ChatMessage,
} from "@/components/holiday/ChatAssistant";
import ProposedChangeCard from "@/components/holiday/ProposedChangeCard";
import austriaData from "@/data/austriaItineraryState.json";
import {
  createMockAssistantResponse,
  createMockProposedChange,
  DEFAULT_PROMPT_CHIPS,
  isEditPrompt,
  type Day,
  type ProposedChange,
} from "@/lib/mockResponses";

interface VersionHistoryEntry {
  version: number;
  summary: string;
  changeType?: string;
  affectedDay?: number | null;
  createdAt?: string;
}

interface ItineraryState {
  tripId: string;
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: Day[];
  versionHistory: VersionHistoryEntry[];
}

const STORAGE_KEY = "holiday_companion_current_trip";

function createMessage(
  role: "user" | "assistant",
  content: string,
  title?: string
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    title,
  };
}

function createVersionEntry(
  previousLength: number,
  proposedChange: ProposedChange
): VersionHistoryEntry {
  const selectedOption = proposedChange.options.find(
    (option) => option.id === proposedChange.selectedOptionId
  );

  return {
    version: previousLength + 1,
    changeType: proposedChange.type,
    affectedDay: proposedChange.affectedDay,
    createdAt: new Date().toISOString(),
    summary: `Day ${proposedChange.affectedDay}: ${proposedChange.title} → ${
      selectedOption?.label ?? "selected option"
    }`,
  };
}

function updateDayWithProposedChange(
  day: Day,
  proposedChange: ProposedChange
): Day {
  const selectedOption = proposedChange.options.find(
    (option) => option.id === proposedChange.selectedOptionId
  );

  const selectedLabel = selectedOption?.label ?? "Selected change";
  const updatedNote = `Updated locally: ${proposedChange.title} — ${selectedLabel}.`;

  if (proposedChange.type === "add_cafe_break") {
    return {
      ...day,
      edited: true,
      afternoon: [...day.afternoon, selectedLabel],
      notes: [...day.notes, updatedNote],
    };
  }

  if (proposedChange.type === "replace_activity") {
    const replacedAfternoon = day.afternoon.map((item) =>
      item === "Upper Belvedere" ? selectedLabel : item
    );

    return {
      ...day,
      edited: true,
      afternoon: replacedAfternoon.includes(selectedLabel)
        ? replacedAfternoon
        : [...replacedAfternoon, selectedLabel],
      notes: [...day.notes, updatedNote],
    };
  }

  return {
    ...day,
    edited: true,
    notes: [...day.notes, updatedNote],
  };
}

export default function Home() {
  const [tripData, setTripData] = useState<ItineraryState | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [proposedChange, setProposedChange] =
    useState<ProposedChange | null>(null);

  useEffect(() => {
    try {
      const savedTrip = window.localStorage.getItem(STORAGE_KEY);

      if (savedTrip) {
        setTripData(JSON.parse(savedTrip) as ItineraryState);
        return;
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    setTripData(austriaData as ItineraryState);
  }, []);

  const currentDay = useMemo(() => {
    if (!tripData) return undefined;
    return tripData.days.find((day) => day.dayNumber === tripData.currentDay);
  }, [tripData]);

  const tomorrowDay = useMemo(() => {
    if (!tripData) return undefined;
    return tripData.days.find(
      (day) => day.dayNumber === tripData.currentDay + 1
    );
  }, [tripData]);

  const upcomingDays = useMemo(() => {
    if (!tripData) return [];
    return tripData.days.filter(
      (day) =>
        day.dayNumber > tripData.currentDay &&
        day.dayNumber <= tripData.currentDay + 3
    );
  }, [tripData]);

  const handlePromptChipClick = (prompt: string) => {
    if (!tripData || !currentDay) return;

    const userMessage = createMessage("user", prompt);

    if (isEditPrompt(prompt)) {
      const change = createMockProposedChange(prompt, currentDay);

      setProposedChange(change);
      setTripData((previousTrip) =>
        previousTrip
          ? {
              ...previousTrip,
              saveStatus: "awaiting_confirmation",
            }
          : previousTrip
      );

      const assistantMessage = createMessage(
        "assistant",
        [
          "I created a proposed itinerary change for you to review.",
          "",
          "Nothing has been saved yet.",
          "Please choose an option and confirm or reject the change.",
        ].join("\n"),
        change.title
      );

      setChatMessages((previousMessages) => [
        ...previousMessages,
        userMessage,
        assistantMessage,
      ]);

      return;
    }

    const mockResponse = createMockAssistantResponse(
      prompt,
      currentDay,
      tomorrowDay
    );

    const assistantMessage = createMessage(
      "assistant",
      mockResponse.content,
      mockResponse.title
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
        : previousChange
    );
  };

  const handleConfirmChange = () => {
    if (!tripData || !proposedChange) return;

    const nextVersion = createVersionEntry(
      tripData.versionHistory.length,
      proposedChange
    );

    const updatedTrip: ItineraryState = {
      ...tripData,
      saveStatus: "saved_locally",
      days: tripData.days.map((day) =>
        day.dayNumber === proposedChange.affectedDay
          ? updateDayWithProposedChange(day, proposedChange)
          : day
      ),
      versionHistory: [...tripData.versionHistory, nextVersion],
    };

    setTripData(updatedTrip);
    setProposedChange(null);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrip));

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
        "Change confirmed"
      ),
    ]);
  };

  const handleRejectChange = () => {
    setProposedChange(null);

    setTripData((previousTrip) =>
      previousTrip
        ? {
            ...previousTrip,
            saveStatus: "rejected",
          }
        : previousTrip
    );

    setChatMessages((previousMessages) => [
      ...previousMessages,
      createMessage(
        "assistant",
        "No changes were saved. Your itinerary remains unchanged.",
        "Change rejected"
      ),
    ]);
  };

  if (!tripData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 text-center shadow-xl">
          <p className="text-sm font-medium text-slate-500">
            Loading trip data...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_35%),linear-gradient(135deg,_#fff7ed,_#f8fafc_45%,_#eef2ff)]">
      <Header
        tripName={tripData.tripName}
        currentDay={tripData.currentDay}
        saveStatus={tripData.saveStatus}
      />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <section className="space-y-6">
          {currentDay && (
            <TodayPlanCard
              day={currentDay}
              onPromptClick={handlePromptChipClick}
            />
          )}

          {tomorrowDay && <TomorrowPlanCard day={tomorrowDay} />}

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
          />

          <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-xl shadow-blue-950/5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
              V1 Build Status
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Mock chat and local edits
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This build uses local sample data, mock assistant responses,
              proposed changes, confirm/reject behavior, and localStorage.
              Real AI and backend saving come later.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
