export interface ItineraryDayLike {
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

export type ItineraryPeriodField = "morning" | "afternoon" | "evening";

export function appendUnique(items: string[], item: string) {
  if (items.includes(item)) {
    return items;
  }

  return [...items, item];
}

export function updateArrayAtIndex(items: string[], index: number, value: string) {
  const nextItems = [...items];

  while (nextItems.length <= index) {
    nextItems.push("");
  }

  nextItems[index] = value;

  return nextItems.filter((item) => item.trim().length > 0);
}

export function removeArrayAtIndex(items: string[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

export function cloneItineraryDays<TDay extends ItineraryDayLike>(days: TDay[]) {
  return days.map((day) => ({
    ...day,
    morning: [...day.morning],
    afternoon: [...day.afternoon],
    evening: [...day.evening],
    food: [...day.food],
    transport: [...day.transport],
    notes: [...day.notes],
  }));
}

export function markDayEdited<TDay extends ItineraryDayLike>(day: TDay): TDay {
  return {
    ...day,
    edited: true,
  };
}
