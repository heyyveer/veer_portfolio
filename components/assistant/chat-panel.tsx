"use client";

import * as React from "react";
import { ArrowUp, RotateCcw, Square, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageBubble } from "./message";
import { useChat } from "./use-chat";

const SEED_PROMPTS = [
  "What's Soumya's strongest project?",
  "What stack does Soumya reach for first?",
  "Is Soumya available for contract work?",
  "Summarise the four roles in a sentence each.",
];

export type ChatPanelHandle = {
  ask: (text: string) => void;
};

type Props = {
  onAsk?: (text: string) => void;
};

export const ChatPanel = React.forwardRef<ChatPanelHandle, Props>(
  function ChatPanel({ onAsk }, ref) {
    const { messages, isStreaming, error, ask, stop, reset } = useChat();
    const [input, setInput] = React.useState("");
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        ask: (text: string) => {
          setInput("");
          ask(text);
          onAsk?.(text);
        },
      }),
      [ask, onAsk],
    );

    React.useEffect(() => {
      const node = scrollRef.current;
      if (!node) return;
      node.scrollTop = node.scrollHeight;
    }, [messages]);

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isStreaming) return;
      const text = input;
      setInput("");
      ask(text);
      onAsk?.(text);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit(e as unknown as React.FormEvent);
      }
    };

    const isEmpty = messages.length === 0;

    return (
      <div className="flex h-full flex-col">
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          className="flex-1 overflow-y-auto px-5 py-6"
        >
          {isEmpty ? (
            <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-7 text-center">
              <div className="space-y-3">
                <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full border border-border bg-card">
                  <Sparkles
                    className="size-5 text-[hsl(var(--accent))]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-3xl leading-tight tracking-tight">
                  Ask Soumya&rsquo;s portfolio<br />
                  <em className="text-[hsl(var(--accent))]">anything</em>.
                </h3>
                <p className="text-sm text-muted-foreground">
                  Grounded in the catalogue. No hallucinated projects, no
                  invented dates. Streamed token-by-token.
                </p>
              </div>
              <ul className="grid gap-2 text-left">
                {SEED_PROMPTS.map((p) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => {
                        ask(p);
                        onAsk?.(p);
                      }}
                      className="group w-full rounded-lg border border-border bg-card px-4 py-3 text-left text-sm transition-colors hover:border-[hsl(var(--accent))] hover:bg-secondary"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-[hsl(var(--accent))]">
                        Try
                      </span>
                      <span className="mt-1 block">{p}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="border-t border-border bg-background/80 backdrop-blur-sm p-4"
        >
          <div className="relative">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder="Ask about projects, stack, availability…"
              disabled={isStreaming}
              className="min-h-[68px] resize-none pr-24"
            />
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
              {messages.length > 0 && !isStreaming && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Clear conversation"
                  onClick={reset}
                  className="size-8 text-muted-foreground"
                >
                  <RotateCcw strokeWidth={1.5} />
                </Button>
              )}
              {isStreaming ? (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  aria-label="Stop"
                  onClick={stop}
                  className="size-9"
                >
                  <Square className="size-3.5 fill-current" strokeWidth={1.5} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  variant="accent"
                  aria-label="Send message"
                  disabled={!input.trim()}
                  className="size-9"
                >
                  <ArrowUp strokeWidth={1.5} />
                </Button>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span>Enter to send · Shift+Enter for new line</span>
            <span>Streamed · grounded · no PII</span>
          </div>
        </form>
      </div>
    );
  },
);
