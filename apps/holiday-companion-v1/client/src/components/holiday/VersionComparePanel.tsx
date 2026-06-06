import { GitCompareArrows, RotateCcw, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DaySnapshot {
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

interface VersionHistoryEntry {
  version: number;
  summary: string;
  changeType?: string;
  affectedDay?: number | null;
  createdAt?: string;
  restoredFromVersion?: number;
  snapshot?: DaySnapshot[];
}

interface VersionComparePanelProps {
  isOpen: boolean;
  version: VersionHistoryEntry | null;
  currentDays: DaySnapshot[];
  onClose: () => void;
  onRestoreVersion: (versionNumber: number) => void;
}

function formatVersionTime(createdAt?: string) {
  if (!createdAt) return "No timestamp";

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Invalid timestamp";
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function arraysAreDifferent(first: string[], second: string[]) {
  return JSON.stringify(first) !== JSON.stringify(second);
}

function findBestCompareDay(
  version: VersionHistoryEntry,
  currentDays: DaySnapshot[],
) {
  if (!version.snapshot || version.snapshot.length === 0) {
    return {
      versionDay: null,
      currentDay: null,
    };
  }

  if (version.affectedDay) {
    return {
      versionDay:
        version.snapshot.find((day) => day.dayNumber === version.affectedDay) ?? null,
      currentDay:
        currentDays.find((day) => day.dayNumber === version.affectedDay) ?? null,
    };
  }

  const changedVersionDay = version.snapshot.find((snapshotDay) => {
    const matchingCurrentDay = currentDays.find(
      (currentDay) => currentDay.dayNumber === snapshotDay.dayNumber,
    );

    if (!matchingCurrentDay) return true;

    return JSON.stringify(snapshotDay) !== JSON.stringify(matchingCurrentDay);
  });

  if (!changedVersionDay) {
    const firstSnapshotDay = version.snapshot[0];

    return {
      versionDay: firstSnapshotDay,
      currentDay:
        currentDays.find((day) => day.dayNumber === firstSnapshotDay.dayNumber) ?? null,
    };
  }

  return {
    versionDay: changedVersionDay,
    currentDay:
      currentDays.find((day) => day.dayNumber === changedVersionDay.dayNumber) ?? null,
  };
}

function SectionCompare({
  title,
  versionItems,
  currentItems,
}: {
  title: string;
  versionItems: string[];
  currentItems: string[];
}) {
  const isDifferent = arraysAreDifferent(versionItems, currentItems);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-slate-950">{title}</p>

        <Badge variant={isDifferent ? "secondary" : "outline"}>
          {isDifferent ? "Changed" : "Same"}
        </Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Selected version
          </p>

          {versionItems.length > 0 ? (
            <ul className="space-y-2">
              {versionItems.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
              No items.
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Current itinerary
          </p>

          {currentItems.length > 0 ? (
            <ul className="space-y-2">
              {currentItems.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
              No items.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VersionComparePanel({
  isOpen,
  version,
  currentDays,
  onClose,
  onRestoreVersion,
}: VersionComparePanelProps) {
  if (!isOpen || !version) {
    return null;
  }

  const { versionDay, currentDay } = findBestCompareDay(version, currentDays);
  const canCompare = Boolean(versionDay && currentDay);
  const canRestore = Boolean(version.snapshot);

  return (
    <section className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/35" onClick={onClose} />

      <div className="absolute inset-x-3 top-5 mx-auto flex max-h-[90vh] max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Version compare</Badge>
              <Badge variant="outline">v{version.version}</Badge>
              <Badge variant="outline">{formatVersionTime(version.createdAt)}</Badge>
            </div>

            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
              <GitCompareArrows className="h-5 w-5 text-blue-600" />
              Compare selected version
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {version.summary}
            </p>
          </div>

          <Button type="button" size="sm" variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="overflow-y-auto p-4">
          {!canCompare ? (
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <p className="font-semibold text-orange-900">Comparison unavailable</p>
              <p className="mt-1 text-sm leading-6 text-orange-800">
                This version does not have enough snapshot data to compare against
                the current itinerary.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-900">
                  Comparing Day {versionDay?.dayNumber} — {versionDay?.city}
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-800">
                  Left side shows the selected version. Right side shows your
                  current itinerary.
                </p>
              </div>

              <SectionCompare
                title="Morning"
                versionItems={versionDay?.morning ?? []}
                currentItems={currentDay?.morning ?? []}
              />

              <SectionCompare
                title="Afternoon"
                versionItems={versionDay?.afternoon ?? []}
                currentItems={currentDay?.afternoon ?? []}
              />

              <SectionCompare
                title="Evening"
                versionItems={versionDay?.evening ?? []}
                currentItems={currentDay?.evening ?? []}
              />

              <SectionCompare
                title="Notes"
                versionItems={versionDay?.notes ?? []}
                currentItems={currentDay?.notes ?? []}
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 p-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button
            type="button"
            disabled={!canRestore}
            onClick={() => onRestoreVersion(version.version)}
          >
            <RotateCcw className="h-4 w-4" />
            Restore v{version.version}
          </Button>
        </div>
      </div>
    </section>
  );
}
