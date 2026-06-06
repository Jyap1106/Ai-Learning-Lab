import { Clock3, MapPin, Navigation, StickyNote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTimelineTime, type TodayTimelineItem } from "@/lib/todayTimeline";

interface TimelineItemCardProps {
  item: TodayTimelineItem;
  isCurrent: boolean;
  isNext: boolean;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onChangeItem: (item: TodayTimelineItem) => void;
  onSkipItem: (item: TodayTimelineItem) => void;
}

function getCategoryLabel(category: TodayTimelineItem["category"]) {
  switch (category) {
    case "food":
      return "Food";
    case "transport":
      return "Transport";
    case "free_time":
      return "Free time";
    default:
      return "Activity";
  }
}

export default function TimelineItemCard({
  item,
  isCurrent,
  isNext,
  onAskAboutItem,
  onChangeItem,
  onSkipItem,
}: TimelineItemCardProps) {
  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-sm transition ${
        isCurrent
          ? "border-blue-300 ring-2 ring-blue-100"
          : isNext
            ? "border-emerald-200"
            : "border-slate-100"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div
            className={`flex min-w-20 flex-col items-center rounded-2xl px-3 py-2 text-center ${
              isCurrent ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-700"
            }`}
          >
            <Clock3 className="mb-1 h-4 w-4" />
            <span className="text-sm font-bold">{formatTimelineTime(item.time)}</span>
            <span className="text-xs">{item.period}</span>
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isCurrent && <Badge variant="default">Now</Badge>}
              {isNext && <Badge variant="secondary">Next</Badge>}
              <Badge variant="outline">{getCategoryLabel(item.category)}</Badge>
            </div>

            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>

            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>{item.location}</span>
              </p>

              <p className="flex gap-2">
                <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>{item.transport}</span>
              </p>

              <p className="flex gap-2">
                <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>{item.remarks}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Button type="button" size="sm" variant="outline" onClick={() => onAskAboutItem(item)}>
            Ask
          </Button>

          <Button type="button" size="sm" variant="secondary" onClick={() => onChangeItem(item)}>
            Replace
          </Button>

          <Button type="button" size="sm" variant="outline" onClick={() => onSkipItem(item)}>
            Free time
          </Button>
        </div>
      </div>
    </article>
  );
}
