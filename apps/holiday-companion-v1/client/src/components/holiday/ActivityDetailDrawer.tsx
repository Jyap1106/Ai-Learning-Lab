import {
  ArrowRightLeft,
  Ban,
  CheckCircle2,
  Clock3,
  Coffee,
  MapPin,
  MessageCircle,
  Navigation,
  PencilLine,
  Shuffle,
  StickyNote,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getActivityStatusLabel,
  getActivityStatusTone,
} from "@/lib/activityStatus";
import {
  formatTimelineRange,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

interface ActivityDetailDrawerProps {
  item: TodayTimelineItem | null;
  isOpen: boolean;
  isCurrent?: boolean;
  isNext?: boolean;
  onClose: () => void;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onReplaceItem: (item: TodayTimelineItem) => void;
  onKeepFreeTime: (item: TodayTimelineItem) => void;
  onEditItem: (item: TodayTimelineItem) => void;
  onMoveItem: (item: TodayTimelineItem) => void;
  onMarkDone?: (item: TodayTimelineItem) => void;
  onSkipItem?: (item: TodayTimelineItem) => void;
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

function getStatusClassName(status: TodayTimelineItem["status"]) {
  const tone = getActivityStatusTone(status);

  switch (tone) {
    case "green":
      return "border-green-400/30 bg-green-400/15 text-green-100";
    case "red":
      return "border-red-400/30 bg-red-400/15 text-red-100";
    case "violet":
      return "border-violet-400/30 bg-violet-400/15 text-violet-100";
    case "blue":
      return "border-blue-400/30 bg-blue-400/15 text-blue-100";
    case "orange":
      return "border-orange-400/30 bg-orange-400/15 text-orange-100";
    default:
      return "border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-muted)]";
  }
}

export default function ActivityDetailDrawer({
  item,
  isOpen,
  isCurrent = false,
  isNext = false,
  onClose,
  onAskAboutItem,
  onReplaceItem,
  onKeepFreeTime,
  onEditItem,
  onMoveItem,
  onMarkDone,
  onSkipItem,
}: ActivityDetailDrawerProps) {
  if (!isOpen || !item) {
    return null;
  }

  return (
    <section className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[var(--vamo-overlay)] backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-x-3 bottom-3 mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-bg)] text-[var(--vamo-text)] shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isCurrent && (
                <Badge className="bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:bg-[var(--vamo-primary)]">
                  Now
                </Badge>
              )}

              {isNext && (
                <Badge className="bg-[var(--vamo-success)] text-black hover:bg-[var(--vamo-success)]">
                  Next
                </Badge>
              )}

              <Badge variant="outline" className="border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-muted)]">
                <Clock3 className="mr-1 h-3 w-3" />
                {formatTimelineRange(item)}
              </Badge>

              <Badge variant="outline" className="border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-muted)]">
                {getCategoryLabel(item.category)}
              </Badge>

              <Badge variant="outline" className={getStatusClassName(item.status)}>
                {getActivityStatusLabel(item.status)}
              </Badge>
            </div>

            <h2 className="text-xl font-black leading-tight text-[var(--vamo-text)]">
              {item.title}
            </h2>

            <p className="mt-1 text-sm text-[var(--vamo-muted)]">
              Day {item.dayNumber} · {item.period}
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[72vh] space-y-4 overflow-y-auto bg-[var(--vamo-bg)] p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
                <MapPin className="h-4 w-4 text-[var(--vamo-primary)]" />
                Location
              </p>
              <p className="text-sm leading-6 text-[var(--vamo-muted)]">{item.location}</p>
            </div>

            <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
                <Navigation className="h-4 w-4 text-[var(--vamo-primary)]" />
                Transport
              </p>
              <p className="text-sm leading-6 text-[var(--vamo-muted)]">{item.transport}</p>
            </div>

            <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
                <StickyNote className="h-4 w-4 text-[var(--vamo-primary)]" />
                Remark
              </p>
              <p className="text-sm leading-6 text-[var(--vamo-muted)]">{item.remarks}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-4">
            <p className="text-sm font-black text-blue-100">Quick decision</p>
            <p className="mt-1 text-sm leading-6 text-blue-100/80">
              Use these actions when your timing changes, you are tired, or you want
              Vamo to explain this stop.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              type="button"
              className="rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
              onClick={() => onAskAboutItem(item)}
            >
              <MessageCircle className="h-4 w-4" />
              Ask bot about this
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
              onClick={() => onReplaceItem(item)}
            >
              <Shuffle className="h-4 w-4" />
              Replace activity
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
              onClick={() => onKeepFreeTime(item)}
            >
              <Coffee className="h-4 w-4" />
              Keep as free time
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
              onClick={() => onEditItem(item)}
            >
              <PencilLine className="h-4 w-4" />
              Edit details
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
              onClick={() => onMoveItem(item)}
            >
              <ArrowRightLeft className="h-4 w-4" />
              Move activity
            </Button>

            {onMarkDone && (
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-green-300/20 bg-green-400/10 text-green-100 hover:bg-green-400/20 hover:text-green-50"
                onClick={() => onMarkDone(item)}
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark done
              </Button>
            )}

            {onSkipItem && (
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-red-300/20 bg-red-400/10 text-red-100 hover:bg-red-400/20 hover:text-red-50"
                onClick={() => onSkipItem(item)}
              >
                <Ban className="h-4 w-4" />
                Skip this
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
