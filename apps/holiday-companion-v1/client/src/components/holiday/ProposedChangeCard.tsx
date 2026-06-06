import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, GitBranch, RotateCcw, XCircle } from "lucide-react";
import type { ProposedChange } from "@/lib/mockResponses";

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
    (option) => option.id === proposedChange.selectedOptionId
  );

  return (
    <Card className="border-emerald-100 bg-white/95 shadow-xl shadow-emerald-950/5 backdrop-blur">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-md">
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl text-slate-950">
              Proposed itinerary change
            </CardTitle>
            <p className="text-sm text-slate-500">
              Review before saving. Nothing changes until you confirm.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Affected day
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              Day {proposedChange.affectedDay} —{" "}
              {proposedChange.affectedCity}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Current item
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              {proposedChange.currentItem}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Request
          </p>
          <p className="mt-2 text-sm leading-6 text-blue-950">
            {proposedChange.requestedChange}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-950">
            Choose an option
          </p>

          <div className="grid gap-3">
            {proposedChange.options.map((option) => {
              const isSelected =
                option.id === proposedChange.selectedOptionId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelectOption(option.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-emerald-300 bg-emerald-50 shadow-sm"
                      : "border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">
                        {option.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {option.description}
                      </p>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Impact
          </p>
          <p className="mt-2 text-sm leading-6 text-amber-950">
            {proposedChange.impact}
          </p>
          {selectedOption && (
            <p className="mt-3 text-sm font-medium text-amber-950">
              Selected: {selectedOption.label}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            className="rounded-full bg-emerald-600 px-5 text-white hover:bg-emerald-700"
            onClick={onConfirm}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Confirm change
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-full border-slate-200 px-5"
            onClick={onReject}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="rounded-full px-5 text-slate-500"
            disabled
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Revise later
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
