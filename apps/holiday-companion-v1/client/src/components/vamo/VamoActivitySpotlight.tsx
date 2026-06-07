import { Clock3, Coffee, MapPin, MessageCircle, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  formatDuration,
  formatTimelineRange,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

interface Day {
  dayNumber: number;
  city: string;
}

interface VamoActivitySpotlightProps {
  day: Day;
  item?: TodayTimelineItem;
  onViewDetails: (item: TodayTimelineItem) => void;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onChangeItem: (item: TodayTimelineItem) => void;
  onSkipItem: (item: TodayTimelineItem) => void;
}

export default function VamoActivitySpotlight({
  day,
  item,
  onViewDetails,
  onAskAboutItem,
  onChangeItem,
  onSkipItem,
}: VamoActivitySpotlightProps) {
  if (!item) {
    return (
      <section className="rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-5">
        <p className="font-black text-[var(--vamo-text)]">No selected activity</p>
        <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
          Select an activity from the timeline to view details.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] shadow-[var(--vamo-shadow)]">
      <div className="relative min-h-40 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.38),transparent_26%),linear-gradient(135deg,#60a5fa,#7c3aed,#f97316)]">
        <div className="absolute inset-0 bg-[var(--vamo-hero-overlay)]" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
            Activity detail
          </p>

          <h2 className="mt-1 text-2xl font-black leading-tight text-white">
            {item.title}
          </h2>

          <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
            <MapPin className="h-4 w-4" />
            {item.location || day.city}
          </p>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] p-4">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
              <Clock3 className="h-4 w-4 text-[var(--vamo-primary)]" />
              Time
            </p>
            <p className="mt-2 text-sm font-black text-[var(--vamo-text)]">
              {formatTimelineRange(item)}
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
              Duration
            </p>
            <p className="mt-2 text-sm font-black text-[var(--vamo-text)]">
              {formatDuration(item.durationMinutes)}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
            Notes
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--vamo-muted-strong)]">
            {item.remarks}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            className="rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
            onClick={() => onViewDetails(item)}
          >
            View details
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={() => onAskAboutItem(item)}
          >
            <MessageCircle className="h-4 w-4" />
            Ask
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={() => onChangeItem(item)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[var(--vamo-warning)] bg-[var(--vamo-warning-soft)] text-[var(--vamo-warning-text)] hover:bg-[var(--vamo-warning-soft)]"
            onClick={() => onSkipItem(item)}
          >
            <Coffee className="h-4 w-4" />
            Free time
          </Button>
        </div>
      </div>
    </section>
  );
}
