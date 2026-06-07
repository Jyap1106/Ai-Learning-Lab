interface Day {
  dayNumber: number;
  city: string;
  theme: string;
  edited: boolean;
}

interface VamoDayStripProps {
  days: Day[];
  selectedDayNumber: number;
  currentDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
}

export default function VamoDayStrip({
  days,
  selectedDayNumber,
  currentDayNumber,
  onSelectDay,
}: VamoDayStripProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--vamo-muted)]">
          Select day
        </p>

        <p className="text-xs font-semibold text-[var(--vamo-muted)]">
          {days.length} days
        </p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-3 pb-1">
          {days.map((day) => {
            const isSelected = day.dayNumber === selectedDayNumber;
            const isToday = day.dayNumber === currentDayNumber;

            return (
              <button
                key={day.dayNumber}
                type="button"
                className={`min-w-20 rounded-3xl border px-4 py-3 text-center transition ${
                  isSelected
                    ? "border-[var(--vamo-primary)] bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)]"
                    : "border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-text)]"
                }`}
                onClick={() => onSelectDay(day.dayNumber)}
              >
                <p className="text-xs font-bold uppercase opacity-70">Day</p>
                <p className="text-2xl font-black leading-none">{day.dayNumber}</p>

                <div className="mt-2 flex items-center justify-center gap-1">
                  {isToday && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--vamo-success)]" />
                  )}

                  {day.edited && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--vamo-warning)]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
