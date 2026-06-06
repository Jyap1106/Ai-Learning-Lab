import { ListChecks, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TodayTimelineItem } from "@/lib/todayTimeline";

import TimelineItemCard from "./TimelineItemCard";

interface TodayTimelineProps {
  timelineItems: TodayTimelineItem[];
  currentItemId?: string;
  nextItemId?: string;
  onAddActivity: () => void;
  onViewItemDetails: (item: TodayTimelineItem) => void;
  onAskAboutItem: (item: TodayTimelineItem) => void;
  onChangeItem: (item: TodayTimelineItem) => void;
  onSkipItem: (item: TodayTimelineItem) => void;
}

export default function TodayTimeline({
  timelineItems,
  currentItemId,
  nextItemId,
  onAddActivity,
  onViewItemDetails,
  onAskAboutItem,
  onChangeItem,
  onSkipItem,
}: TodayTimelineProps) {
  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ListChecks className="h-5 w-5 text-blue-600" />
            Today&apos;s timeline
          </CardTitle>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              {timelineItems.length} item{timelineItems.length !== 1 ? "s" : ""}
            </Badge>

            <Button type="button" size="sm" onClick={onAddActivity}>
              <Plus className="h-4 w-4" />
              Add activity
            </Button>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          One-glance view of timing, activity, location, transport, and remarks.
          Tap a card or Details to open the full action drawer.
        </p>
      </CardHeader>

      <CardContent>
        {timelineItems.length > 0 ? (
          <div className="space-y-3">
            {timelineItems.map((item) => (
              <TimelineItemCard
                key={item.id}
                item={item}
                isCurrent={item.id === currentItemId}
                isNext={item.id === nextItemId}
                onViewDetails={onViewItemDetails}
                onAskAboutItem={onAskAboutItem}
                onChangeItem={onChangeItem}
                onSkipItem={onSkipItem}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
            No timeline items found for today.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
