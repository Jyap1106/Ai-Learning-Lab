import type { ActivityStatus } from "./activityStatus";

export type TimelineItemCategory =
  | "activity"
  | "food"
  | "transport"
  | "free_time";

export type TimelineItemPeriod = "Morning" | "Afternoon" | "Evening";

export interface TimelineItemModel {
  id: string;
  dayNumber: number;
  period: TimelineItemPeriod;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  title: string;
  location: string;
  transport: string;
  remarks: string;
  category: TimelineItemCategory;
  status: ActivityStatus;
  source: "sample_data" | "manual_edit" | "assistant_suggestion" | "imported";
}

export interface TimelineDayModel {
  dayNumber: number;
  city: string;
  theme: string;
  items: TimelineItemModel[];
  food: string[];
  transport: string[];
  notes: string[];
  edited: boolean;
}

export interface TimelineTripModel {
  tripId: string;
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  days: TimelineDayModel[];
}

export function createTimelineItemId(
  dayNumber: number,
  period: TimelineItemPeriod,
  index: number,
  title: string,
) {
  return `day-${dayNumber}-${period.toLowerCase()}-${index}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}
