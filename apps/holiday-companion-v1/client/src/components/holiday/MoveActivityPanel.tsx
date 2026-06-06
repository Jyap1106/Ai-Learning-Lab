import { ArrowRightLeft, CheckCircle2, Clock3, MapPin, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatTimelineTime,
  type TimelinePeriod,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

interface AvailableDay {
  dayNumber: number;
  city: string;
  theme?: string;
}

export interface MoveActivityDraft {
  itemId: string;
  currentDayNumber: number;
  targetDayNumber: number;
  targetPeriod: TimelinePeriod;
  targetTime: string;
}

interface MoveActivityPanelProps {
  item: TodayTimelineItem;
  availableDays: AvailableDay[];
  onCancel: () => void;
  onSave: (draft: MoveActivityDraft) => void;
}

const periodOptions: TimelinePeriod[] = ["Morning", "Afternoon", "Evening"];

export default function MoveActivityPanel({
  item,
  availableDays,
  onCancel,
  onSave,
}: MoveActivityPanelProps) {
  const [targetDayNumber, setTargetDayNumber] = useState(item.dayNumber);
  const [targetPeriod, setTargetPeriod] = useState<TimelinePeriod>(item.period);
  const [targetTime, setTargetTime] = useState(item.time);

  const selectedDay = availableDays.find((day) => day.dayNumber === targetDayNumber);

  const canSave =
    targetTime.trim().length > 0 &&
    (targetDayNumber !== item.dayNumber ||
      targetPeriod !== item.period ||
      targetTime !== item.time);

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      itemId: item.id,
      currentDayNumber: item.dayNumber,
      targetDayNumber,
      targetPeriod,
      targetTime,
    });
  };

  return (
    <section className="rounded-3xl border border-violet-100 bg-white shadow-lg">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Move activity</Badge>

            <Badge variant="outline">
              <Clock3 className="mr-1 h-3 w-3" />
              Current: {formatTimelineTime(item.time)}
            </Badge>
          </div>

          <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Move this activity to another time block or another day.
          </p>
        </div>

        <Button type="button" size="sm" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <MapPin className="h-4 w-4 text-violet-600" />
            Current location
          </p>
          <p className="text-sm leading-6 text-slate-600">{item.location}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 text-sm font-semibold text-slate-900">Move to day</span>
            <select
              value={targetDayNumber}
              onChange={(event) => setTargetDayNumber(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
            >
              {availableDays.map((day) => (
                <option key={day.dayNumber} value={day.dayNumber}>
                  Day {day.dayNumber} — {day.city}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 text-sm font-semibold text-slate-900">Move to period</span>
            <select
              value={targetPeriod}
              onChange={(event) => setTargetPeriod(event.target.value as TimelinePeriod)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
            >
              {periodOptions.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Clock3 className="h-4 w-4 text-violet-600" />
              New time
            </span>
            <input
              type="time"
              value={targetTime}
              onChange={(event) => setTargetTime(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
          <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-violet-900">
            <ArrowRightLeft className="h-4 w-4" />
            Move preview
          </p>
          <p className="text-sm leading-6 text-violet-800">
            {item.title} will move from Day {item.dayNumber} / {item.period} /{" "}
            {formatTimelineTime(item.time)} to Day {targetDayNumber} / {targetPeriod} /{" "}
            {formatTimelineTime(targetTime)}.
          </p>

          {selectedDay?.theme && (
            <p className="mt-2 text-xs leading-5 text-violet-700">
              Target day theme: {selectedDay.theme}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="button" disabled={!canSave} onClick={handleSave}>
            <CheckCircle2 className="h-4 w-4" />
            Save move
          </Button>
        </div>
      </div>
    </section>
  );
}
