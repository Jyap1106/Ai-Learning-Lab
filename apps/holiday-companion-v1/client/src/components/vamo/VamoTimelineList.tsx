import { Coffee, MapPin, MessageCircle, Navigation, Pencil, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  formatDuration,
  formatTimelineTime,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

interface VamoTimelineListProps {
  timelineItems: TodayTimelineItem[];
  selectedItemId?: string;
  onSelectItem: (item: TodayTimelineItem) => void;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onChangeItem: (item: TodayTimelineItem) => void;
  onSkipItem: (item: TodayTimelineItem) => void;
  onShareComingSoon: () => void;
}

function getTimelineDotClassName(isSelected: boolean) {
  if (isSelected) {
    return "border-[var(--vamo-primary)] bg-[var(--vamo-primary)]";
  }

  return "border-[var(--vamo-border-strong)] bg-[var(--vamo-bg)]";
}

export default function VamoTimelineList({
  timelineItems,
  selectedItemId,
  onSelectItem,
  onAskAboutItem,
  onChangeItem,
  onSkipItem,
  onShareComingSoon,
}: VamoTimelineListProps) {
  if (timelineItems.length === 0) {
    return (
      <section className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-5">
        <p className="font-black text-[var(--vamo-text)]">No timeline items</p>
        <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
          Add a stop to start planning this day.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[var(--vamo-text)]">Today&apos;s timeline</h2>

        <p className="text-xs font-semibold text-[var(--vamo-muted)]">
          {timelineItems.length} stops
        </p>
      </div>

      <div className="relative space-y-3 pl-8">
        <div className="absolute bottom-6 left-3.5 top-6 w-px bg-[var(--vamo-border-strong)]" />

        {timelineItems.map((item) => {
          const isSelected = item.id === selectedItemId;

          return (
            <article key={item.id} className="relative">
              <span
                className={`absolute -left-8 top-5 h-4 w-4 rounded-full border-2 ${getTimelineDotClassName(
                  isSelected,
                )}`}
              />

              <button
                type="button"
                className={`w-full rounded-3xl border p-4 text-left transition ${
                  isSelected
                    ? "border-[var(--vamo-primary)] bg-[var(--vamo-card-strong)]"
                    : "border-[var(--vamo-border)] bg-[var(--vamo-card)]"
                }`}
                onClick={() => onSelectItem(item)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--vamo-primary)]">
                      {formatTimelineTime(item.time)}
                    </p>

                    <h3 className="mt-1 text-lg font-black leading-tight text-[var(--vamo-text)]">
                      {item.title}
                    </h3>

                    <p className="mt-1 flex items-center gap-2 text-sm text-[var(--vamo-muted)]">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </p>
                  </div>

                  <p className="shrink-0 rounded-full bg-[var(--vamo-card-soft)] px-3 py-1 text-xs font-black text-[var(--vamo-muted-strong)]">
                    {formatDuration(item.durationMinutes)}
                  </p>
                </div>
              </button>

              <div className="mt-2 flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                  onClick={() => onAskAboutItem(item)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                  onClick={() => onChangeItem(item)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                  onClick={() => onSkipItem(item)}
                >
                  <Coffee className="h-4 w-4" />
                  Free
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                  onClick={onShareComingSoon}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
                  onClick={() => onSelectItem(item)}
                >
                  <Navigation className="h-4 w-4" />
                  Details
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
