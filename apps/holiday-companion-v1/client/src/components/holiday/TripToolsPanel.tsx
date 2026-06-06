import { CalendarDays, History, RotateCcw, Utensils, X } from "lucide-react";
import { useState } from "react";

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

interface VersionHistoryEntry {
  version: number;
  summary: string;
  changeType?: string;
  affectedDay?: number | null;
  createdAt?: string;
  restoredFromVersion?: number;
  snapshot?: Day[];
}

interface ItineraryState {
  tripId: string;
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: Day[];
  versionHistory: VersionHistoryEntry[];
}

interface TripToolsPanelProps {
  isOpen: boolean;
  trip: ItineraryState;
  currentDay?: Day;
  tomorrowDay?: Day;
  versionHistory: VersionHistoryEntry[];
  onClose: () => void;
  onResetTrip: () => void;
  onRestoreVersion: (versionNumber: number) => void;
}

type ToolTab = "tomorrow" | "food" | "full" | "versions" | "settings";

function formatVersionTime(createdAt?: string) {
  if (!createdAt) return null;

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getCurrentVersionNumber(versionHistory: VersionHistoryEntry[]) {
  if (versionHistory.length === 0) {
    return 0;
  }

  return Math.max(...versionHistory.map((entry) => entry.version));
}

function ActivityList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-900">{title}</p>

      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">No items listed.</p>
      )}
    </div>
  );
}

function ToolButton({
  tab,
  activeTab,
  children,
  onClick,
}: {
  tab: ToolTab;
  activeTab: ToolTab;
  children: React.ReactNode;
  onClick: (tab: ToolTab) => void;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={activeTab === tab ? "default" : "outline"}
      onClick={() => onClick(tab)}
    >
      {children}
    </Button>
  );
}

export default function TripToolsPanel({
  isOpen,
  trip,
  currentDay,
  tomorrowDay,
  versionHistory,
  onClose,
  onResetTrip,
  onRestoreVersion,
}: TripToolsPanelProps) {
  const [activeTab, setActiveTab] = useState<ToolTab>("tomorrow");

  if (!isOpen) {
    return null;
  }

  const currentVersionNumber = getCurrentVersionNumber(versionHistory);
  const sortedVersions = [...versionHistory].sort((a, b) => b.version - a.version);

  return (
    <section className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-slate-950/30" onClick={onClose} />

      <div className="absolute inset-x-3 top-5 mx-auto flex max-h-[90vh] max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
          <div>
            <p className="text-sm font-semibold text-blue-700">Trip tools</p>
            <h2 className="text-xl font-bold text-slate-950">{trip.tripName}</h2>
            <p className="text-sm text-slate-500">
              Hidden tools for tomorrow, food, full trip, versions, and reset.
            </p>
          </div>

          <Button type="button" size="sm" variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-100 p-4">
          <ToolButton tab="tomorrow" activeTab={activeTab} onClick={setActiveTab}>
            Tomorrow
          </ToolButton>

          <ToolButton tab="food" activeTab={activeTab} onClick={setActiveTab}>
            Food
          </ToolButton>

          <ToolButton tab="full" activeTab={activeTab} onClick={setActiveTab}>
            Full trip
          </ToolButton>

          <ToolButton tab="versions" activeTab={activeTab} onClick={setActiveTab}>
            Versions
          </ToolButton>

          <ToolButton tab="settings" activeTab={activeTab} onClick={setActiveTab}>
            Settings
          </ToolButton>
        </div>

        <div className="overflow-y-auto p-4">
          {activeTab === "tomorrow" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-violet-700">
                  <CalendarDays className="h-4 w-4" />
                  Tomorrow
                </p>

                {tomorrowDay ? (
                  <>
                    <h3 className="text-lg font-bold text-slate-950">
                      Day {tomorrowDay.dayNumber} — {tomorrowDay.city}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {tomorrowDay.theme}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-slate-600">No tomorrow plan found.</p>
                )}
              </div>

              {tomorrowDay && (
                <div className="grid gap-4 md:grid-cols-3">
                  <ActivityList title="Morning" items={tomorrowDay.morning} />
                  <ActivityList title="Afternoon" items={tomorrowDay.afternoon} />
                  <ActivityList title="Evening" items={tomorrowDay.evening} />
                </div>
              )}
            </div>
          )}

          {activeTab === "food" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-orange-700">
                  <Utensils className="h-4 w-4" />
                  Food ideas
                </p>
                <h3 className="text-lg font-bold text-slate-950">
                  {currentDay ? `Day ${currentDay.dayNumber} — ${currentDay.city}` : "Today"}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Food options are still sample-data suggestions. Verify opening hours live.
                </p>
              </div>

              {currentDay && currentDay.food.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentDay.food.map((food) => (
                    <div key={food} className="rounded-2xl border border-slate-100 bg-white p-4">
                      <p className="font-semibold text-slate-950">{food}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Check distance, opening hours, and current availability.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-600">No food ideas listed for today.</p>
              )}
            </div>
          )}

          {activeTab === "full" && (
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-950">Full trip overview</h3>
                <p className="text-sm text-slate-600">
                  Kept here so the main Today screen stays simple.
                </p>
              </div>

              {trip.days.map((day) => (
                <div key={day.dayNumber} className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <p className="font-bold text-slate-950">
                      Day {day.dayNumber} — {day.city}
                    </p>

                    {day.dayNumber === trip.currentDay && <Badge variant="default">Today</Badge>}
                    {day.edited && <Badge variant="secondary">Edited</Badge>}
                  </div>

                  <p className="text-sm leading-6 text-slate-600">{day.theme}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "versions" && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <History className="h-4 w-4" />
                  Version history
                </p>
                <h3 className="text-lg font-bold text-slate-950">
                  {versionHistory.length} local version
                  {versionHistory.length !== 1 ? "s" : ""}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Versions are hidden from the main screen, but changes are still saved locally.
                </p>
              </div>

              {sortedVersions.map((version) => {
                const isCurrentVersion = version.version === currentVersionNumber;
                const canRestore = Boolean(version.snapshot) && !isCurrentVersion;
                const formattedTime = formatVersionTime(version.createdAt);

                return (
                  <div
                    key={`${version.version}-${version.summary}`}
                    className="rounded-2xl border border-slate-100 bg-white p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={isCurrentVersion ? "default" : "outline"}>
                          v{version.version}
                        </Badge>

                        {version.affectedDay ? (
                          <Badge variant="secondary">Day {version.affectedDay}</Badge>
                        ) : (
                          <Badge variant="outline">Trip level</Badge>
                        )}

                        {formattedTime && (
                          <span className="text-xs text-slate-400">{formattedTime}</span>
                        )}
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={!canRestore}
                        onClick={() => onRestoreVersion(version.version)}
                      >
                        {isCurrentVersion ? "Current" : canRestore ? "Restore" : "No snapshot"}
                      </Button>
                    </div>

                    <p className="text-sm leading-6 text-slate-700">{version.summary}</p>

                    {version.restoredFromVersion && (
                      <p className="mt-1 text-xs text-emerald-700">
                        Restored from v{version.restoredFromVersion}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-orange-700">
                  <RotateCcw className="h-4 w-4" />
                  Local prototype controls
                </p>
                <h3 className="text-lg font-bold text-slate-950">Reset sample trip</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  This clears local saved changes from this browser and reloads the Austria sample
                  trip.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-orange-200 text-orange-700 hover:bg-orange-100"
                onClick={onResetTrip}
              >
                <RotateCcw className="h-4 w-4" />
                Reset Sample Trip
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
