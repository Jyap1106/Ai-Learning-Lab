import { MessageCircle, Send, Sparkles, X, Zap } from "lucide-react";
import { useState } from "react";

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
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) return;

    onPromptClick(trimmedValue);
    setInputValue("");
  };

  if (!isOpen) {
    return (
      <Button
        type="button"
        className="fixed bottom-24 right-5 z-50 h-16 w-16 rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] shadow-2xl hover:opacity-90"
        onClick={onOpen}
        aria-label="Open Vamo Assistant"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    );
  }

  return (
    <section className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-md overflow-hidden rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-bg)] text-[var(--vamo-text)] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[var(--vamo-border)] bg-[var(--vamo-card)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)]">
            <Zap className="h-5 w-5" />
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-black text-[var(--vamo-text)]">
              Vamo Assistant
              <Sparkles className="h-3.5 w-3.5 text-[var(--vamo-primary)]" />
            </p>

            <p className="text-xs text-[var(--vamo-muted)]">
              Prompt-chip assistant for V1
            </p>
          </div>
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

      <div className="max-h-[68vh] overflow-y-auto bg-[var(--vamo-bg)] p-4">
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
                      ? "bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)]"
                      : "border border-[var(--vamo-border)] bg-[var(--vamo-card)] text-[var(--vamo-text)]"
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

        <div className="mt-5 border-t border-[var(--vamo-border)] pt-4">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--vamo-muted)]">
            Quick prompts
          </p>

          <div className="flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="rounded-full border border-[var(--vamo-border)] bg-[var(--vamo-card)] px-3 py-2 text-xs font-semibold text-[var(--vamo-text)] hover:bg-[var(--vamo-card-strong)]"
                onClick={() => onPromptClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-2">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="Ask Vamo anything..."
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[var(--vamo-text)] outline-none placeholder:text-[var(--vamo-muted)]"
          />

          <Button
            type="button"
            size="sm"
            className="rounded-full bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)] hover:opacity-90"
            onClick={handleSubmit}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
