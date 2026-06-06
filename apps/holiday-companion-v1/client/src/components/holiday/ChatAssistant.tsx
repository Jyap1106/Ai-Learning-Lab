import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageCircle, UserRound } from "lucide-react";
import PromptChips from "./PromptChips";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  title?: string;
  content: string;
}

interface ChatAssistantProps {
  messages: ChatMessage[];
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

export default function ChatAssistant({
  messages,
  prompts,
  onPromptClick,
}: ChatAssistantProps) {
  return (
    <Card className="border-blue-100 bg-white/90 shadow-xl shadow-blue-950/5 backdrop-blur">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-md">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl text-slate-950">
              Trip Assistant
            </CardTitle>
            <p className="text-sm text-slate-500">
              Ask about your trip or use a quick action.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <PromptChips prompts={prompts} onPromptClick={onPromptClick} />

        <div className="max-h-[360px] space-y-3 overflow-y-auto rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center">
              <MessageCircle className="mb-3 h-8 w-8 text-slate-400" />
              <p className="font-medium text-slate-800">
                No chat messages yet
              </p>
              <p className="mt-1 max-w-md text-sm text-slate-500">
                Start with a prompt chip like “What&apos;s today&apos;s plan?”
                or “What food is planned today?”
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border border-slate-100 bg-white text-slate-700"
                  }`}
                >
                  {message.title && message.role === "assistant" && (
                    <p className="mb-2 font-semibold text-slate-950">
                      {message.title}
                    </p>
                  )}
                  <div className="whitespace-pre-line leading-relaxed">
                    {message.content}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                    <UserRound className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          This is currently a mock chat assistant. Real AI will be added later
          after the local product flow works.
        </div>
      </CardContent>
    </Card>
  );
}
