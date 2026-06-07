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
  formatDuration,
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
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.38),transparent_22%),linear-gradient(135deg,#475569,#111827,#2563eb)] p-5 shadow-[var(--vamo-shadow)]">
      <div className="absolute inset-0 bg-[var(--vamo-hero-overlay)]" />

      <div className="relative z-10 min-h-36">
        <Badge className="bg-white text-black hover:bg-white">Route preview</Badge>

        <div className="absolute bottom-0 left-0 right-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            Planner view
          </p>

          <h2 className="mt-1 text-2xl font-black text-white">
            Day {day.dayNumber} — {day.city}
          </h2>

          <p className="mt-1 text-sm text-white/75">
            {day.morning.length + day.afternoon.length + day.evening.length} stops · map later
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--vamo-muted)]">
            Planner
          </p>
          <h1 className="mt-1 text-2xl font-black text-[var(--vamo-text)]">{trip.tripName}</h1>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card-strong)]"
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
                    ? "border-[var(--vamo-primary)] bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)]"
                    : "border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-text)]"
                }`}
                onClick={() => setSelectedDayNumber(day.dayNumber)}
              >
                <p className="text-xs font-bold uppercase opacity-70">Day</p>
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

          <div className="mb-5 rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:bg-[var(--vamo-primary)]">
                {selectedDay.dayNumber === trip.currentDay ? "Today" : "Trip day"}
              </Badge>

              {selectedDay.edited && (
                <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
                  Edited locally
                </Badge>
              )}
            </div>

            <h2 className="text-2xl font-black text-[var(--vamo-text)]">
              {selectedDay.city}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--vamo-muted)]">
              {selectedDay.theme}
            </p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-[var(--vamo-text)]">Daily timeline</h2>

            <Badge variant="outline" className="border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-muted)]">
              {selectedTimelineItems.length} stops
            </Badge>
          </div>

          <div className="mb-6 space-y-3">
            {selectedTimelineItems.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4"
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => onViewItemDetails(item)}
                >
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--vamo-card-strong)]">
                      <CalendarDays className="h-5 w-5 text-[var(--vamo-primary)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--vamo-primary)]">
                          {formatTimelineTime(item.time)}
                        </p>

                        <ChevronRight className="h-4 w-4 text-[var(--vamo-muted)]" />
                      </div>

                      <h3 className="mt-1 text-lg font-black leading-tight text-[var(--vamo-text)]">
                        {item.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-2 text-sm text-[var(--vamo-muted)]">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </p>

                      <p className="mt-1 text-xs text-[var(--vamo-muted)]">
                        {formatDuration(item.durationMinutes)}
                      </p>
                    </div>
                  </div>
                </button>

                <div className="mt-3 flex flex-wrap gap-2 pl-14">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                    onClick={() => onAskAboutItem(item)}
                  >
                    <Navigation className="h-4 w-4" />
                    Ask
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                    onClick={() => onChangeItem(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
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
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-3xl border border-dashed border-[var(--vamo-border-strong)] bg-[var(--vamo-card-soft)] px-4 py-4 text-sm font-black text-[var(--vamo-text)]"
            onClick={onAddActivity}
          >
            <Plus className="h-5 w-5" />
            Add stop to itinerary
          </button>

          <div className="rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-bold text-[var(--vamo-text)]">
              <Clock3 className="h-4 w-4 text-[var(--vamo-primary)]" />
              Save status
            </p>

            <p className="text-sm leading-6 text-[var(--vamo-muted)]">
              This plan is saved locally in your browser. Version history and restore
              remain available from Profile.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
