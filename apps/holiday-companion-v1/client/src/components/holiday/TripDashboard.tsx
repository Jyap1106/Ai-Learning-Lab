import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

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

interface ItineraryState {
  tripId: string;
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: Day[];
  versionHistory: Array<{
    version: number;
    summary: string;
  }>;
}

interface TripDashboardProps {
  trip: ItineraryState;
  currentDay: number;
  versionHistory: Array<{
    version: number;
    summary: string;
  }>;
  saveStatus: string;
  upcomingDays: Day[];
}

export default function TripDashboard({
  trip,
  currentDay,
  versionHistory,
  saveStatus,
  upcomingDays,
}: TripDashboardProps) {
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
    <div className="space-y-4">
      {/* Trip Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">{trip.tripName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase">
              Destination
            </p>
            <p className="text-sm font-medium text-foreground">
              {trip.destination}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase">
              Duration
            </p>
            <p className="text-sm font-medium text-foreground">
              {trip.duration}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase">
              Current Day
            </p>
            <p className="text-sm font-medium text-foreground">Day {currentDay}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase">
              Status
            </p>
            <p className="text-sm font-medium text-foreground">
              {getSaveStatusDisplay(saveStatus)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Versions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {versionHistory.length} version{versionHistory.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {versionHistory.map((v) => (
              <div
                key={v.version}
                className="text-xs p-2 bg-muted/30 rounded border border-border"
              >
                <p className="font-semibold text-foreground">
                  v{v.version}
                </p>
                <p className="text-muted-foreground">{v.summary}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Days */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Days</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcomingDays.length > 0 ? (
            upcomingDays.map((day) => (
              <div
                key={day.dayNumber}
                className="p-2 bg-muted/30 rounded border border-border"
              >
                <p className="font-semibold text-sm text-foreground">
                  Day {day.dayNumber} — {day.city}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {day.theme}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No upcoming days scheduled
            </p>
          )}
        </CardContent>
      </Card>

      {/* Share Preview Placeholder */}
      <Card className="border-border bg-muted/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Share Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sharing is a future feature. A share preview will remove private
            details before sharing.
          </p>
          <Button variant="outline" size="sm" className="mt-3 w-full" disabled>
            Share Preview (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
