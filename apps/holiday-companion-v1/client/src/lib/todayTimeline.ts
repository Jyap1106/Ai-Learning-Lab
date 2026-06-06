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
  title: string;
  location: string;
  transport: string;
  remarks: string;
  category: TimelineCategory;
  sourceIndex: number;
}

export interface TimelineStatus {
  currentItem: TodayTimelineItem | null;
  nextItem: TodayTimelineItem | null;
  dayPhase: "before_day" | "during_day" | "after_day" | "empty";
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
    normalizedTitle.includes("tea") ||
    normalizedTitle.includes("dinner") ||
    normalizedTitle.includes("lunch") ||
    normalizedTitle.includes("breakfast") ||
    normalizedTitle.includes("bakery") ||
    normalizedTitle.includes("dessert")
  ) {
    return "food";
  }

  if (
    normalizedTitle.includes("train") ||
    normalizedTitle.includes("travel") ||
    normalizedTitle.includes("transfer")
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

function buildPeriodItems(
  day: TimelineSourceDay,
  period: TimelinePeriod,
  activities: string[],
  timeSlots: string[],
): TodayTimelineItem[] {
  return activities.map((activity, index) => {
    const safeTitle = activity.trim();

    return {
      id: `day-${day.dayNumber}-${period.toLowerCase()}-${index}-${slugify(safeTitle)}`,
      dayNumber: day.dayNumber,
      period,
      time: timeSlots[index] ?? timeSlots[timeSlots.length - 1],
      title: safeTitle,
      location: day.city,
      transport: day.transport[index] ?? day.transport[0] ?? "Verify route live",
      remarks: day.notes[index] ?? day.notes[0] ?? "Verify timing, tickets, and opening hours live",
      category: inferCategory(safeTitle),
      sourceIndex: index,
    };
  });
}

export function buildTodayTimeline(day: TimelineSourceDay): TodayTimelineItem[] {
  return [
    ...buildPeriodItems(day, "Morning", day.morning, MORNING_TIMES),
    ...buildPeriodItems(day, "Afternoon", day.afternoon, AFTERNOON_TIMES),
    ...buildPeriodItems(day, "Evening", day.evening, EVENING_TIMES),
  ];
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

function getMinutesFromDate(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function getTimelineStatus(
  timelineItems: TodayTimelineItem[],
  now: Date,
): TimelineStatus {
  if (timelineItems.length === 0) {
    return {
      currentItem: null,
      nextItem: null,
      dayPhase: "empty",
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
      dayPhase: "before_day",
    };
  }

  for (let index = 0; index < sortedItems.length; index += 1) {
    const item = sortedItems[index];
    const nextItem = sortedItems[index + 1] ?? null;
    const itemMinutes = getMinutesFromTime(item.time);
    const nextItemMinutes = nextItem ? getMinutesFromTime(nextItem.time) : null;

    if (!nextItemMinutes || (currentMinutes >= itemMinutes && currentMinutes < nextItemMinutes)) {
      return {
        currentItem: item,
        nextItem,
        dayPhase: nextItem ? "during_day" : "after_day",
      };
    }
  }

  return {
    currentItem: sortedItems[sortedItems.length - 1],
    nextItem: null,
    dayPhase: "after_day",
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

export function formatDeviceTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
