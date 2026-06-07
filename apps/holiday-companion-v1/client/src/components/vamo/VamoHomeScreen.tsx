import {
  CalendarDays,
  Clock3,
  Edit3,
  MapPin,
  MessageCircle,
  Navigation,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatDeviceTime,
  formatTimelineTime,
  type TimelineStatus,
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
    return timelineItems.slice(Math.max(nextIndex, 0), Math.max(nextIndex, 0) + 3);
  }

  return timelineItems.slice(0, 3);
}

function getProgressPercent(timelineItems: TodayTimelineItem[], timelineStatus: TimelineStatus) {
  if (timelineItems.length === 0) return 0;

  const activeItem = timelineStatus.currentItem ?? timelineStatus.nextItem;

  if (!activeItem) return 100;

  const activeIndex = timelineItems.findIndex((item) => item.id === activeItem.id);

  if (activeIndex < 0) return 0;

  return Math.round(((activeIndex + 1) / timelineItems.length) * 100);
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
      <div className="absolute inset-0 bg-black/25" />
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
}: VamoHomeScreenProps) {
  const activeItem = timelineStatus.currentItem ?? timelineStatus.nextItem;
  const nextItems = getNextItems(timelineItems, timelineStatus);
  const progressPercent = getProgressPercent(timelineItems, timelineStatus);

  return (
    <section className="min-h-screen px-4 pb-8 pt-4">
      <header className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black">
            <Zap className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Vamo</p>
            <p className="text-xs text-zinc-400">{trip.tripName}</p>
          </div>
        </div>

        <div className="h-10 w-10 rounded-full border border-white/15 bg-gradient-to-br from-slate-200 to-slate-500" />
      </header>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
          <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <Clock3 className="h-3.5 w-3.5 text-blue-300" />
            Current time
          </p>
          <p className="text-2xl font-black tracking-tight text-white">
            {formatDeviceTime(now)}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-right">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            {currentDay.city}
          </p>
          <p className="text-2xl font-black tracking-tight text-white">24°C</p>
          <p className="text-xs text-zinc-400">Trip mode</p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Today in {currentDay.city}
        </p>

        <h1 className="mt-1 text-4xl font-black leading-none tracking-tight text-white">
          Day {currentDay.dayNumber}
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {timelineItems.length} activities planned · {getSaveStatusDisplay(trip.saveStatus)}
        </p>
      </div>

      <div className="mb-5 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="relative min-h-64 p-5">
          <GradientImagePlaceholder
            label={getCurrentTitle(timelineStatus)}
            className="absolute inset-0 rounded-none"
          />

          <div className="relative z-10 flex min-h-56 flex-col justify-end">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-500 text-white hover:bg-blue-500">
                Happening now
              </Badge>

              <Badge variant="outline" className="border-white/20 bg-black/40 text-white">
                {progressPercent}% through day
              </Badge>
            </div>

            <h2 className="text-3xl font-black leading-tight text-white">
              {getCurrentTitle(timelineStatus)}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4" />
              {getCurrentLocation(timelineStatus, currentDay.city)}
            </p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-blue-400"
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
          className="rounded-3xl border border-blue-400/40 bg-blue-500 p-4 text-center text-black shadow-lg"
          onClick={onOpenChat}
        >
          <Sparkles className="mx-auto mb-2 h-5 w-5" />
          <span className="text-xs font-black uppercase">Ask Vamo</span>
        </button>

        <button
          type="button"
          className="rounded-3xl border border-white/10 bg-white/10 p-4 text-center text-white"
          onClick={onEditDay}
        >
          <Edit3 className="mx-auto mb-2 h-5 w-5" />
          <span className="text-xs font-black uppercase">Edit Day</span>
        </button>

        <button
          type="button"
          className="rounded-3xl border border-white/10 bg-white/10 p-4 text-center text-white"
          onClick={onShareComingSoon}
        >
          <Share2 className="mx-auto mb-2 h-5 w-5" />
          <span className="text-xs font-black uppercase">Share</span>
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-black text-white">Next Up</h2>

        <button
          type="button"
          className="text-sm font-semibold text-blue-300"
          onClick={onOpenPlanner}
        >
          See all
        </button>
      </div>

      <div className="mb-8 space-y-3">
        {nextItems.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-white/10 bg-white/[0.07] p-4"
          >
            <button
              type="button"
              className="w-full text-left"
              onClick={() => onViewItemDetails(item)}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <Clock3 className="h-5 w-5 text-blue-300" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                    {formatTimelineTime(item.time)}
                  </p>

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

            <div className="mt-3 flex gap-2 pl-14">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                onClick={() => onAskAboutItem(item)}
              >
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
                Free
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
          <Sparkles className="h-4 w-4 text-blue-300" />
          Smart suggestions
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-left"
          onClick={onOpenChat}
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
            Food
          </p>
          <p className="mt-2 text-sm font-black text-white">
            {currentDay.food[0] ?? "Find a nearby cafe"}
          </p>
        </button>

        <button
          type="button"
          className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-left"
          onClick={onOpenChat}
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
            Pace
          </p>
          <p className="mt-2 text-sm font-black text-white">
            Make today lighter
          </p>
        </button>

        <button
          type="button"
          className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-left"
          onClick={onOpenPlanner}
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
            Planner
          </p>
          <p className="mt-2 text-sm font-black text-white">
            View full itinerary
          </p>
        </button>

        <button
          type="button"
          className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-left"
          onClick={onShareComingSoon}
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
            V2
          </p>
          <p className="mt-2 text-sm font-black text-white">
            Share plan soon
          </p>
        </button>
      </div>
    </section>
  );
}
