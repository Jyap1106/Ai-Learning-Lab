import {
  Bell,
  ChevronRight,
  Database,
  GitCompareArrows,
  History,
  RotateCcw,
  Settings,
  Shield,
  Sparkles,
  Upload,
  UserCircle,
  Zap,
} from "lucide-react";

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

interface ItineraryState {
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: DaySnapshot[];
  versionHistory: VersionHistoryEntry[];
}

interface VamoProfileScreenProps {
  trip: ItineraryState;
  versionHistory: VersionHistoryEntry[];
  onResetTrip: () => void;
  onRestoreVersion: (versionNumber: number) => void;
  onCompareVersion: (version: VersionHistoryEntry) => void;
  onShareComingSoon: () => void;
}

function formatVersionTime(createdAt?: string) {
  if (!createdAt) return null;

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getCurrentVersionNumber(versionHistory: VersionHistoryEntry[]) {
  if (versionHistory.length === 0) return 0;

  return Math.max(...versionHistory.map((entry) => entry.version));
}

function SettingRow({
  icon,
  title,
  description,
  rightLabel,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  rightLabel?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-left"
      onClick={onClick}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-black text-white">{title}</p>
        <p className="mt-0.5 text-sm leading-5 text-zinc-400">{description}</p>
      </div>

      {rightLabel ? (
        <Badge variant="outline" className="border-white/10 bg-white/10 text-zinc-300">
          {rightLabel}
        </Badge>
      ) : (
        <ChevronRight className="h-4 w-4 text-zinc-500" />
      )}
    </button>
  );
}

export default function VamoProfileScreen({
  trip,
  versionHistory,
  onResetTrip,
  onRestoreVersion,
  onCompareVersion,
  onShareComingSoon,
}: VamoProfileScreenProps) {
  const currentVersionNumber = getCurrentVersionNumber(versionHistory);
  const sortedVersions = [...versionHistory].sort((a, b) => b.version - a.version);

  return (
    <section className="min-h-screen px-4 pb-8 pt-4">
      <header className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Travel profile
        </p>

        <h1 className="mt-1 text-2xl font-black text-white">Vamo Settings</h1>
      </header>

      <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-300 via-purple-400 to-orange-300 text-black">
          <UserCircle className="h-12 w-12" />
        </div>

        <h2 className="text-2xl font-black text-white">Trip Owner</h2>
        <p className="mt-1 text-sm text-zinc-400">{trip.tripName}</p>

        <div className="mt-5 grid grid-cols-3 divide-x divide-white/10">
          <div>
            <p className="text-2xl font-black text-white">1</p>
            <p className="text-xs font-bold uppercase text-zinc-500">Trip</p>
          </div>

          <div>
            <p className="text-2xl font-black text-white">1</p>
            <p className="text-xs font-bold uppercase text-zinc-500">Country</p>
          </div>

          <div>
            <p className="text-2xl font-black text-white">{trip.days.length}</p>
            <p className="text-xs font-bold uppercase text-zinc-500">Days</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
          Travel archetype
        </h2>

        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/10">
            Relaxed pace
          </Badge>
          <Badge className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/10">
            Culture
          </Badge>
          <Badge className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/10">
            Food
          </Badge>
          <Badge className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/10">
            Scenic
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
          New project
        </h2>

        <div className="space-y-3">
          <SettingRow
            icon={<Database className="h-5 w-5" />}
            title="Austria sample trip"
            description="Current V1 trip guide loaded from local sample data."
            rightLabel="Active"
          />

          <SettingRow
            icon={<Upload className="h-5 w-5" />}
            title="Upload itinerary"
            description="Import JSON, CSV, PDF, or pasted trip plans in V2."
            rightLabel="Soon"
          />

          <SettingRow
            icon={<Sparkles className="h-5 w-5" />}
            title="Guided creator"
            description="AI-powered itinerary planning will come in a later version."
            rightLabel="V2"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
          System & privacy
        </h2>

        <div className="space-y-3">
          <SettingRow
            icon={<Zap className="h-5 w-5" />}
            title="Dark mode"
            description="Default Vamo theme for V1. Light mode is planned for early V2."
            rightLabel="On"
          />

          <SettingRow
            icon={<Shield className="h-5 w-5" />}
            title="External suggestions"
            description="Future RAG/internet suggestions. V1 uses local itinerary data only."
            rightLabel="Off"
          />

          <SettingRow
            icon={<Bell className="h-5 w-5" />}
            title="Notifications"
            description="Trip reminders and schedule changes can be added later."
            rightLabel="Soon"
          />

          <SettingRow
            icon={<Settings className="h-5 w-5" />}
            title="Share itinerary"
            description="Visible for product direction. Real sharing belongs in V2."
            rightLabel="Soon"
            onClick={onShareComingSoon}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
          <History className="h-4 w-4" />
          Version history
        </h2>

        <div className="space-y-3">
          {sortedVersions.slice(0, 5).map((version) => {
            const isCurrentVersion = version.version === currentVersionNumber;
            const canRestore = Boolean(version.snapshot) && !isCurrentVersion;
            const formattedTime = formatVersionTime(version.createdAt);

            return (
              <div
                key={`${version.version}-${version.summary}`}
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-4"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className={isCurrentVersion ? "bg-blue-500 text-black" : "bg-white/10 text-white"}>
                    v{version.version}
                  </Badge>

                  {version.affectedDay ? (
                    <Badge variant="outline" className="border-white/10 text-zinc-300">
                      Day {version.affectedDay}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-white/10 text-zinc-300">
                      Trip level
                    </Badge>
                  )}

                  {formattedTime && (
                    <span className="text-xs text-zinc-500">{formattedTime}</span>
                  )}
                </div>

                <p className="text-sm leading-6 text-zinc-300">{version.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    disabled={!version.snapshot}
                    onClick={() => onCompareVersion(version)}
                  >
                    <GitCompareArrows className="h-4 w-4" />
                    Compare
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    disabled={!canRestore}
                    onClick={() => onRestoreVersion(version.version)}
                  >
                    {isCurrentVersion ? "Current" : canRestore ? "Restore" : "No snapshot"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-4">
        <p className="mb-2 text-sm font-black text-red-200">Local prototype controls</p>

        <p className="mb-4 text-sm leading-6 text-red-100/80">
          Reset clears local saved changes in this browser and reloads the Austria sample trip.
        </p>

        <Button
          type="button"
          variant="outline"
          className="w-full rounded-full border-red-300/30 bg-red-500/10 text-red-100 hover:bg-red-500/20 hover:text-red-50"
          onClick={onResetTrip}
        >
          <RotateCcw className="h-4 w-4" />
          Reset sample trip
        </Button>
      </div>
    </section>
  );
}
