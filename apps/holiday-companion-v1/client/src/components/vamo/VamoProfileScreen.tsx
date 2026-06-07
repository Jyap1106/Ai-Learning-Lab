import {
  Bell,
  GitCompareArrows,
  History,
  Settings,
  Shield,
  UserCircle,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VAMO_THEME_OPTIONS, type VamoTheme } from "@/lib/vamoTheme";

import VamoCreateImportPanel from "./VamoCreateImportPanel";
import VamoDataRecoveryPanel from "./VamoDataRecoveryPanel";

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
  activeTheme: VamoTheme;
  versionHistory: VersionHistoryEntry[];
  onThemeChange: (theme: VamoTheme) => void;
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
      className="flex w-full items-center gap-3 rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 text-left"
      onClick={onClick}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--vamo-card-strong)] text-[var(--vamo-primary)]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-black text-[var(--vamo-text)]">{title}</p>
        <p className="mt-0.5 text-sm leading-5 text-[var(--vamo-muted)]">{description}</p>
      </div>

      {rightLabel && (
        <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
          {rightLabel}
        </Badge>
      )}
    </button>
  );
}

export default function VamoProfileScreen({
  trip,
  activeTheme,
  versionHistory,
  onThemeChange,
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--vamo-muted)]">
          Travel profile
        </p>

        <h1 className="mt-1 text-2xl font-black text-[var(--vamo-text)]">Vamo Settings</h1>
      </header>

      <div className="mb-6 rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-5 text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-300 via-purple-400 to-orange-300 text-black">
          <UserCircle className="h-12 w-12" />
        </div>

        <h2 className="text-2xl font-black text-[var(--vamo-text)]">Trip Owner</h2>
        <p className="mt-1 text-sm text-[var(--vamo-muted)]">{trip.tripName}</p>

        <div className="mt-5 grid grid-cols-3 divide-x divide-[var(--vamo-border)]">
          <div>
            <p className="text-2xl font-black text-[var(--vamo-text)]">1</p>
            <p className="text-xs font-bold uppercase text-[var(--vamo-muted)]">Trip</p>
          </div>

          <div>
            <p className="text-2xl font-black text-[var(--vamo-text)]">1</p>
            <p className="text-xs font-bold uppercase text-[var(--vamo-muted)]">Country</p>
          </div>

          <div>
            <p className="text-2xl font-black text-[var(--vamo-text)]">{trip.days.length}</p>
            <p className="text-xs font-bold uppercase text-[var(--vamo-muted)]">Days</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
          Travel archetype
        </h2>

        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full bg-[var(--vamo-card-strong)] px-4 py-2 text-[var(--vamo-text)] hover:bg-[var(--vamo-card-strong)]">
            Relaxed pace
          </Badge>
          <Badge className="rounded-full bg-[var(--vamo-card-strong)] px-4 py-2 text-[var(--vamo-text)] hover:bg-[var(--vamo-card-strong)]">
            Culture
          </Badge>
          <Badge className="rounded-full bg-[var(--vamo-card-strong)] px-4 py-2 text-[var(--vamo-text)] hover:bg-[var(--vamo-card-strong)]">
            Food
          </Badge>
          <Badge className="rounded-full bg-[var(--vamo-card-strong)] px-4 py-2 text-[var(--vamo-text)] hover:bg-[var(--vamo-card-strong)]">
            Scenic
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <VamoCreateImportPanel onComingSoon={onShareComingSoon} />
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
          Appearance
        </h2>

        <div className="space-y-3">
          {VAMO_THEME_OPTIONS.map((themeOption) => {
            const isActive = activeTheme === themeOption.id;

            return (
              <button
                key={themeOption.id}
                type="button"
                className={`w-full rounded-3xl border p-4 text-left ${
                  isActive
                    ? "border-[var(--vamo-primary)] bg-[var(--vamo-card-strong)]"
                    : "border-[var(--vamo-border)] bg-[var(--vamo-card)]"
                }`}
                onClick={() => onThemeChange(themeOption.id)}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--vamo-card-strong)] text-[var(--vamo-primary)]">
                      <Zap className="h-5 w-5" />
                    </div>

                    <p className="font-black text-[var(--vamo-text)]">{themeOption.label}</p>
                  </div>

                  <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
                    {isActive ? "Active" : "Switch"}
                  </Badge>
                </div>

                <p className="text-sm leading-6 text-[var(--vamo-muted)]">
                  {themeOption.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
          System & privacy
        </h2>

        <div className="space-y-3">
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
            description="Real sharing belongs in V2. Current share screen is visual preview only."
            rightLabel="Preview"
            onClick={onShareComingSoon}
          />
        </div>
      </div>

      <div className="mb-6">
        <VamoDataRecoveryPanel trip={trip} onResetTrip={onResetTrip} />
      </div>

      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
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
                className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className={isCurrentVersion ? "bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)]" : "bg-[var(--vamo-card-strong)] text-[var(--vamo-text)]"}>
                    v{version.version}
                  </Badge>

                  {version.affectedDay ? (
                    <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
                      Day {version.affectedDay}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
                      Trip level
                    </Badge>
                  )}

                  {formattedTime && (
                    <span className="text-xs text-[var(--vamo-muted)]">{formattedTime}</span>
                  )}
                </div>

                <p className="text-sm leading-6 text-[var(--vamo-muted)]">{version.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
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
                    className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
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
    </section>
  );
}
