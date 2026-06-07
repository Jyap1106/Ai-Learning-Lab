import { CheckCircle2, GitBranch, RotateCcw, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProposedChangeOption {
  id: string;
  label: string;
  description: string;
}

interface ProposedChange {
  id: string;
  type: string;
  title: string;
  affectedDay: number;
  affectedCity: string;
  currentItem?: string;
  requestedChange: string;
  impact: string;
  selectedOptionId: string;
  status: string;
  options: ProposedChangeOption[];
}

interface ProposedChangeCardProps {
  proposedChange: ProposedChange;
  onSelectOption: (optionId: string) => void;
  onConfirm: () => void;
  onReject: () => void;
}

export default function ProposedChangeCard({
  proposedChange,
  onSelectOption,
  onConfirm,
  onReject,
}: ProposedChangeCardProps) {
  const selectedOption = proposedChange.options.find(
    (option) => option.id === proposedChange.selectedOptionId,
  );

  return (
    <section className="rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-text)] shadow-2xl">
      <div className="border-b border-[var(--vamo-border)] p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:bg-[var(--vamo-primary)]">
            Proposed change
          </Badge>

          <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
            Day {proposedChange.affectedDay}
          </Badge>

          <Badge variant="outline" className="border-[var(--vamo-border)] text-[var(--vamo-muted)]">
            {proposedChange.affectedCity}
          </Badge>
        </div>

        <h2 className="text-xl font-black text-[var(--vamo-text)]">{proposedChange.title}</h2>

        <p className="mt-2 text-sm leading-6 text-[var(--vamo-muted)]">
          {proposedChange.requestedChange}
        </p>
      </div>

      <div className="space-y-4 p-4">
        {proposedChange.currentItem && (
          <div className="rounded-3xl border border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
              Current item
            </p>
            <p className="mt-2 font-black text-[var(--vamo-text)]">
              {proposedChange.currentItem}
            </p>
          </div>
        )}

        <div className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">
            Impact
          </p>
          <p className="mt-2 text-sm leading-6 text-blue-100">
            {proposedChange.impact}
          </p>
        </div>

        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
            <GitBranch className="h-4 w-4" />
            Choose an option
          </p>

          <div className="space-y-3">
            {proposedChange.options.map((option) => {
              const isSelected = option.id === proposedChange.selectedOptionId;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`w-full rounded-3xl border p-4 text-left transition ${
                    isSelected
                      ? "border-[var(--vamo-primary)] bg-[var(--vamo-card-strong)]"
                      : "border-[var(--vamo-border)] bg-[var(--vamo-card)]"
                  }`}
                  onClick={() => onSelectOption(option.id)}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="font-black text-[var(--vamo-text)]">{option.label}</p>

                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-[var(--vamo-primary)]" />
                    )}
                  </div>

                  <p className="text-sm leading-6 text-[var(--vamo-muted)]">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {selectedOption && (
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">
              Selected
            </p>
            <p className="mt-2 font-black text-emerald-100">{selectedOption.label}</p>
            <p className="mt-1 text-sm leading-6 text-emerald-100/80">
              Nothing changes until you confirm.
            </p>
          </div>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
            onClick={onReject}
          >
            <X className="h-4 w-4" />
            Reject
          </Button>

          <Button
            type="button"
            className="rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
            onClick={onConfirm}
          >
            <RotateCcw className="h-4 w-4" />
            Confirm change
          </Button>
        </div>
      </div>
    </section>
  );
}
