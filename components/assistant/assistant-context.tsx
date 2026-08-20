"use client";

import * as React from "react";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  pendingPrompt: string | null;
  askWith: (prompt: string) => void;
  consumePending: () => string | null;
};

const AssistantCtx = React.createContext<Ctx | null>(null);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [pendingPrompt, setPendingPrompt] = React.useState<string | null>(null);

  const askWith = React.useCallback((prompt: string) => {
    setPendingPrompt(prompt);
    setOpen(true);
  }, []);

  const consumePending = React.useCallback(() => {
    const p = pendingPrompt;
    setPendingPrompt(null);
    return p;
  }, [pendingPrompt]);

  const value = React.useMemo<Ctx>(
    () => ({ open, setOpen, pendingPrompt, askWith, consumePending }),
    [open, pendingPrompt, askWith, consumePending],
  );

  return <AssistantCtx.Provider value={value}>{children}</AssistantCtx.Provider>;
}

export function useAssistant() {
  const ctx = React.useContext(AssistantCtx);
  if (!ctx) {
    throw new Error("useAssistant must be used within <AssistantProvider>");
  }
  return ctx;
}
