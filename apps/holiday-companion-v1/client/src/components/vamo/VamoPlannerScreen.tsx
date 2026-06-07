import { Plus, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  buildTodayTimeline,
  type TodayTimelineItem,
} from "@/lib/todayTimeline";

import VamoActivitySpotlight from "./VamoActivitySpotlight";
import VamoDayStrip from "./VamoDayStrip";
import VamoRoutePreviewCard from "./VamoRoutePreviewCard";
import VamoTimelineList from "./VamoTimelineList";
import VamoTripOverviewGrid from "./VamoTripOverviewGrid";

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
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: Day[];
}

interface VamoPlannerScreenProps {
  trip: ItineraryState;
  onAddActivity: () => void;
  onViewItemDetails: (item: TodayTimelineItem) => void;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onChangeItem: (item: TodayTimelineItem) => void;
  onSkipItem: (item: TodayTimelineItem) => void;
  onShareComingSoon: () => void;
}

export default function VamoPlannerScreen({
  trip,
  onAddActivity,
  onViewItemDetails,
  onAskAboutItem,
  onChangeItem,
  onSkipItem,
  onShareComingSoon,
}: VamoPlannerScreenProps) {
  const [selectedDayNumber, setSelectedDayNumber] = useState(trip.currentDay);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const selectedDay =
    trip.days.find((day) => day.dayNumber === selectedDayNumber) ?? trip.days[0];

  const selectedTimelineItems = useMemo(() => {
    return selectedDay ? buildTodayTimeline(selectedDay) : [];
  }, [selectedDay]);

  const selectedItem =
    selectedTimelineItems.find((item) => item.id === selectedItemId) ??
    selectedTimelineItems[0];

  useEffect(() => {
    setSelectedItemId(null);
  }, [selectedDayNumber]);

  return (
    <section className="min-h-screen space-y-6 px-4 pb-8 pt-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--vamo-muted)]">
            Planner
          </p>
          <h1 className="mt-1 text-2xl font-black text-[var(--vamo-text)]">
            {trip.tripName}
          </h1>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card-strong)]"
          onClick={onShareComingSoon}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </header>

      <VamoDayStrip
        days={trip.days}
        selectedDayNumber={selectedDayNumber}
        currentDayNumber={trip.currentDay}
        onSelectDay={setSelectedDayNumber}
      />

      {selectedDay && (
        <>
          <VamoRoutePreviewCard
            day={selectedDay}
            timelineItems={selectedTimelineItems}
            currentDayNumber={trip.currentDay}
            onShareComingSoon={onShareComingSoon}
          />

          <VamoTimelineList
            timelineItems={selectedTimelineItems}
            selectedItemId={selectedItem?.id}
            onSelectItem={(item) => setSelectedItemId(item.id)}
            onAskAboutItem={onAskAboutItem}
            onChangeItem={onChangeItem}
            onSkipItem={onSkipItem}
            onShareComingSoon={onShareComingSoon}
          />

          <VamoActivitySpotlight
            day={selectedDay}
            item={selectedItem}
            onViewDetails={onViewItemDetails}
            onAskAboutItem={onAskAboutItem}
            onChangeItem={onChangeItem}
            onSkipItem={onSkipItem}
          />

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-3xl border border-dashed border-[var(--vamo-border-strong)] bg-[var(--vamo-card-soft)] px-4 py-4 text-sm font-black text-[var(--vamo-text)]"
            onClick={onAddActivity}
          >
            <Plus className="h-5 w-5" />
            Add stop to itinerary
          </button>

          <VamoTripOverviewGrid
            days={trip.days}
            currentDayNumber={trip.currentDay}
            selectedDayNumber={selectedDayNumber}
            onSelectDay={setSelectedDayNumber}
          />
        </>
      )}
    </section>
  );
}
