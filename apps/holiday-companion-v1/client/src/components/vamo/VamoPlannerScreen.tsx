import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Navigation,
  Plus,
  Share2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  buildTodayTimeline,
  formatTimelineTime,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

interface Day {
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

interface ItineraryState {
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: Day[];
}

interface VamoPlannerScreenProps {
  trip: ItineraryState;
  onAddActivity: () => void;
  onViewItemDetails: (item: TodayTimelineItem) => void;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onChangeItem: (item: TodayTimelineItem) => void;
  onSkipItem: (item: TodayTimelineItem) => void;
  onShareComingSoon: () => void;
}

function GradientRoutePreview({ day }: { day: Day }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.38),transparent_22%),linear-gradient(135deg,#475569,#111827,#2563eb)] p-5">
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 min-h-36">
        <Badge className="bg-white text-black hover:bg-white">Live view placeholder</Badge>

        <div className="absolute bottom-0 left-0 right-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            Route preview
          </p>

          <h2 className="mt-1 text-2xl font-black text-white">
            Day {day.dayNumber} — {day.city}
          </h2>

          <p className="mt-1 text-sm text-white/70">
            {day.morning.length + day.afternoon.length + day.evening.length} stops ·
            local map later
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VamoPlannerScreen({
  trip,
  onAddActivity,
  onViewItemDetails,
  onAskAboutItem,
  onChangeItem,
  onSkipItem,
  onShareComingSoon,
}: VamoPlannerScreenProps) {
  const [selectedDayNumber, setSelectedDayNumber] = useState(trip.currentDay);

  const selectedDay =
    trip.days.find((day) => day.dayNumber === selectedDayNumber) ?? trip.days[0];

  const selectedTimelineItems = useMemo(() => {
    return selectedDay ? buildTodayTimeline(selectedDay) : [];
  }, [selectedDay]);

  return (
    <section className="min-h-screen px-4 pb-8 pt-4">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Planner
          </p>
          <h1 className="mt-1 text-2xl font-black text-white">{trip.tripName}</h1>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          onClick={onShareComingSoon}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </header>

      <div className="mb-5 overflow-x-auto">
        <div className="flex gap-3 pb-1">
          {trip.days.map((day) => {
            const isSelected = day.dayNumber === selectedDayNumber;

            return (
              <button
                key={day.dayNumber}
                type="button"
                className={`min-w-20 rounded-3xl border px-4 py-3 text-center transition ${
                  isSelected
                    ? "border-blue-400 bg-blue-500 text-black"
                    : "border-white/10 bg-white/[0.07] text-white"
                }`}
                onClick={() => setSelectedDayNumber(day.dayNumber)}
              >
                <p className="text-xs font-bold uppercase opacity-70">
                  Day
                </p>
                <p className="text-2xl font-black">{day.dayNumber}</p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <>
          <div className="mb-5">
            <GradientRoutePreview day={selectedDay} />
          </div>

          <div className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.07] p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-white text-black hover:bg-white">
                {selectedDay.dayNumber === trip.currentDay ? "Today" : "Trip day"}
              </Badge>

              {selectedDay.edited && (
                <Badge variant="outline" className="border-blue-300/40 text-blue-200">
                  Edited locally
                </Badge>
              )}
            </div>

            <h2 className="text-2xl font-black text-white">
              {selectedDay.city}
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {selectedDay.theme}
            </p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Daily timeline</h2>

            <Badge variant="outline" className="border-white/10 bg-white/10 text-white">
              {selectedTimelineItems.length} stops
            </Badge>
          </div>

          <div className="mb-6 space-y-3">
            {selectedTimelineItems.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-4"
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => onViewItemDetails(item)}
                >
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                      <CalendarDays className="h-5 w-5 text-blue-300" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                          {formatTimelineTime(item.time)}
                        </p>

                        <ChevronRight className="h-4 w-4 text-zinc-500" />
                      </div>

                      <h3 className="mt-1 text-lg font-black leading-tight text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                </button>

                <div className="mt-3 flex flex-wrap gap-2 pl-15">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => onAskAboutItem(item)}
                  >
                    <Navigation className="h-4 w-4" />
                    Ask
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => onChangeItem(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => onSkipItem(item)}
                  >
                    Free time
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-3xl border border-dashed border-white/20 bg-white/[0.04] px-4 py-4 text-sm font-black text-white"
            onClick={onAddActivity}
          >
            <Plus className="h-5 w-5" />
            Add stop to itinerary
          </button>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-bold text-white">
              <Clock3 className="h-4 w-4 text-blue-300" />
              Save status
            </p>

            <p className="text-sm leading-6 text-zinc-400">
              This plan is saved locally in your browser. Version history and restore
              remain available from Profile.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
