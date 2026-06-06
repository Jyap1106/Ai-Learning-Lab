import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Save } from "lucide-react";

interface HeaderProps {
  tripName: string;
  currentDay: number;
  saveStatus: string;
}

export default function Header({
  tripName,
  currentDay,
  saveStatus,
}: HeaderProps) {
  const getSaveStatusDisplay = (status: string) => {
    switch (status) {
      case "saved_locally":
        return "Saved locally";
      case "using_sample_data":
        return "Using sample data";
      default:
        return status.replace(/_/g, " ");
    }
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">
              Holiday Companion Bot
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{tripName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Day {currentDay}</span>
              </div>
              <div className="flex items-center gap-1">
                <Save className="w-4 h-4" />
                <span>{getSaveStatusDisplay(saveStatus)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Create New Trip
            </Button>
            <Button variant="outline" size="sm">
              Share Preview
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
