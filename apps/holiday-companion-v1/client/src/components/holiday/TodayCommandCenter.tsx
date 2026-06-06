import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatDeviceTime,
  formatTimelineTime,
  type TimelineStatus,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

interface DaySummary {
  dayNumber: number;
  city: string;
  theme: string;
  edited: boolean;
}

interface TodayCommandCenterProps {
  tripName: string;
  day: DaySummary;
  now: Date;
  timelineStatus: TimelineStatus;
  saveStatus: string;
  isMinimized: boolean;
  onToggleMinimized: () => void;
  onPromptClick: (prompt: string) => void;
  onOpenChat: () => void;
  onOpenTools: () => void;
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
    case "rejected":
      return "Change rejected";
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
    return "Planned day is mostly complete";
  }

  return "No current activity";
}

function getNextTitle(timelineStatus: TimelineStatus) {
  if (timelineStatus.nextItem) {
    return `${formatTimelineTime(timelineStatus.nextItem.time)} · ${
      timelineStatus.nextItem.title
    }`;
  }

  if (timelineStatus.dayPhase === "after_day") {
    return "No more planned activities";
  }

  return "No next activity found";
}

export default function TodayCommandCenter({
  tripName,
  day,
  now,
  timelineStatus,
  saveStatus,
  isMinimized,
  onToggleMinimized,
  onPromptClick,
  onOpenChat,
  onOpenTools,
  onChangeItem,
  onSkipItem,
}: TodayCommandCenterProps) {
  const activeItem = timelineStatus.currentItem ?? timelineStatus.nextItem;

  const handleAskNow = () => {
    onOpenChat();
    onPromptClick("What should I do now?");
  };

  const handleRunningLate = () => {
    onOpenChat();
    onPromptClick("I'm running late. What should I skip or adjust?");
  };

  if (isMinimized) {
    return (
      <Card className="sticky top-2 z-30 overflow-hidden border-blue-100 bg-white/95 shadow-lg backdrop-blur">
        <CardContent className="p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Day {day.dayNumber}</Badge>

                <Badge variant="outline">
                  <Clock3 className="mr-1 h-3 w-3" />
                  {formatDeviceTime(now)}
                </Badge>

                {day.edited && <Badge variant="default">Edited</Badge>}
              </div>

              <p className="truncate text-sm font-semibold text-slate-950">
                Now: {getCurrentTitle(timelineStatus)}
              </p>

              <p className="truncate text-xs text-slate-500">
                Next: {getNextTitle(timelineStatus)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:shrink-0">
              <Button type="button" size="sm" variant="outline" onClick={handleAskNow}>
                <MessageCircle className="h-4 w-4" />
                Ask
              </Button>

              <Button type="button" size="sm" variant="outline" onClick={onOpenTools}>
                <SlidersHorizontal className="h-4 w-4" />
                Tools
              </Button>

              <Button type="button" size="sm" onClick={onToggleMinimized}>
                <ChevronDown className="h-4 w-4" />
                Expand
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-2 z-30 overflow-hidden border-blue-100 bg-white/95 shadow-lg backdrop-blur">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                <CalendarDays className="mr-1 h-3 w-3" />
                Day {day.dayNumber}
              </Badge>

              <Badge variant="outline">
                <Clock3 className="mr-1 h-3 w-3" />
                {formatDeviceTime(now)}
              </Badge>

              {day.edited && <Badge variant="default">Edited locally</Badge>}
            </div>

            <p className="text-sm font-medium text-slate-500">{tripName}</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Today in {day.city}
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-600">{day.theme}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onOpenTools}>
              <SlidersHorizontal className="h-4 w-4" />
              Trip tools
            </Button>

            <Button type="button" variant="secondary" size="sm" onClick={onToggleMinimized}>
              <ChevronUp className="h-4 w-4" />
              Minimize
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Now
            </p>
            <p className="text-lg font-bold text-slate-950">
              {getCurrentTitle(timelineStatus)}
            </p>

            {timelineStatus.currentItem && (
              <p className="mt-1 text-sm text-slate-600">
                Started around {formatTimelineTime(timelineStatus.currentItem.time)}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              <Navigation className="h-3.5 w-3.5" />
              Coming up
            </p>
            <p className="text-lg font-bold text-slate-950">{getNextTitle(timelineStatus)}</p>

            {timelineStatus.nextItem && (
              <p className="mt-1 text-sm text-slate-600">
                Transport: {timelineStatus.nextItem.transport}
              </p>
            )}
          </div>
        </div>

        {activeItem && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold text-slate-900">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Location
                </p>
                <p className="text-slate-600">{activeItem.location}</p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold text-slate-900">
                  <Navigation className="h-4 w-4 text-blue-600" />
                  Transport
                </p>
                <p className="text-slate-600">{activeItem.transport}</p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              <span className="font-semibold text-slate-900">Remark:</span>{" "}
              {activeItem.remarks}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={handleAskNow}>
            <MessageCircle className="h-4 w-4" />
            What now?
          </Button>

          <Button type="button" size="sm" variant="secondary" onClick={handleRunningLate}>
            I&apos;m running late
          </Button>

          {activeItem && (
            <>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onChangeItem(activeItem)}
              >
                Replace current
              </Button>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onSkipItem(activeItem)}
              >
                Keep free time
              </Button>
            </>
          )}

          <Badge variant="outline" className="ml-auto">
            {getSaveStatusDisplay(saveStatus)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
