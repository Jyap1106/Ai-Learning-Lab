import {
  AlertCircle,
  CalendarDays,
  Clock3,
  GitBranch,
  RotateCcw,
  Save,
  Undo2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface TripDashboardProps {
  trip: ItineraryState;
  currentDay: number;
  versionHistory: VersionHistoryEntry[];
  saveStatus: string;
  upcomingDays: Day[];
  onResetTrip: () => void;
  onRestoreVersion: (versionNumber: number) => void;
}

function getSaveStatusDisplay(status: string) {
  switch (status) {
    case "saved_locally":
      return "Saved locally";
    case "using_sample_data":
      return "Using sample data";
    case "awaiting_confirmation":
      return "Awaiting confirmation";
    case "rejected":
      return "Change rejected";
    default:
      return status.replace(/_/g, " ");
  }
}

function getSaveStatusBadgeVariant(
  status: string,
): "default" | "secondary" | "outline" {
  if (status === "saved_locally") return "default";
  if (status === "awaiting_confirmation") return "secondary";
  return "outline";
}

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

  return Math.max(...versionHistory.map((version) => version.version));
}

export default function TripDashboard({
  trip,
  currentDay,
  versionHistory,
  saveStatus,
  upcomingDays,
  onResetTrip,
  onRestoreVersion,
}: TripDashboardProps) {
  const sortedVersions = [...versionHistory].sort((a, b) => b.version - a.version);
  const currentVersionNumber = getCurrentVersionNumber(versionHistory);
  const editedDaysCount = trip.days.filter((day) => day.edited).length;

  return (
    <div className="space-y-4">
      <Card className="border-blue-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            Trip Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Trip</p>
            <p className="text-base font-semibold text-slate-900">{trip.tripName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-medium text-slate-500">Destination</p>
              <p className="font-semibold text-slate-900">{trip.destination}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-medium text-slate-500">Duration</p>
              <p className="font-semibold text-slate-900">{trip.duration}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-medium text-slate-500">Current Day</p>
              <p className="font-semibold text-slate-900">Day {currentDay}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-medium text-slate-500">Edited Days</p>
              <p className="font-semibold text-slate-900">{editedDaysCount}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
            <div>
              <p className="text-sm font-medium text-slate-500">Save status</p>
              <p className="text-sm text-slate-700">{getSaveStatusDisplay(saveStatus)}</p>
            </div>

            <Badge variant={getSaveStatusBadgeVariant(saveStatus)}>
              <Save className="mr-1 h-3 w-3" />
              {getSaveStatusDisplay(saveStatus)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GitBranch className="h-5 w-5 text-emerald-600" />
            Version Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {versionHistory.length} version{versionHistory.length !== 1 ? "s" : ""}
            </p>

            <Badge variant="outline">Local only</Badge>
          </div>

          <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
            {sortedVersions.map((version) => {
              const formattedTime = formatVersionTime(version.createdAt);
              const isCurrentVersion = version.version === currentVersionNumber;
              const hasSnapshot = Boolean(version.snapshot);
              const canRestore = hasSnapshot && !isCurrentVersion;

              return (
                <div
                  key={`${version.version}-${version.summary}`}
                  className="rounded-xl border border-slate-100 bg-white p-3"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          v{version.version}
                        </p>

                        {isCurrentVersion && <Badge variant="default">Current</Badge>}

                        {version.affectedDay ? (
                          <Badge variant="secondary">Day {version.affectedDay}</Badge>
                        ) : (
                          <Badge variant="outline">Trip level</Badge>
                        )}
                      </div>

                      {formattedTime && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 className="h-3 w-3" />
                          {formattedTime}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant={canRestore ? "outline" : "secondary"}
                      disabled={!canRestore}
                      onClick={() => onRestoreVersion(version.version)}
                    >
                      <Undo2 className="h-4 w-4" />
                      {isCurrentVersion ? "Current" : hasSnapshot ? "Restore" : "No snapshot"}
                    </Button>
                  </div>

                  <p className="text-sm text-slate-700">{version.summary}</p>

                  {version.restoredFromVersion && (
                    <p className="mt-1 text-xs text-emerald-700">
                      Restored from v{version.restoredFromVersion}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Days</CardTitle>
        </CardHeader>

        <CardContent>
          {upcomingDays.length > 0 ? (
            <div className="space-y-3">
              {upcomingDays.map((day) => (
                <div key={day.dayNumber} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-900">
                    Day {day.dayNumber} — {day.city}
                  </p>
                  <p className="text-sm text-slate-600">{day.theme}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">No upcoming days scheduled.</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-orange-100 bg-orange-50/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Local Prototype Controls
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-slate-700">
            Reset clears saved local changes and reloads the Austria sample trip.
          </p>

          <Button
            type="button"
            variant="outline"
            className="w-full border-orange-200 text-orange-700 hover:bg-orange-100"
            onClick={onResetTrip}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Sample Trip
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
