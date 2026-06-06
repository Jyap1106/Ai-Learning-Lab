import { MapPin, Save, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  tripName: string;
  currentDay: number;
  saveStatus: string;
  onOpenTools?: () => void;
}

function getSaveStatusDisplay(status: string) {
  switch (status) {
    case "saved_locally":
      return "Saved locally";
    case "using_sample_data":
      return "Sample trip";
    case "awaiting_confirmation":
      return "Reviewing change";
    case "rejected":
      return "Change rejected";
    default:
      return status.replace(/_/g, " ");
  }
}

export default function Header({
  tripName,
  currentDay,
  saveStatus,
  onOpenTools,
}: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-blue-700">
            <MapPin className="h-4 w-4" />
            Holiday Companion Bot
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-950">{tripName}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Day {currentDay}</Badge>

          <Badge variant="outline">
            <Save className="mr-1 h-3 w-3" />
            {getSaveStatusDisplay(saveStatus)}
          </Badge>

          <Button type="button" size="sm" variant="outline" onClick={onOpenTools}>
            <SlidersHorizontal className="h-4 w-4" />
            Tools
          </Button>
        </div>
      </div>
    </header>
  );
}
