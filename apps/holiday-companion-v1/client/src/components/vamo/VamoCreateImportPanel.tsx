import { ChevronRight, FileJson, Sparkles, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface VamoCreateImportPanelProps {
  onComingSoon: () => void;
}

function ImportOption({
  icon,
  title,
  description,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4 text-left"
      onClick={onClick}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--vamo-card-strong)] text-[var(--vamo-primary)]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <p className="font-black text-[var(--vamo-text)]">{title}</p>
          <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
            {badge}
          </Badge>
        </div>

        <p className="text-sm leading-6 text-[var(--vamo-muted)]">{description}</p>
      </div>

      <ChevronRight className="h-4 w-4 text-[var(--vamo-muted)]" />
    </button>
  );
}

export default function VamoCreateImportPanel({
  onComingSoon,
}: VamoCreateImportPanelProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--vamo-muted)]">
          New project
        </h2>
        <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
          V1 uses your Austria sample trip. These options prepare Vamo for V2 import and creator flows.
        </p>
      </div>

      <ImportOption
        icon={<FileJson className="h-5 w-5" />}
        title="Austria sample trip"
        description="Current V1 trip guide loaded from the app-friendly local sample data."
        badge="Active"
        onClick={onComingSoon}
      />

      <ImportOption
        icon={<Upload className="h-5 w-5" />}
        title="Upload itinerary"
        description="Future support for JSON, CSV, Excel, PDF, or pasted itinerary plans."
        badge="V2"
        onClick={onComingSoon}
      />

      <ImportOption
        icon={<Sparkles className="h-5 w-5" />}
        title="Guided creator"
        description="Future AI-assisted trip creation from destination, dates, interests, and pace."
        badge="V3"
        onClick={onComingSoon}
      />
    </section>
  );
}
