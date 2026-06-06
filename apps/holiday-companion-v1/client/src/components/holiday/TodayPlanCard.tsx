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
    <Card className="border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] bg-card rounded-xl">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/25 border-b border-border/60 pb-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📍</span>
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                Day {day.dayNumber} — {day.city}
              </CardTitle>
              {day.edited && (
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Edited
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground/90 font-medium italic pl-7">{day.theme}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Morning Activities */}
        <div>
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-2.5">
            <span className="text-base">🌅</span> Morning
          </h3>
          <div className="space-y-2.5 pl-6">
            {day.morning.map((activity, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 bg-secondary/30 rounded-lg border border-border/20 hover:bg-secondary/50 transition-all duration-200">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground leading-relaxed">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Afternoon Activities */}
        <div>
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-2.5">
            <span className="text-base">☀️</span> Afternoon
          </h3>
          <div className="space-y-2.5 pl-6">
            {day.afternoon.map((activity, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 bg-secondary/30 rounded-lg border border-border/20 hover:bg-secondary/50 transition-all duration-200">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground leading-relaxed">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evening Activities */}
        <div>
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-2.5">
            <span className="text-base">🌙</span> Evening
          </h3>
          <div className="space-y-2.5 pl-6">
            {day.evening.map((activity, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 bg-secondary/30 rounded-lg border border-border/20 hover:bg-secondary/50 transition-all duration-200">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground leading-relaxed">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Food Ideas */}
        <div className="border-t border-border/60 pt-5">
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-primary" /> Food Ideas
          </h3>
          <div className="flex flex-wrap gap-2 pl-6">
            {day.food.map((food, idx) => (
              <Badge key={idx} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-none px-3.5 py-1 text-xs font-semibold rounded-full shadow-sm">
                🍽️ {food}
              </Badge>
            ))}
          </div>
        </div>

        {/* Transport Notes */}
        <div className="border-t border-border/60 pt-5">
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" /> Transport
          </h3>
          <div className="space-y-2 pl-6">
            {day.transport.map((note, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-accent/40 text-accent-foreground text-xs font-semibold border border-accent/20">
                <span>🚇</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {day.notes.length > 0 && (
          <div className="border-t border-border/60 pt-5">
            <div className="bg-amber-500/10 dark:bg-amber-500/5 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div className="flex gap-2.5">
                <span className="text-amber-600 dark:text-amber-500 text-sm">💡</span>
                <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                  <span className="font-bold text-amber-800 dark:text-amber-500 mr-1">Travel Tip:</span>
                  {day.notes.join(" ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t border-border/60 pt-5 flex flex-wrap gap-2.5">
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4.5 py-2 text-xs transition-transform duration-150 active:scale-95 shadow-sm">
            💬 Ask about today
          </Button>
          <Button variant="outline" className="rounded-full border-border/80 hover:bg-secondary/60 hover:text-foreground text-xs font-semibold px-4 py-2 transition-transform duration-150 active:scale-95">
            🍃 Make today lighter
          </Button>
          <Button variant="outline" className="rounded-full border-border/80 hover:bg-secondary/60 hover:text-foreground text-xs font-semibold px-4 py-2 transition-transform duration-150 active:scale-95">
            ☕ Add cafe break
          </Button>
          <Button variant="outline" className="rounded-full border-border/80 hover:bg-secondary/60 hover:text-foreground text-xs font-semibold px-4 py-2 transition-transform duration-150 active:scale-95">
            🔄 Replace activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
