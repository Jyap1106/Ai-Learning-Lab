import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Coffee, Utensils, Navigation } from "lucide-react";

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

interface TodayPlanCardProps {
  day: Day;
}

export default function TodayPlanCard({ day }: TodayPlanCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">
                Day {day.dayNumber} — {day.city}
              </CardTitle>
              {day.edited && (
                <Badge variant="secondary" className="text-xs">
                  Edited
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground italic">{day.theme}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Morning Activities */}
        <div>
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="text-lg">🌅</span> Morning
          </h3>
          <ul className="space-y-1 text-sm text-foreground">
            {day.morning.map((activity, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Afternoon Activities */}
        <div>
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="text-lg">☀️</span> Afternoon
          </h3>
          <ul className="space-y-1 text-sm text-foreground">
            {day.afternoon.map((activity, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evening Activities */}
        <div>
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="text-lg">🌙</span> Evening
          </h3>
          <ul className="space-y-1 text-sm text-foreground">
            {day.evening.map((activity, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Food Ideas */}
        <div className="border-t border-border pt-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Utensils className="w-4 h-4" /> Food Ideas
          </h3>
          <div className="flex flex-wrap gap-2">
            {day.food.map((food, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {food}
              </Badge>
            ))}
          </div>
        </div>

        {/* Transport Notes */}
        <div className="border-t border-border pt-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Navigation className="w-4 h-4" /> Transport
          </h3>
          <ul className="space-y-1 text-sm text-foreground">
            {day.transport.map((note, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        {day.notes.length > 0 && (
          <div className="border-t border-border pt-4 bg-muted/30 p-3 rounded-md">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Note:</span> {day.notes.join(" ")}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t border-border pt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Ask about today
          </Button>
          <Button variant="outline" size="sm">
            Make today lighter
          </Button>
          <Button variant="outline" size="sm">
            Add cafe break
          </Button>
          <Button variant="outline" size="sm">
            Replace activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
