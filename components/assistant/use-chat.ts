"use client";

import * as React from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
};

type State = {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
};

const initial: State = { messages: [], isStreaming: false, error: null };

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useChat() {
  const [state, setState] = React.useState<State>(initial);
  const abortRef = React.useRef<AbortController | null>(null);

  const ask = React.useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
    };
    const assistantMsg: ChatMessage = {
      id: makeId(),
      role: "assistant",
      content: "",
      pending: true,
    };

    const historySnapshot: { role: "user" | "assistant"; content: string }[] = [];
    setState((prev) => {
      historySnapshot.push(
        ...prev.messages.map((m) => ({ role: m.role, content: m.content })),
      );
      return {
        ...prev,
        isStreaming: true,
        error: null,
        messages: [...prev.messages, userMsg, assistantMsg],
      };
    });

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        signal: ctrl.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: historySnapshot }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const raw of events) {
          if (!raw.trim()) continue;
          const lines = raw.split("\n");
          let event = "message";
          let data = "";
          for (const line of lines) {
            if (line.startsWith("event:")) event = line.slice(6).trim();
            else if (line.startsWith("data:")) data += line.slice(5).trim();
          }
          if (!data) continue;

          try {
            const parsed = JSON.parse(data) as { text?: string; message?: string };
            if (event === "delta" && parsed.text) {
              setState((prev) => ({
                ...prev,
                messages: prev.messages.map((m) =>
                  m.id === assistantMsg.id
                    ? { ...m, content: m.content + parsed.text }
                    : m,
                ),
              }));
            } else if (event === "error") {
              setState((prev) => ({
                ...prev,
                error: parsed.message ?? "Unknown error",
              }));
            }
          } catch {
            /* ignore malformed chunk */
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : String(err),
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        isStreaming: false,
        messages: prev.messages.map((m) =>
          m.id === assistantMsg.id ? { ...m, pending: false } : m,
        ),
      }));
      abortRef.current = null;
    }
  }, []);

  const stop = React.useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = React.useCallback(() => {
    abortRef.current?.abort();
    setState(initial);
  }, []);

  return {
    messages: state.messages,
    isStreaming: state.isStreaming,
    error: state.error,
    ask,
    stop,
    reset,
  };
}
