import { CalendarDays, Map, MapPin, Share2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDuration, type TodayTimelineItem } from "@/lib/todayTimeline";

interface Day {
  dayNumber: number;
  city: string;
  theme: string;
  edited: boolean;
}

interface VamoRoutePreviewCardProps {
  day: Day;
  timelineItems: TodayTimelineItem[];
  currentDayNumber: number;
  onShareComingSoon: () => void;
}

function getTotalDuration(timelineItems: TodayTimelineItem[]) {
  return timelineItems.reduce((total, item) => total + item.durationMinutes, 0);
}

export default function VamoRoutePreviewCard({
  day,
  timelineItems,
  currentDayNumber,
  onShareComingSoon,
}: VamoRoutePreviewCardProps) {
  const totalDuration = getTotalDuration(timelineItems);
  const isToday = day.dayNumber === currentDayNumber;

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.38),transparent_22%),linear-gradient(135deg,#475569,#111827,#2563eb)] p-5 shadow-[var(--vamo-shadow)]">
      <div className="absolute inset-0 bg-[var(--vamo-hero-overlay)]" />

      <div className="relative z-10">
        <div className="mb-12 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white text-black hover:bg-white">
              {isToday ? "Today" : "Trip day"}
            </Badge>

            {day.edited && (
              <Badge className="bg-[var(--vamo-warning)] text-[var(--vamo-text-inverse)] hover:bg-[var(--vamo-warning)]">
                Edited
              </Badge>
            )}
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full border-white/20 bg-black/30 text-white hover:bg-white/10 hover:text-white"
            onClick={onShareComingSoon}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/70">
            <Map className="h-4 w-4" />
            Route preview
          </p>

          <h2 className="mt-2 text-3xl font-black leading-tight text-white">
            Day {day.dayNumber} — {day.city}
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/75">
            {day.theme}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-black/30 p-3">
              <p className="text-lg font-black text-white">{timelineItems.length}</p>
              <p className="text-xs text-white/70">Stops</p>
            </div>

            <div className="rounded-2xl bg-black/30 p-3">
              <p className="text-lg font-black text-white">
                {totalDuration > 0 ? formatDuration(totalDuration) : "—"}
              </p>
              <p className="text-xs text-white/70">Planned</p>
            </div>

            <div className="rounded-2xl bg-black/30 p-3">
              <p className="text-lg font-black text-white">
                {isToday ? "Live" : "Plan"}
              </p>
              <p className="text-xs text-white/70">Mode</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <MapPin className="h-4 w-4" />
            Base area: {day.city}
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-full bg-white px-4 py-3 text-sm font-black text-black"
            onClick={onShareComingSoon}
          >
            View full map later
          </button>
        </div>
      </div>
    </section>
  );
}
