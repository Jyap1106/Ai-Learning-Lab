import {
  Clock3,
  Edit3,
  MapPin,
  Share2,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatDeviceTime,
  formatDuration,
  formatTimelineRange,
  formatTimelineTime,
  type TimelineStatus,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

import VamoSuggestionCards from "./VamoSuggestionCards";

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

interface VamoHomeScreenProps {
  trip: ItineraryState;
  currentDay: Day;
  now: Date;
  timelineItems: TodayTimelineItem[];
  timelineStatus: TimelineStatus;
  onOpenChat: () => void;
  onOpenPlanner: () => void;
  onShareComingSoon: () => void;
  onEditDay: () => void;
  onViewItemDetails: (item: TodayTimelineItem) => void;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onChangeItem: (item: TodayTimelineItem) => void;
  onSkipItem: (item: TodayTimelineItem) => void;
  onPromptClick: (prompt: string) => void;
}

function getSaveStatusDisplay(status: string) {
  switch (status) {
    case "saved_locally":
      return "Saved locally";
    case "using_sample_data":
      return "Sample trip";
    case "awaiting_confirmation":
      return "Reviewing change";
    default:
      return status.replace(/_/g, " ");
  }
}

function getCompactTime(date: Date) {
  return formatDeviceTime(date).replace(/\s/g, "").toLowerCase();
}

function getCurrentTitle(timelineStatus: TimelineStatus) {
  if (timelineStatus.currentItem) {
    return timelineStatus.currentItem.title;
  }

  if (timelineStatus.dayPhase === "before_day") {
    return "Before first planned stop";
  }

  if (timelineStatus.dayPhase === "after_day") {
    return "Planned day complete";
  }

  return "No current activity";
}

function getCurrentLocation(timelineStatus: TimelineStatus, fallbackCity: string) {
  return timelineStatus.currentItem?.location ?? timelineStatus.nextItem?.location ?? fallbackCity;
}

function getNextItems(timelineItems: TodayTimelineItem[], timelineStatus: TimelineStatus) {
  if (timelineStatus.nextItem) {
    const nextIndex = timelineItems.findIndex((item) => item.id === timelineStatus.nextItem?.id);
    return timelineItems.slice(Math.max(nextIndex, 0), Math.max(nextIndex, 0) + 4);
  }

  return timelineItems.slice(0, 4);
}

function GradientImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.38),transparent_26%),linear-gradient(135deg,#60a5fa,#7c3aed,#f97316)] ${className}`}
    >
      <div className="absolute inset-0 bg-[var(--vamo-hero-overlay)]" />

      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
          Vamo visual
        </p>

        <p className="mt-1 text-lg font-bold text-white">{label}</p>
      </div>
    </div>
  );
}

