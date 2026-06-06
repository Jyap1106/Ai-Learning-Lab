import { Button } from "@/components/ui/button";

interface PromptChipsProps {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

export default function PromptChips({
  prompts,
  onPromptClick,
}: PromptChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 rounded-full border-blue-100 bg-white/80 text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
          onClick={() => onPromptClick(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
