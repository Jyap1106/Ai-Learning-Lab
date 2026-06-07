import { Download, RotateCcw, ShieldCheck } from "lucide-react";

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

interface VamoDataRecoveryPanelProps {
  trip: ItineraryState;
  onResetTrip: () => void;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], {
    type: "application/json;charset=utf-8",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
}

export default function VamoDataRecoveryPanel({
  trip,
  onResetTrip,
}: VamoDataRecoveryPanelProps) {
  const handleExportTrip = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const safeTripName = trip.tripName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    downloadTextFile(
      `${safeTripName || "vamo-trip"}-${timestamp}.json`,
      JSON.stringify(trip, null, 2),
    );
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div>
          <p className="font-black text-white">Local data recovery</p>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            V1 saves in this browser. Export a backup before major edits, or reset
            back to the Austria sample trip.
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          onClick={handleExportTrip}
        >
          <Download className="h-4 w-4" />
          Export trip JSON backup
        </Button>

        <Button
          type="button"
          variant="outline"
          className="rounded-full border-red-300/30 bg-red-500/10 text-red-100 hover:bg-red-500/20 hover:text-red-50"
          onClick={onResetTrip}
        >
          <RotateCcw className="h-4 w-4" />
          Reset sample trip
        </Button>
      </div>
    </section>
  );
}