export default function VamoHomeScreen({
  trip,
  currentDay,
  now,
  timelineItems,
  timelineStatus,
  onOpenChat,
  onOpenPlanner,
  onShareComingSoon,
  onEditDay,
  onViewItemDetails,
  onAskAboutItem,
  onChangeItem,
  onSkipItem,
  onPromptClick,
}: VamoHomeScreenProps) {
  const activeItem = timelineStatus.currentItem ?? timelineStatus.nextItem;
  const nextItems = getNextItems(timelineItems, timelineStatus);
  const progressPercent = timelineStatus.progressPercent;

  return (
    <section className="min-h-screen px-4 pb-8 pt-4">
      <header className="mb-4 grid grid-cols-3 items-start">
        <div>
          <p className="text-xl font-black leading-none text-[var(--vamo-text)]">Vamo</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
            Trip guide
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm font-black leading-none text-[var(--vamo-text)]">Austria</p>
          <p className="mt-1 text-xs font-semibold text-[var(--vamo-muted)]">{currentDay.city}</p>
          <p className="mt-1 text-sm font-black text-[var(--vamo-text)]">24°C</p>
        </div>

        <p className="text-right text-sm font-black text-[var(--vamo-text)]">
          {getCompactTime(now)}
        </p>
      </header>

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--vamo-muted)]">
          Today in {currentDay.city}
        </p>

        <div className="mt-1 flex items-end justify-between gap-3">
          <h1 className="text-4xl font-black leading-none tracking-tight text-[var(--vamo-text)]">
            Day {currentDay.dayNumber}
          </h1>

          <Badge variant="outline" className="border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-muted)]">
            {getSaveStatusDisplay(trip.saveStatus)}
          </Badge>
        </div>

        <p className="mt-2 text-sm leading-6 text-[var(--vamo-muted)]">
          {timelineItems.length} activities planned · {currentDay.theme}
        </p>
      </div>

      <div className="mb-5 overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] shadow-[var(--vamo-shadow)]">
        <div className="relative min-h-64 p-5">
          <GradientImagePlaceholder
            label={getCurrentTitle(timelineStatus)}
            className="absolute inset-0 rounded-none"
          />

          <div className="relative z-10 flex min-h-56 flex-col justify-end">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:bg-[var(--vamo-primary)]">
                Happening now
              </Badge>

              <Badge variant="outline" className="border-white/20 bg-black/40 text-white">
                {progressPercent}% through day
              </Badge>

              {timelineStatus.minutesLeftInCurrent !== null && (
                <Badge variant="outline" className="border-white/20 bg-black/40 text-white">
                  {formatDuration(timelineStatus.minutesLeftInCurrent)} left
                </Badge>
              )}
            </div>

            <h2 className="text-3xl font-black leading-tight text-white">
              {getCurrentTitle(timelineStatus)}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4" />
              {getCurrentLocation(timelineStatus, currentDay.city)}
            </p>

            {activeItem && (
              <p className="mt-1 flex items-center gap-2 text-sm text-white/70">
                <Clock3 className="h-4 w-4" />
                {formatTimelineRange(activeItem)}
              </p>
            )}

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-[var(--vamo-primary)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-4 flex gap-2">
              {activeItem && (
                <Button
                  type="button"
                  className="flex-1 rounded-full bg-white text-black hover:bg-zinc-200"
                  onClick={() => onViewItemDetails(activeItem)}
                >
                  View details
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                className="rounded-full border-white/20 bg-black/30 text-white hover:bg-white/10 hover:text-white"
                onClick={onOpenPlanner}
              >
                Full view
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-7 grid grid-cols-3 gap-3">
        <button
          type="button"
          className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-primary)] p-4 text-center text-[var(--vamo-primary-text)] shadow-lg"
          onClick={onOpenChat}
        >
          <Sparkles className="mx-auto mb-2 h-5 w-5" />
          <span className="text-xs font-black uppercase">Ask Vamo</span>
        </button>

        <button
          type="button"
          className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 text-center text-[var(--vamo-text)]"
          onClick={onEditDay}
        >
          <Edit3 className="mx-auto mb-2 h-5 w-5" />
          <span className="text-xs font-black uppercase">Edit Day</span>
        </button>

        <button
          type="button"
          className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 text-center text-[var(--vamo-text)]"
          onClick={onShareComingSoon}
        >
          <Share2 className="mx-auto mb-2 h-5 w-5" />
          <span className="text-xs font-black uppercase">Share</span>
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-black text-[var(--vamo-text)]">Next Up</h2>

        <button
          type="button"
          className="text-sm font-semibold text-[var(--vamo-primary)]"
          onClick={onOpenPlanner}
        >
          See all
        </button>
      </div>

      <div className="mb-8 space-y-3">
        {nextItems.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4"
          >
            <button
              type="button"
              className="w-full text-left"
              onClick={() => onViewItemDetails(item)}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--vamo-card-strong)]">
                  <Clock3 className="h-5 w-5 text-[var(--vamo-primary)]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--vamo-primary)]">
                    {formatTimelineTime(item.time)}
                  </p>

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

            <div className="mt-3 flex gap-2 pl-14">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                onClick={() => onAskAboutItem(item)}
              >
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
                Free
              </Button>
            </div>
          </article>
        ))}
      </div>

      <VamoSuggestionCards
        currentDay={currentDay}
        onOpenPlanner={onOpenPlanner}
        onAskSuggestion={onPromptClick}
      />
    </section>
  );
}
