import {
  getActivityStatusFromTitle,
  type ActivityStatus,
} from "@/lib/activityStatus";

export interface TimelineSourceDay {
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

export type TimelinePeriod = "Morning" | "Afternoon" | "Evening";

export type TimelineCategory = "activity" | "food" | "transport" | "free_time";

export interface TodayTimelineItem {
  id: string;
  dayNumber: number;
  period: TimelinePeriod;
  time: string;
  endTime: string;
  durationMinutes: number;
  title: string;
  location: string;
  transport: string;
  remarks: string;
  category: TimelineCategory;
  status: ActivityStatus;
  sourceIndex: number;
}

export interface TimelineStatus {
  currentItem: TodayTimelineItem | null;
  nextItem: TodayTimelineItem | null;
  previousItem: TodayTimelineItem | null;
  dayPhase: "before_day" | "during_day" | "after_day" | "empty";
  progressPercent: number;
  minutesUntilNext: number | null;
  minutesLeftInCurrent: number | null;
}

const MORNING_TIMES = ["09:00", "10:30", "12:00"];
const AFTERNOON_TIMES = ["13:30", "15:00", "16:30"];
const EVENING_TIMES = ["18:30", "20:00", "21:00"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function inferCategory(title: string): TimelineCategory {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes("cafe") ||
    normalizedTitle.includes("coffee") ||
    normalizedTitle.includes("tea") ||
    normalizedTitle.includes("dinner") ||
    normalizedTitle.includes("lunch") ||
    normalizedTitle.includes("breakfast") ||
    normalizedTitle.includes("bakery") ||
    normalizedTitle.includes("dessert") ||
    normalizedTitle.includes("food")
  ) {
    return "food";
  }

  if (
    normalizedTitle.includes("train") ||
    normalizedTitle.includes("travel") ||
    normalizedTitle.includes("transfer") ||
    normalizedTitle.includes("tram") ||
    normalizedTitle.includes("bus")
  ) {
    return "transport";
  }

  if (
    normalizedTitle.includes("free") ||
    normalizedTitle.includes("relax") ||
    normalizedTitle.includes("rest")
  ) {
    return "free_time";
  }

  return "activity";
}

function getMinutesFromTime(time: string) {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return 0;
  }

  return hour * 60 + minute;
}

function getTimeFromMinutes(totalMinutes: number) {
  const safeMinutes = Math.max(0, Math.min(totalMinutes, 23 * 60 + 59));
  const hour = Math.floor(safeMinutes / 60);
  const minute = safeMinutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function getMinutesFromDate(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function getDefaultDuration(period: TimelinePeriod, category: TimelineCategory) {
  if (category === "food") return 75;
  if (category === "free_time") return 60;

  switch (period) {
    case "Morning":
      return 90;
    case "Evening":
      return 90;
    default:
      return 75;
  }
}

function buildPeriodItems(
  day: TimelineSourceDay,
  period: TimelinePeriod,
  activities: string[],
  timeSlots: string[],
): TodayTimelineItem[] {
  return activities.map((activity, index) => {
    const safeTitle = activity.trim();
    const category = inferCategory(safeTitle);
    const time = timeSlots[index] ?? timeSlots[timeSlots.length - 1];
    const durationMinutes = getDefaultDuration(period, category);
    const endTime = getTimeFromMinutes(getMinutesFromTime(time) + durationMinutes);

    return {
      id: `day-${day.dayNumber}-${period.toLowerCase()}-${index}-${slugify(safeTitle)}`,
      dayNumber: day.dayNumber,
      period,
      time,
      endTime,
      durationMinutes,
      title: safeTitle,
      location: day.city,
      transport: day.transport[index] ?? day.transport[0] ?? "Verify route live",
      remarks: day.notes[index] ?? day.notes[0] ?? "Verify timing, tickets, and opening hours live",
      category,
      status: getActivityStatusFromTitle(safeTitle),
      sourceIndex: index,
    };
  });
}

export function buildTodayTimeline(day: TimelineSourceDay): TodayTimelineItem[] {
  return [
    ...buildPeriodItems(day, "Morning", day.morning, MORNING_TIMES),
    ...buildPeriodItems(day, "Afternoon", day.afternoon, AFTERNOON_TIMES),
    ...buildPeriodItems(day, "Evening", day.evening, EVENING_TIMES),
  ].sort((a, b) => getMinutesFromTime(a.time) - getMinutesFromTime(b.time));
}

export function getTimelineStatus(
  timelineItems: TodayTimelineItem[],
  now: Date,
): TimelineStatus {
  if (timelineItems.length === 0) {
    return {
      currentItem: null,
      nextItem: null,
      previousItem: null,
      dayPhase: "empty",
      progressPercent: 0,
      minutesUntilNext: null,
      minutesLeftInCurrent: null,
    };
  }

  const currentMinutes = getMinutesFromDate(now);
  const sortedItems = [...timelineItems].sort(
    (a, b) => getMinutesFromTime(a.time) - getMinutesFromTime(b.time),
  );

  const firstItem = sortedItems[0];
  const firstItemMinutes = getMinutesFromTime(firstItem.time);

  if (currentMinutes < firstItemMinutes) {
    return {
      currentItem: null,
      nextItem: firstItem,
      previousItem: null,
      dayPhase: "before_day",
      progressPercent: 0,
      minutesUntilNext: firstItemMinutes - currentMinutes,
      minutesLeftInCurrent: null,
    };
  }

  for (let index = 0; index < sortedItems.length; index += 1) {
    const item = sortedItems[index];
    const nextItem = sortedItems[index + 1] ?? null;
    const previousItem = sortedItems[index - 1] ?? null;
    const itemMinutes = getMinutesFromTime(item.time);
    const itemEndMinutes = getMinutesFromTime(item.endTime);
    const nextItemMinutes = nextItem ? getMinutesFromTime(nextItem.time) : null;

    const isInCurrentWindow =
      currentMinutes >= itemMinutes &&
      currentMinutes < (nextItemMinutes ?? itemEndMinutes + 45);

    if (isInCurrentWindow) {
      const progressPercent = Math.round(((index + 1) / sortedItems.length) * 100);

      return {
        currentItem: item,
        nextItem,
        previousItem,
        dayPhase: nextItem ? "during_day" : "after_day",
        progressPercent,
        minutesUntilNext: nextItemMinutes ? Math.max(nextItemMinutes - currentMinutes, 0) : null,
        minutesLeftInCurrent: Math.max(itemEndMinutes - currentMinutes, 0),
      };
    }
  }

  return {
    currentItem: sortedItems[sortedItems.length - 1],
    nextItem: null,
    previousItem: sortedItems[sortedItems.length - 2] ?? null,
    dayPhase: "after_day",
    progressPercent: 100,
    minutesUntilNext: null,
    minutesLeftInCurrent: null,
  };
}

export function formatTimelineTime(time: string) {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return time;
  }

  return new Date(2026, 0, 1, hour, minute).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatTimelineRange(item: TodayTimelineItem) {
  return `${formatTimelineTime(item.time)} - ${formatTimelineTime(item.endTime)}`;
}

export function formatDuration(minutes: number) {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export function formatDeviceTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
