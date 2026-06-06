import { Clock3, Coffee, MapPin, Sparkles, Utensils, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimelineTime, type TodayTimelineItem } from "@/lib/todayTimeline";

interface DaySummary {
  dayNumber: number;
  city: string;
  food: string[];
}

export type GuidedReplacementCategory = "food" | "activity" | "nearby";

export interface GuidedReplacementOption {
  id: string;
  category: GuidedReplacementCategory;
  label: string;
  description: string;
}

interface GuidedActivityChangePanelProps {
  item: TodayTimelineItem;
  day: DaySummary;
  onClose: () => void;
  onKeepFreeTime: (item: TodayTimelineItem) => void;
  onSelectReplacement: (
    item: TodayTimelineItem,
    option: GuidedReplacementOption,
  ) => void;
}

const replacementCategories: Array<{
  id: GuidedReplacementCategory;
  label: string;
  description: string;
}> = [
  {
    id: "food",
    label: "Food / cafe",
    description: "Replace this with a meal, cafe, or rest stop.",
  },
  {
    id: "activity",
    label: "Lighter activity",
    description: "Choose something easier and less time-sensitive.",
  },
  {
    id: "nearby",
    label: "Nearby place",
    description: "Keep travel time low with a flexible nearby stop.",
  },
];

function buildFoodOptions(day: DaySummary): GuidedReplacementOption[] {
  const foodIdeas = day.food.length > 0 ? day.food.slice(0, 3) : ["Nearby cafe", "Simple meal break"];

  return foodIdeas.map((food, index) => ({
    id: `guided-food-${index + 1}`,
    category: "food",
    label: `Food stop: ${food}`,
    description: "Good when you need a slower break without adding another attraction.",
  }));
}

function buildActivityOptions(day: DaySummary): GuidedReplacementOption[] {
  return [
    {
      id: "guided-activity-scenic-walk",
      category: "activity",
      label: `Short scenic walk in ${day.city}`,
      description: "A lighter replacement that still lets you experience the city.",
    },
    {
      id: "guided-activity-photo-stop",
      category: "activity",
      label: `Photo and explore block in ${day.city}`,
      description: "Flexible time for photos, wandering, and low-pressure exploring.",
    },
    {
      id: "guided-activity-rest-stop",
      category: "activity",
      label: "Rest-first light activity",
      description: "Keep the day moving, but reduce the pressure and walking load.",
    },
  ];
}

function buildNearbyOptions(item: TodayTimelineItem, day: DaySummary): GuidedReplacementOption[] {
  return [
    {
      id: "guided-nearby-flexible-stop",
      category: "nearby",
      label: `Nearby flexible stop near ${item.location}`,
      description: "Use this when you want to avoid extra transport time.",
    },
    {
      id: "guided-nearby-local-area",
      category: "nearby",
      label: `Stay around ${day.city} and explore nearby`,
      description: "Good when you are running late or want to reduce movement.",
    },
    {
      id: "guided-nearby-easy-break",
      category: "nearby",
      label: "Easy nearby rest block",
      description: "Leaves room for a short walk, rest, or spontaneous stop.",
    },
  ];
}

function getCategoryIcon(category: GuidedReplacementCategory) {
  switch (category) {
    case "food":
      return <Utensils className="h-4 w-4" />;
    case "activity":
      return <Sparkles className="h-4 w-4" />;
    case "nearby":
      return <MapPin className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
  }
}

export default function GuidedActivityChangePanel({
  item,
  day,
  onClose,
  onKeepFreeTime,
  onSelectReplacement,
}: GuidedActivityChangePanelProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<GuidedReplacementCategory | null>(null);

  const options = useMemo(() => {
    if (selectedCategory === "food") {
      return buildFoodOptions(day);
    }

    if (selectedCategory === "activity") {
      return buildActivityOptions(day);
    }

    if (selectedCategory === "nearby") {
      return buildNearbyOptions(item, day);
    }

    return [];
  }, [day, item, selectedCategory]);

  return (
    <Card className="border-blue-100 bg-white shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Change activity</Badge>

              <Badge variant="outline">
                <Clock3 className="mr-1 h-3 w-3" />
                {formatTimelineTime(item.time)}
              </Badge>
            </div>

            <CardTitle className="text-xl text-slate-950">
              What do you want to do with this?
            </CardTitle>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {item.title}
            </p>
          </div>

          <Button type="button" size="sm" variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-slate-900">Location</p>
              <p className="mt-1 text-slate-600">{item.location}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">Transport</p>
              <p className="mt-1 text-slate-600">{item.transport}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">Remark</p>
              <p className="mt-1 text-slate-600">{item.remarks}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            className="h-auto justify-start rounded-2xl border-orange-200 bg-orange-50 p-4 text-left text-orange-900 hover:bg-orange-100"
            onClick={() => onKeepFreeTime(item)}
          >
            <Coffee className="h-5 w-5 shrink-0" />

            <span>
              <span className="block font-semibold">Keep this time free</span>
              <span className="block text-xs font-normal text-orange-800">
                Remove this activity and leave the block relaxed.
              </span>
            </span>
          </Button>

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="font-semibold text-slate-950">Replace with another option</p>
            <p className="mt-1 text-sm text-slate-600">
              Choose a type first, then pick one suggestion.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {replacementCategories.map((category) => (
            <Button
              key={category.id}
              type="button"
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="h-auto justify-start rounded-2xl p-4 text-left"
              onClick={() => setSelectedCategory(category.id)}
            >
              {getCategoryIcon(category.id)}

              <span>
                <span className="block font-semibold">{category.label}</span>
                <span className="block text-xs font-normal opacity-80">
                  {category.description}
                </span>
              </span>
            </Button>
          ))}
        </div>

        {selectedCategory ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                Suggested replacements
              </p>
              <p className="text-sm text-slate-600">
                Pick one. You will still review it before saving.
              </p>
            </div>

            <div className="grid gap-3">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                  onClick={() => onSelectReplacement(item, option)}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{option.category}</Badge>
                    <Badge variant="outline">Review before saving</Badge>
                  </div>

                  <p className="font-semibold text-slate-950">{option.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Select Food / cafe, Lighter activity, or Nearby place to see suggestions.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
