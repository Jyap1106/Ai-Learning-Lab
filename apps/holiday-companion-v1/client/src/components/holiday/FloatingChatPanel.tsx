import { MessageCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import ChatAssistant, { type ChatMessage } from "./ChatAssistant";

interface FloatingChatPanelProps {
  isOpen: boolean;
  messages: ChatMessage[];
  prompts: string[];
  onPromptClick: (prompt: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export default function FloatingChatPanel({
  isOpen,
  messages,
  prompts,
  onPromptClick,
  onOpen,
  onClose,
}: FloatingChatPanelProps) {
  if (!isOpen) {
    return (
      <Button
        type="button"
        className="fixed bottom-5 right-5 z-50 rounded-full px-5 py-6 shadow-xl"
        onClick={onOpen}
      >
        <MessageCircle className="h-5 w-5" />
        Ask Bot
      </Button>
    );
  }

  return (
    <section className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">Holiday Bot</p>
          <p className="text-xs text-slate-500">Ask about today, transport, food, or changes.</p>
        </div>

        <Button type="button" size="sm" variant="outline" onClick={onClose}>
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-3">
        <ChatAssistant messages={messages} prompts={prompts} onPromptClick={onPromptClick} />
      </div>
    </section>
  );
}
