import { MessageCircle, Sparkles, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ChatMessage } from "./ChatAssistant";

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
        className="fixed bottom-24 right-5 z-50 h-16 w-16 rounded-full bg-blue-400 text-black shadow-2xl hover:bg-blue-300"
        onClick={onOpen}
        aria-label="Open Vamo Assistant"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    );
  }

  return (
    <section className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-400 text-black">
            <Zap className="h-5 w-5" />
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-black text-white">
              Vamo Assistant
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            </p>

            <p className="text-xs text-zinc-400">
              Prompt-chip assistant for V1
            </p>
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-h-[68vh] overflow-y-auto bg-black p-4">
        <div className="space-y-3">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-3xl px-4 py-3 ${
                    isUser
                      ? "bg-blue-500 text-white"
                      : "border border-white/10 bg-white/[0.08] text-zinc-100"
                  }`}
                >
                  {message.title && (
                    <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] opacity-70">
                      {message.title}
                    </p>
                  )}

                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Quick prompts
          </p>

          <div className="flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/15"
                onClick={() => onPromptClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
