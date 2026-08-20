"use client";

import * as React from "react";
import { NAV_ITEMS } from "@/constants";
import { useActiveSection } from "@/hooks";
import { NavLink } from "./nav-link";

/**
 * Desktop primary navigation (md+). A curated subset of sections; the full
 * list lives in the mobile drawer (WIREFRAMES.md §13). Active section comes
 * from IntersectionObserver; it simply stays inactive until the sections
 * exist in the DOM.
 */
export function NavBar() {
  const ids = React.useMemo(() => NAV_ITEMS.map((i) => i.id), []);
  const active = useActiveSection(ids);

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <NavLink href={item.href} label={item.label} active={active === item.id} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
