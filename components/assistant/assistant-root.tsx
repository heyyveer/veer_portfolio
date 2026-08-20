"use client";

import * as React from "react";
import { Sparkles, Command } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatPanel, type ChatPanelHandle } from "./chat-panel";
import { useAssistant } from "./assistant-context";

export function AssistantRoot() {
  const { open, setOpen, consumePending } = useAssistant();
  const panelRef = React.useRef<ChatPanelHandle>(null);

  // CMD/Ctrl+K toggles the assistant globally.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // When the sheet opens with a pending prompt, fire it once mounted.
  React.useEffect(() => {
    if (!open) return;
    const p = consumePending();
    if (p) {
      const id = window.setTimeout(() => panelRef.current?.ask(p), 80);
      return () => window.clearTimeout(id);
    }
  }, [open, consumePending]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open assistant"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-border bg-card/90 px-4 py-3 text-sm shadow-[0_18px_50px_-18px_hsl(var(--foreground)/0.45)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[hsl(var(--accent))] hover:text-foreground sm:px-5"
      >
        <span className="relative flex size-6 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))]/15" />
          <Sparkles
            className="size-3.5 text-[hsl(var(--accent))]"
            strokeWidth={1.5}
          />
        </span>
        <span className="font-medium">Ask the portfolio</span>
        <span className="hidden items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:flex">
          <Command className="size-3" strokeWidth={1.5} />
          <span>K</span>
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="p-0">
          <SheetHeader>
            <SheetTitle>S/R Assistant</SheetTitle>
            <SheetDescription>
              Grounded in Soumya&rsquo;s catalogue. Streams token-by-token.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <ChatPanel ref={panelRef} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
