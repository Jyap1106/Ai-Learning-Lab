import { CalendarDays, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";

interface Day {
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

interface VamoTripOverviewGridProps {
  days: Day[];
  currentDayNumber: number;
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
}

function getActivityCount(day: Day) {
  return day.morning.length + day.afternoon.length + day.evening.length;
}

function dayMatchesSearch(day: Day, searchValue: string) {
  if (!searchValue.trim()) return true;

  const normalizedSearch = searchValue.toLowerCase();

  return [
    `day ${day.dayNumber}`,
    day.city,
    day.theme,
    ...day.morning,
    ...day.afternoon,
    ...day.evening,
    ...day.food,
    ...day.transport,
    ...day.notes,
  ].some((value) => value.toLowerCase().includes(normalizedSearch));
}

export default function VamoTripOverviewGrid({
  days,
  currentDayNumber,
  selectedDayNumber,
  onSelectDay,
}: VamoTripOverviewGridProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredDays = useMemo(() => {
    return days.filter((day) => dayMatchesSearch(day, searchValue));
  }, [days, searchValue]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
            Full itinerary
          </p>
          <h2 className="mt-1 text-xl font-black text-[var(--vamo-text)]">
            13-day overview
          </h2>
        </div>

        <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
          {filteredDays.length} shown
        </Badge>
      </div>

      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--vamo-muted)]" />

        <input
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search city, food, notes, or activity..."
          className="w-full rounded-full border border-[var(--vamo-border)] bg-[var(--vamo-input)] py-2 pl-9 pr-3 text-sm text-[var(--vamo-text)] outline-none placeholder:text-[var(--vamo-muted)] focus:border-[var(--vamo-primary)]"
        />
      </label>

      <div className="grid gap-3">
        {filteredDays.map((day) => {
          const isCurrent = day.dayNumber === currentDayNumber;
          const isSelected = day.dayNumber === selectedDayNumber;

          return (
            <button
              key={day.dayNumber}
              type="button"
              className={`rounded-3xl border p-4 text-left transition ${
                isSelected
                  ? "border-[var(--vamo-primary)] bg-[var(--vamo-card-strong)]"
                  : "border-[var(--vamo-border)] bg-[var(--vamo-card)]"
              }`}
              onClick={() => onSelectDay(day.dayNumber)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className={isSelected ? "bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)]" : "bg-[var(--vamo-card-strong)] text-[var(--vamo-text)]"}>
                      Day {day.dayNumber}
                    </Badge>

                    {isCurrent && (
                      <Badge variant="outline" className="border-[var(--vamo-success)] text-[var(--vamo-success-text)]">
                        Today
                      </Badge>
                    )}

                    {day.edited && (
                      <Badge variant="outline" className="border-[var(--vamo-warning)] text-[var(--vamo-warning-text)]">
                        Edited
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-[var(--vamo-text)]">
                    {day.city}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
                    {day.theme}
                  </p>
                </div>

                <div className="text-right">
                  <CalendarDays className="ml-auto h-5 w-5 text-[var(--vamo-primary)]" />
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--vamo-muted)]">
                    {getActivityCount(day)} stops
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filteredDays.length === 0 && (
        <div className="rounded-3xl border border-[var(--vamo-warning)] bg-[var(--vamo-warning-soft)] p-4">
          <p className="font-black text-[var(--vamo-warning-text)]">No matching days</p>
          <p className="mt-1 text-sm leading-6 text-[var(--vamo-warning-text)]">
            Try searching another city, activity, food idea, or note.
          </p>
        </div>
      )}
    </section>
  );
}
