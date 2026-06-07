import { Copy, Mail, MessageCircle, Share2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTimelineTime, type TodayTimelineItem } from "@/lib/todayTimeline";

interface Day {
  dayNumber: number;
  city: string;
  theme: string;
}

interface VamoSharePreviewPanelProps {
  isOpen: boolean;
  tripName: string;
  currentDay: Day;
  timelineItems: TodayTimelineItem[];
  onClose: () => void;
}

export default function VamoSharePreviewPanel({
  isOpen,
  tripName,
  currentDay,
  timelineItems,
  onClose,
}: VamoSharePreviewPanelProps) {
  if (!isOpen) {
    return null;
  }

  const previewItems = timelineItems.slice(0, 4);
  const fakeShareLink = "vamo.app/trip/austria-preview";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fakeShareLink);
    } catch {
      // Clipboard can fail in some browsers. This is a visual V2 preview for now.
    }
  };

  return (
    <section className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-x-3 top-5 mx-auto flex max-h-[90vh] max-w-md flex-col overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-bg)] text-[var(--vamo-text)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--vamo-border)] bg-[var(--vamo-card)] px-4 py-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
              Share itinerary
            </p>
            <h2 className="text-lg font-black text-[var(--vamo-text)]">V2 preview</h2>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto p-4">
          <div className="relative mb-5 overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.32),transparent_26%),linear-gradient(135deg,#2563eb,#7c3aed,#f97316)] p-5">
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10">
              <Badge className="bg-white text-black hover:bg-white">Read-only preview</Badge>

              <h3 className="mt-8 text-2xl font-black text-white">{tripName}</h3>
              <p className="mt-1 text-sm text-white/80">
                Day {currentDay.dayNumber} · {currentDay.city} · {previewItems.length} visible stops
              </p>

              <div className="mt-5 space-y-3">
                {previewItems.map((item) => (
                  <div key={item.id} className="flex gap-3 text-white">
                    <div className="mt-1 h-2 w-2 rounded-full bg-white" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/70">
                        {formatTimelineTime(item.time)}
                      </p>
                      <p className="font-black">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {timelineItems.length > previewItems.length && (
                <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/70">
                  +{timelineItems.length - previewItems.length} more stops
                </p>
              )}
            </div>
          </div>

          <div className="mb-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
              Sharing scope
            </p>

            <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
              <p className="font-black text-[var(--vamo-text)]">Read-only</p>
              <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
                Others can view your plan but cannot change it. Real sharing will arrive in V2.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 opacity-60">
              <p className="font-black text-[var(--vamo-text)]">Collaborator</p>
              <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
                Invite friends to suggest stops and leave notes later.
              </p>
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
              Direct share
            </p>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 text-center"
              >
                <MessageCircle className="mx-auto mb-2 h-5 w-5 text-[var(--vamo-primary)]" />
                <span className="text-xs font-black text-[var(--vamo-text)]">WhatsApp</span>
              </button>

              <button
                type="button"
                className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 text-center"
              >
                <Mail className="mx-auto mb-2 h-5 w-5 text-[var(--vamo-primary)]" />
                <span className="text-xs font-black text-[var(--vamo-text)]">Email</span>
              </button>

              <button
                type="button"
                className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 text-center"
              >
                <Share2 className="mx-auto mb-2 h-5 w-5 text-[var(--vamo-primary)]" />
                <span className="text-xs font-black text-[var(--vamo-text)]">More</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--vamo-muted)]">
                Public link
              </p>
              <p className="truncate text-sm font-semibold text-[var(--vamo-text)]">
                {fakeShareLink}
              </p>
            </div>

            <Button
              type="button"
              size="sm"
              className="rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>

        <div className="border-t border-[var(--vamo-border)] p-4">
          <Button
            type="button"
            className="w-full rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </section>
  );
}
