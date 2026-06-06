import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface FullItineraryListProps {
  days: Day[];
}

export default function FullItineraryList({ days }: FullItineraryListProps) {
  const getActivityCount = (day: Day) => {
    return day.morning.length + day.afternoon.length + day.evening.length;
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Full Itinerary</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {days.map((day) => (
            <div
              key={day.dayNumber}
              className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      Day {day.dayNumber} — {day.city}
                    </h3>
                    {day.edited && (
                      <Badge variant="secondary" className="text-xs">
                        Edited
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {day.theme}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      {getActivityCount(day)} activit
                      {getActivityCount(day) !== 1 ? "ies" : "y"}
                    </span>
                    <span>{day.food.length} food options</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
