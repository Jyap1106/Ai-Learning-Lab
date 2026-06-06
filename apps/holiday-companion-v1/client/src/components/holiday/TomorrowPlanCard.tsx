import { CalendarDays, MapPin } from "lucide-react";

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

interface TomorrowPlanCardProps {
  day: Day;
  onPromptClick?: (prompt: string) => void;
}

export default function TomorrowPlanCard({ day, onPromptClick }: TomorrowPlanCardProps) {
  const mainActivities = [...day.morning, ...day.afternoon, ...day.evening].slice(0, 4);

  return (
    <Card className="border-violet-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <CalendarDays className="h-5 w-5 text-violet-600" />
          Day {day.dayNumber} — {day.city}
          {day.edited && <Badge variant="secondary">Edited locally</Badge>}
        </CardTitle>

        <p className="text-sm text-slate-600">{day.theme}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-900">Main activities</h3>

          <ul className="space-y-2">
            {mainActivities.map((activity, index) => (
              <li key={`${activity}-${index}`} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-900">Food highlights</h3>

          <div className="flex flex-wrap gap-2">
            {day.food.slice(0, 4).map((food) => (
              <Badge key={food} variant="outline">
                {food}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <MapPin className="h-4 w-4 text-violet-600" />
            Transport
          </div>

          <p className="text-sm text-slate-700">
            {day.transport[0] || "Use local transport and verify routes live."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onPromptClick?.("What is tomorrow's plan?")}
          >
            View tomorrow
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onPromptClick?.("What is tomorrow's plan?")}
          >
            Ask about tomorrow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
