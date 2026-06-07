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
      return "border-white/10 bg-white/10 text-zinc-200";
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-x-3 bottom-3 mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-white/[0.04] p-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isCurrent && <Badge className="bg-blue-500 text-white hover:bg-blue-500">Now</Badge>}
              {isNext && <Badge className="bg-emerald-500 text-black hover:bg-emerald-500">Next</Badge>}

              <Badge variant="outline" className="border-white/10 bg-white/10 text-zinc-200">
                <Clock3 className="mr-1 h-3 w-3" />
                {formatTimelineRange(item)}
              </Badge>

              <Badge variant="outline" className="border-white/10 bg-white/10 text-zinc-200">
                {getCategoryLabel(item.category)}
              </Badge>

              <Badge variant="outline" className={getStatusClassName(item.status)}>
                {getActivityStatusLabel(item.status)}
              </Badge>
            </div>

            <h2 className="text-xl font-black leading-tight text-white">
              {item.title}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Day {item.dayNumber} · {item.period}
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[72vh] space-y-4 overflow-y-auto bg-black p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-black text-white">
                <MapPin className="h-4 w-4 text-blue-300" />
                Location
              </p>
              <p className="text-sm leading-6 text-zinc-300">{item.location}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-black text-white">
                <Navigation className="h-4 w-4 text-blue-300" />
                Transport
              </p>
              <p className="text-sm leading-6 text-zinc-300">{item.transport}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-black text-white">
                <StickyNote className="h-4 w-4 text-blue-300" />
                Remark
              </p>
              <p className="text-sm leading-6 text-zinc-300">{item.remarks}</p>
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
              className="rounded-full bg-blue-500 text-white hover:bg-blue-400"
              onClick={() => onAskAboutItem(item)}
            >
              <MessageCircle className="h-4 w-4" />
              Ask bot about this
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={() => onReplaceItem(item)}
            >
              <Shuffle className="h-4 w-4" />
              Replace activity
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={() => onKeepFreeTime(item)}
            >
              <Coffee className="h-4 w-4" />
              Keep as free time
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={() => onEditItem(item)}
            >
              <PencilLine className="h-4 w-4" />
              Edit details
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
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
