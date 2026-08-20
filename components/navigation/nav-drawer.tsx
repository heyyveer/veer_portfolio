"use client";

import NextLink from "next/link";
import { Menu } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SECTION_META, CONTACT_ANCHOR } from "@/constants";
import { cn } from "@/lib/utils";

const DRAWER_ITEMS = SECTION_META.filter((s) => s.id !== "hero");

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const link: Variants = {
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Mobile menu (WIREFRAMES.md §13). Full-screen Sheet (Radix Dialog: focus
 * trap, Esc, focus restore). The Sheet provides the slide; Framer adds a
 * staggered entrance to the links on open. No-op under reduced motion.
 */
export function NavDrawer() {
  const reduce = useReducedMotion();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <Menu strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="md:hidden">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <motion.nav
          aria-label="Mobile"
          className="flex flex-1 flex-col gap-1 p-4"
          variants={list}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "show"}
        >
          {DRAWER_ITEMS.map((item) => (
            <motion.div key={item.id} variants={reduce ? undefined : link}>
              <SheetClose asChild>
                <NextLink
                  href={item.anchor}
                  className="flex items-center justify-between rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary"
                >
                  <span>{item.label}</span>
                </NextLink>
              </SheetClose>
            </motion.div>
          ))}
        </motion.nav>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border p-4">
          <ThemeToggle />
          <SheetClose asChild>
            <a href={CONTACT_ANCHOR} className={cn(buttonVariants({ size: "sm" }))}>
              Get in touch
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
