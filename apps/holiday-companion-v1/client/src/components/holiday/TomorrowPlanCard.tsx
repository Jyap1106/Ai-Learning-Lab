import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

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

interface TomorrowPlanCardProps {
  day: Day;
}

export default function TomorrowPlanCard({ day }: TomorrowPlanCardProps) {
  const getActivitySummary = () => {
    const allActivities = [
      ...day.morning,
      ...day.afternoon,
      ...day.evening,
    ];
    return allActivities.slice(0, 3);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="text-xl">
            Day {day.dayNumber} — {day.city}
          </CardTitle>
          <p className="text-sm text-muted-foreground italic">{day.theme}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Activities Summary */}
        <div>
          <h3 className="font-semibold text-foreground mb-2 text-sm">
            Main Activities
          </h3>
          <ul className="space-y-1 text-sm text-foreground">
            {getActivitySummary().map((activity, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Food Summary */}
        <div>
          <h3 className="font-semibold text-foreground mb-2 text-sm">
            Food Highlights
          </h3>
          <div className="flex flex-wrap gap-1">
            {day.food.slice(0, 3).map((food, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {food}
              </Badge>
            ))}
          </div>
        </div>

        {/* Transport Summary */}
        <div>
          <h3 className="font-semibold text-foreground mb-2 text-sm">
            Transport
          </h3>
          <p className="text-sm text-foreground">
            {day.transport[0] || "Local transport"}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border pt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            View tomorrow
          </Button>
          <Button variant="outline" size="sm">
            Ask about tomorrow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
