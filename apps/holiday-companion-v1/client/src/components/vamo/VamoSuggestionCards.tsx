import { Coffee, MapPin, Sparkles, Utensils } from "lucide-react";

interface Day {
  dayNumber: number;
  city: string;
  theme: string;
  food: string[];
  notes: string[];
}

interface VamoSuggestionCardsProps {
  currentDay: Day;
  onAskSuggestion: (prompt: string) => void;
  onOpenPlanner: () => void;
}

function SuggestionCard({
  label,
  title,
  description,
  icon,
  onClick,
}: {
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative min-h-36 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-4 text-left shadow-lg"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.25),transparent_34%)]" />

      <div className="relative z-10">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
          {icon}
        </div>

        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
          {label}
        </p>

        <h3 className="mt-2 text-lg font-black leading-tight text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-5 text-zinc-400">{description}</p>
      </div>
    </button>
  );
}

export default function VamoSuggestionCards({
  currentDay,
  onAskSuggestion,
  onOpenPlanner,
}: VamoSuggestionCardsProps) {
  const firstFood = currentDay.food[0] ?? "Find a nearby cafe";
  const secondFood = currentDay.food[1] ?? "Simple food break";
  const firstNote = currentDay.notes[0] ?? "Verify timing and transport live.";

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
          <Sparkles className="h-4 w-4 text-blue-300" />
          Smart suggestions
        </h2>

        <button
          type="button"
          className="text-sm font-semibold text-blue-300"
          onClick={onOpenPlanner}
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SuggestionCard
          label="Food"
          title={firstFood}
          description="Use this if you want an easy food stop from the existing itinerary."
          icon={<Utensils className="h-5 w-5" />}
          onClick={() => onAskSuggestion(`Tell me about ${firstFood} today.`)}
        />

        <SuggestionCard
          label="Cafe"
          title={secondFood}
          description="Good for a slower break if the day feels too packed."
          icon={<Coffee className="h-5 w-5" />}
          onClick={() => onAskSuggestion(`Can I use ${secondFood} as a break today?`)}
        />

        <SuggestionCard
          label="Pace"
          title="Make today lighter"
          description="Ask Vamo what can be skipped or changed into free time."
          icon={<Sparkles className="h-5 w-5" />}
          onClick={() => onAskSuggestion("Make today lighter")}
        />

        <SuggestionCard
          label="Reminder"
          title="Live checks"
          description={firstNote}
          icon={<MapPin className="h-5 w-5" />}
          onClick={() => onAskSuggestion("What should I verify live today?")}
        />
      </div>
    </section>
  );
}
