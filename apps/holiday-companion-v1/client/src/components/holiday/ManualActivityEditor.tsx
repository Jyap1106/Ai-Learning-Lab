import { CheckCircle2, Clock3, MapPin, Navigation, StickyNote, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatTimelineTime,
  type TimelineCategory,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

export interface ManualActivityDraft {
  id: string;
  dayNumber: number;
  period: TodayTimelineItem["period"];
  sourceIndex: number;
  time: string;
  title: string;
  location: string;
  transport: string;
  remarks: string;
  category: TimelineCategory;
}

interface ManualActivityEditorProps {
  item: TodayTimelineItem;
  onCancel: () => void;
  onSave: (draft: ManualActivityDraft) => void;
}

const categoryOptions: Array<{
  value: TimelineCategory;
  label: string;
}> = [
  { value: "activity", label: "Activity" },
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "free_time", label: "Free time" },
];

function fieldClassName() {
  return "w-full rounded-2xl border border-[var(--vamo-border)] bg-[var(--vamo-input)] px-3 py-2 text-sm text-[var(--vamo-text)] outline-none placeholder:text-[var(--vamo-muted)] focus:border-[var(--vamo-primary)]";
}

export default function ManualActivityEditor({
  item,
  onCancel,
  onSave,
}: ManualActivityEditorProps) {
  const [time, setTime] = useState(item.time);
  const [title, setTitle] = useState(item.title);
  const [location, setLocation] = useState(item.location);
  const [transport, setTransport] = useState(item.transport);
  const [remarks, setRemarks] = useState(item.remarks);
  const [category, setCategory] = useState<TimelineCategory>(item.category);

  const canSave = title.trim().length > 0 && time.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      id: item.id,
      dayNumber: item.dayNumber,
      period: item.period,
      sourceIndex: item.sourceIndex,
      time: time.trim(),
      title: title.trim(),
      location: location.trim(),
      transport: transport.trim(),
      remarks: remarks.trim(),
      category,
    });
  };

  return (
    <section className="rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-text)] shadow-[var(--vamo-shadow)]">
      <div className="flex items-start justify-between gap-3 border-b border-[var(--vamo-border)] p-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge className="bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:bg-[var(--vamo-primary)]">
              Manual edit
            </Badge>

            <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
              <Clock3 className="mr-1 h-3 w-3" />
              {formatTimelineTime(item.time)}
            </Badge>
          </div>

          <h2 className="text-xl font-black text-[var(--vamo-text)]">Edit activity details</h2>
          <p className="mt-1 text-sm text-[var(--vamo-muted)]">
            Update this one timeline item and save it locally.
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 p-4">
        <label className="block">
          <span className="mb-1 flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
            <Clock3 className="h-4 w-4 text-[var(--vamo-primary)]" />
            Time
          </span>
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={fieldClassName()}
          />
        </label>

        <label className="block">
          <span className="mb-1 text-sm font-black text-[var(--vamo-text)]">Activity title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={fieldClassName()}
            placeholder="Example: Belvedere Palace"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
              <MapPin className="h-4 w-4 text-[var(--vamo-primary)]" />
              Location
            </span>
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className={fieldClassName()}
              placeholder="City, place, or address"
            />
          </label>

          <label className="block">
            <span className="mb-1 text-sm font-black text-[var(--vamo-text)]">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as TimelineCategory)}
              className={fieldClassName()}
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
          <span className="mb-1 flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
            <Navigation className="h-4 w-4 text-[var(--vamo-primary)]" />
            Transport
          </span>
          <textarea
            value={transport}
            onChange={(event) => setTransport(event.target.value)}
            rows={3}
            className={fieldClassName()}
            placeholder="How to get there"
          />
        </label>

        <label className="block">
          <span className="mb-1 flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
            <StickyNote className="h-4 w-4 text-[var(--vamo-primary)]" />
            Remarks
          </span>
          <textarea
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
            rows={3}
            className={fieldClassName()}
            placeholder="Tickets, timing, reminders, or travel notes"
          />
        </label>

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!canSave}
            className="rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
            onClick={handleSave}
          >
            <CheckCircle2 className="h-4 w-4" />
            Save edit
          </Button>
        </div>
      </div>
    </section>
  );
}
