import { useState, useEffect } from "react";
import Header from "@/components/holiday/Header";
import TodayPlanCard from "@/components/holiday/TodayPlanCard";
import TomorrowPlanCard from "@/components/holiday/TomorrowPlanCard";
import TripDashboard from "@/components/holiday/TripDashboard";
import FullItineraryList from "@/components/holiday/FullItineraryList";
import austriaData from "@/data/austriaItineraryState.json";

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

export default function Home() {
  const [tripData, setTripData] = useState<ItineraryState | null>(null);

  useEffect(() => {
    // Load Austria sample data
    setTripData(austriaData as ItineraryState);
  }, []);

  if (!tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Loading trip data...</div>
      </div>
    );
  }

  const currentDay = tripData.days.find(
    (d) => d.dayNumber === tripData.currentDay
  );
  const tomorrowDay = tripData.days.find(
    (d) => d.dayNumber === tripData.currentDay + 1
  );
  const upcomingDays = tripData.days.filter(
    (d) => d.dayNumber > tripData.currentDay && d.dayNumber <= tripData.currentDay + 3
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        tripName={tripData.tripName}
        currentDay={tripData.currentDay}
        saveStatus={tripData.saveStatus}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {currentDay && <TodayPlanCard day={currentDay} />}
          {tomorrowDay && <TomorrowPlanCard day={tomorrowDay} />}
          <FullItineraryList days={tripData.days} />
        </div>

        {/* Right Trip Dashboard */}
        <div className="lg:col-span-1">
          <TripDashboard
            trip={tripData}
            currentDay={tripData.currentDay}
            versionHistory={tripData.versionHistory}
            saveStatus={tripData.saveStatus}
            upcomingDays={upcomingDays}
          />
        </div>
      </div>
    </div>
  );
}
