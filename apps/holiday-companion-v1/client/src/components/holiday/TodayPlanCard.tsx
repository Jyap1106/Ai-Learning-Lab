import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, MapPin, Navigation, Sparkles, Utensils } from "lucide-react";

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
  onPromptClick?: (prompt: string) => void;
}

function ActivityBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white/80 p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={`${title}-${item}-${index}`} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TodayPlanCard({
  day,
  onPromptClick,
}: TodayPlanCardProps) {
  return (
    <Card className="overflow-hidden border-blue-100 bg-white/95 shadow-2xl shadow-blue-950/10">
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-500 px-6 py-6 text-white">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-white/15 text-white hover:bg-white/20">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            Day {day.dayNumber} — {day.city}
          </Badge>

          {day.edited && (
            <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
              Edited locally
            </Badge>
          )}
        </div>

        <CardTitle className="mt-4 max-w-3xl text-3xl font-semibold leading-tight">
          {day.theme}
        </CardTitle>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50">
          Your main focus for today. Use the assistant below if you want to make
          the day lighter, add a cafe break, or replace an activity.
        </p>
      </div>

      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <ActivityBlock title="Morning" items={day.morning} />
          <ActivityBlock title="Afternoon" items={day.afternoon} />
          <ActivityBlock title="Evening" items={day.evening} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-amber-700" />
              <p className="text-sm font-semibold text-amber-950">
                Food and cafe ideas
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {day.food.map((food, index) => (
                <Badge
                  key={`${food}-${index}`}
                  variant="outline"
                  className="rounded-full border-amber-200 bg-white/70 text-amber-900"
                >
                  <Coffee className="mr-1 h-3 w-3" />
                  {food}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-emerald-700" />
              <p className="text-sm font-semibold text-emerald-950">
                Transport notes
              </p>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-900">
              {day.transport.map((note, index) => (
                <li key={`${note}-${index}`}>• {note}</li>
              ))}
            </ul>
          </div>
        </div>

        {day.notes.length > 0 && (
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            <span className="font-semibold text-slate-900">Note:</span>{" "}
            {day.notes.join(" ")}
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">
          <Button
            type="button"
            className="rounded-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onPromptClick?.("What's today's plan?")}
          >
            Ask about today
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => onPromptClick?.("Make today lighter")}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Make today lighter
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => onPromptClick?.("Add a cafe break")}
          >
            Add cafe break
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => onPromptClick?.("Replace an activity")}
          >
            Replace activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
