"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "./use-chat";

/**
 * Lightweight rendering of assistant bubble content. Supports `**bold**`,
 * inline `code`, and bullet lines starting with `• ` / `- `. Full Markdown
 * (react-markdown) can drop in later without changing the bubble shape.
 */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-secondary px-1 py-0.5 font-mono text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function AssistantBody({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-2 text-sm leading-relaxed text-foreground">
      {lines.map((line, i) => {
        if (/^\s*[•\-]\s+/.test(line)) {
          return (
            <div key={i} className="flex gap-2">
              <span className="text-[hsl(var(--accent))]">›</span>
              <span>{renderInline(line.replace(/^\s*[•\-]\s+/, ""))}</span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border border-border text-foreground rounded-bl-md",
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : message.content ? (
          <AssistantBody content={message.content} />
        ) : (
          <div className="flex items-center gap-1.5 py-1">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        )}
        {!isUser && message.pending && message.content && (
          <span className="ml-1 inline-block h-3 w-[2px] translate-y-0.5 animate-pulse bg-[hsl(var(--accent))]" />
        )}
      </div>
    </div>
  );
}
