import { CheckCircle2, Clock3, MapPin, Navigation, Plus, StickyNote, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TimelineCategory, TimelinePeriod } from "@/lib/todayTimeline";

export interface NewActivityDraft {
  dayNumber: number;
  period: TimelinePeriod;
  time: string;
  title: string;
  location: string;
  transport: string;
  remarks: string;
  category: TimelineCategory;
}

interface AddActivityPanelProps {
  dayNumber: number;
  city: string;
  defaultPeriod?: TimelinePeriod;
  onCancel: () => void;
  onSave: (draft: NewActivityDraft) => void;
}

const periodOptions: TimelinePeriod[] = ["Morning", "Afternoon", "Evening"];

const categoryOptions: Array<{
  value: TimelineCategory;
  label: string;
}> = [
  { value: "activity", label: "Activity" },
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "free_time", label: "Free time" },
];

function getDefaultTime(period: TimelinePeriod) {
  switch (period) {
    case "Morning":
      return "10:00";
    case "Evening":
      return "19:00";
    default:
      return "15:00";
  }
}

export default function AddActivityPanel({
  dayNumber,
  city,
  defaultPeriod = "Afternoon",
  onCancel,
  onSave,
}: AddActivityPanelProps) {
  const [period, setPeriod] = useState<TimelinePeriod>(defaultPeriod);
  const [time, setTime] = useState(getDefaultTime(defaultPeriod));
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(city);
  const [transport, setTransport] = useState("Verify route live");
  const [remarks, setRemarks] = useState("Verify timing and opening hours live");
  const [category, setCategory] = useState<TimelineCategory>("activity");

  const canSave = title.trim().length > 0 && time.trim().length > 0;

  const handlePeriodChange = (nextPeriod: TimelinePeriod) => {
    setPeriod(nextPeriod);
    setTime(getDefaultTime(nextPeriod));
  };

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      dayNumber,
      period,
      time: time.trim(),
      title: title.trim(),
      location: location.trim(),
      transport: transport.trim(),
      remarks: remarks.trim(),
      category,
    });
  };

  return (
    <section className="rounded-3xl border border-emerald-100 bg-white shadow-lg">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Add activity</Badge>
            <Badge variant="outline">Day {dayNumber}</Badge>
          </div>

          <h2 className="text-xl font-bold text-slate-950">Add something to today</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a new stop, food break, transport note, or free-time block.
          </p>
        </div>

        <Button type="button" size="sm" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 text-sm font-semibold text-slate-900">Period</span>
            <select
              value={period}
              onChange={(event) => handlePeriodChange(event.target.value as TimelinePeriod)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
            >
              {periodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Clock3 className="h-4 w-4 text-emerald-600" />
              Time
            </span>
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
          </label>

          <label className="block">
            <span className="mb-1 text-sm font-semibold text-slate-900">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as TimelineCategory)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Plus className="h-4 w-4 text-emerald-600" />
            Activity title
          </span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
            placeholder="Example: Coffee break near the museum"
          />
        </label>

        <label className="block">
          <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <MapPin className="h-4 w-4 text-emerald-600" />
            Location
          </span>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
            placeholder="City, place, or area"
          />
        </label>

        <label className="block">
          <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Navigation className="h-4 w-4 text-emerald-600" />
            Transport
          </span>
          <textarea
            value={transport}
            onChange={(event) => setTransport(event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
          />
        </label>

        <label className="block">
          <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <StickyNote className="h-4 w-4 text-emerald-600" />
            Remarks
          </span>
          <textarea
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
          />
        </label>

        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="button" disabled={!canSave} onClick={handleSave}>
            <CheckCircle2 className="h-4 w-4" />
            Add activity
          </Button>
        </div>
      </div>
    </section>
  );
}
