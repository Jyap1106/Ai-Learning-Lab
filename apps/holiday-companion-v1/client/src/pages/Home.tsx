import { useEffect, useMemo, useState } from "react";
import Header from "@/components/holiday/Header";
import TodayPlanCard from "@/components/holiday/TodayPlanCard";
import TomorrowPlanCard from "@/components/holiday/TomorrowPlanCard";
import TripDashboard from "@/components/holiday/TripDashboard";
import FullItineraryList from "@/components/holiday/FullItineraryList";
import ChatAssistant, {
  type ChatMessage,
} from "@/components/holiday/ChatAssistant";
import austriaData from "@/data/austriaItineraryState.json";
import {
  createMockAssistantResponse,
  DEFAULT_PROMPT_CHIPS,
  type Day,
} from "@/lib/mockResponses";

interface ItineraryState {
  tripId: string;
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: Day[];
  versionHistory: Array<{
    version: number;
    summary: string;
  }>;
}

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

export default function Home() {
  const [tripData, setTripData] = useState<ItineraryState | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
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

    const mockResponse = createMockAssistantResponse(
      prompt,
      currentDay,
      tomorrowDay
    );

    const userMessage = createMessage("user", prompt);
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
          {currentDay && <TodayPlanCard day={currentDay} />}
          {tomorrowDay && <TomorrowPlanCard day={tomorrowDay} />}
          <ChatAssistant
            messages={chatMessages}
            prompts={DEFAULT_PROMPT_CHIPS}
            onPromptClick={handlePromptChipClick}
          />
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
              Mock chat added
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This build uses local sample data and mock assistant responses.
              Real AI, proposed changes, confirm/reject, and localStorage come
              in later slices.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
