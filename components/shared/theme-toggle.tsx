"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground"
      suppressHydrationWarning
    >
      <Sun
        className="hidden dark:block"
        strokeWidth={1.5}
        aria-hidden
      />
      <Moon
        className="block dark:hidden"
        strokeWidth={1.5}
        aria-hidden
      />
    </Button>
  );
}
