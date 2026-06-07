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
    <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-black text-[var(--vamo-text)]">{title}</p>

        <Badge
          variant="outline"
          className={
            isDifferent
              ? "border-blue-400/30 bg-blue-400/10 text-blue-200"
              : "border-[var(--vamo-border)] text-[var(--vamo-muted)]"
          }
        >
          {isDifferent ? "Changed" : "Same"}
        </Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
            Selected version
          </p>

          {versionItems.length > 0 ? (
            <ul className="space-y-2">
              {versionItems.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-3 text-sm leading-6 text-blue-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-[var(--vamo-card-strong)] p-3 text-sm text-[var(--vamo-muted)]">
              No items.
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
            Current itinerary
          </p>

          {currentItems.length > 0 ? (
            <ul className="space-y-2">
              {currentItems.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] p-3 text-sm leading-6 text-[var(--vamo-text)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-[var(--vamo-card-strong)] p-3 text-sm text-[var(--vamo-muted)]">
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-x-3 top-5 mx-auto flex max-h-[90vh] max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-bg)] text-[var(--vamo-text)] shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge className="bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:bg-[var(--vamo-primary)]">
                Version compare
              </Badge>

              <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
                v{version.version}
              </Badge>

              <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
                {formatVersionTime(version.createdAt)}
              </Badge>
            </div>

            <h2 className="flex items-center gap-2 text-xl font-black text-[var(--vamo-text)]">
              <GitCompareArrows className="h-5 w-5 text-[var(--vamo-primary)]" />
              Compare selected version
            </h2>

            <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
              {version.summary}
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto p-4">
          {!canCompare ? (
            <div className="rounded-3xl border border-orange-400/20 bg-orange-400/10 p-4">
              <p className="font-black text-orange-100">Comparison unavailable</p>
              <p className="mt-1 text-sm leading-6 text-orange-100/80">
                This version does not have enough snapshot data to compare against
                the current itinerary.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-4">
                <p className="text-sm font-black text-blue-100">
                  Comparing Day {versionDay?.dayNumber} — {versionDay?.city}
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-100/80">
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

        <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            type="button"
            disabled={!canRestore}
            className="rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
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
