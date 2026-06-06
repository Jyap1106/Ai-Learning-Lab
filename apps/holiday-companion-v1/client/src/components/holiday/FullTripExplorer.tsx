import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ListChecks,
  MapPin,
  Navigation,
  Search,
  StickyNote,
  Utensils,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface FullTripExplorerProps {
  days: Day[];
  currentDayNumber: number;
}

function includesSearchValue(value: string, searchValue: string) {
  return value.toLowerCase().includes(searchValue.toLowerCase());
}

function dayMatchesSearch(day: Day, searchValue: string) {
  if (!searchValue.trim()) return true;

  const searchableValues = [
    `day ${day.dayNumber}`,
    day.city,
    day.theme,
    ...day.morning,
    ...day.afternoon,
    ...day.evening,
    ...day.food,
    ...day.transport,
    ...day.notes,
  ];

  return searchableValues.some((value) => includesSearchValue(value, searchValue));
}

function getActivityCount(day: Day) {
  return day.morning.length + day.afternoon.length + day.evening.length;
}

function DetailList({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="text-blue-600">{icon}</div>
        <h4 className="font-semibold text-slate-950">{title}</h4>
        <Badge variant="outline" className="ml-auto">
          {items.length}
        </Badge>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={`${title}-${item}-${index}`}
              className="rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
          No items listed.
        </p>
      )}
    </div>
  );
}

export default function FullTripExplorer({
  days,
  currentDayNumber,
}: FullTripExplorerProps) {
  const [searchValue, setSearchValue] = useState("");
  const [expandedDayNumbers, setExpandedDayNumbers] = useState<number[]>([
    currentDayNumber,
  ]);

  const filteredDays = useMemo(() => {
    return days.filter((day) => dayMatchesSearch(day, searchValue));
  }, [days, searchValue]);

  const allFilteredDaysExpanded =
    filteredDays.length > 0 &&
    filteredDays.every((day) => expandedDayNumbers.includes(day.dayNumber));

  const toggleDay = (dayNumber: number) => {
    setExpandedDayNumbers((previousDayNumbers) =>
      previousDayNumbers.includes(dayNumber)
        ? previousDayNumbers.filter((number) => number !== dayNumber)
        : [...previousDayNumbers, dayNumber],
    );
  };

  const expandAllFilteredDays = () => {
    setExpandedDayNumbers((previousDayNumbers) =>
      Array.from(
        new Set([
          ...previousDayNumbers,
          ...filteredDays.map((day) => day.dayNumber),
        ]),
      ),
    );
  };

  const collapseAllFilteredDays = () => {
    setExpandedDayNumbers((previousDayNumbers) =>
      previousDayNumbers.filter(
        (dayNumber) =>
          !filteredDays.some((filteredDay) => filteredDay.dayNumber === dayNumber),
      ),
    );
  };

  const handleExpandCollapseAll = () => {
    if (allFilteredDaysExpanded) {
      collapseAllFilteredDays();
      return;
    }

    expandAllFilteredDays();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-blue-800">
              <CalendarDays className="h-4 w-4" />
              Full trip explorer
            </p>

            <h3 className="text-xl font-bold text-slate-950">
              13-day Austria itinerary
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              Review every day of the trip without touching the protected original
              itinerary file.
            </p>
          </div>

          <Badge variant="secondary">
            {days.length} day{days.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search city, activity, food, transport, or notes..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
            />
          </label>

          <Button
            type="button"
            variant="outline"
            onClick={handleExpandCollapseAll}
            disabled={filteredDays.length === 0}
          >
            {allFilteredDaysExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {allFilteredDaysExpanded ? "Collapse all" : "Expand all"}
          </Button>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Showing {filteredDays.length} of {days.length} day
          {days.length !== 1 ? "s" : ""}.
        </p>
      </div>

      {filteredDays.length > 0 ? (
        <div className="space-y-3">
          {filteredDays.map((day) => {
            const isExpanded = expandedDayNumbers.includes(day.dayNumber);
            const isToday = day.dayNumber === currentDayNumber;

            return (
              <article
                key={day.dayNumber}
                className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${
                  isToday ? "border-blue-300 ring-2 ring-blue-100" : "border-slate-100"
                }`}
              >
                <button
                  type="button"
                  className="w-full p-4 text-left"
                  onClick={() => toggleDay(day.dayNumber)}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant={isToday ? "default" : "secondary"}>
                          Day {day.dayNumber}
                        </Badge>

                        {isToday && <Badge variant="outline">Today</Badge>}
                        {day.edited && <Badge variant="secondary">Edited</Badge>}

                        <Badge variant="outline">
                          {getActivityCount(day)} planned item
                          {getActivityCount(day) !== 1 ? "s" : ""}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-slate-950">
                        {day.city}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {day.theme}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          Hide details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          View details
                        </>
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50 p-4">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <DetailList
                        title="Morning"
                        icon={<ListChecks className="h-4 w-4" />}
                        items={day.morning}
                      />

                      <DetailList
                        title="Afternoon"
                        icon={<ListChecks className="h-4 w-4" />}
                        items={day.afternoon}
                      />

                      <DetailList
                        title="Evening"
                        icon={<ListChecks className="h-4 w-4" />}
                        items={day.evening}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <DetailList
                        title="Food"
                        icon={<Utensils className="h-4 w-4" />}
                        items={day.food}
                      />

                      <DetailList
                        title="Transport"
                        icon={<Navigation className="h-4 w-4" />}
                        items={day.transport}
                      />

                      <DetailList
                        title="Notes"
                        icon={<StickyNote className="h-4 w-4" />}
                        items={day.notes}
                      />
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
                      <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        Base location
                      </p>

                      <p className="text-sm leading-6 text-slate-600">
                        {day.city}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
          <p className="font-semibold text-orange-900">No matching days found.</p>
          <p className="mt-1 text-sm leading-6 text-orange-800">
            Try searching for another city, activity, food idea, transport note, or
            day number.
          </p>
        </div>
      )}
    </div>
  );
}
