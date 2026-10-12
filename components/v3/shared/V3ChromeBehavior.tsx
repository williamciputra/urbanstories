"use client";

import { useEffect } from "react";

export default function V3ChromeBehavior() {
  useEffect(() => {
    const trigger = document.querySelector<HTMLElement>(
      "[data-urbanstories-menu-toggle]",
    );
    const menu = document.getElementById("urbanstories-mobile-nav");

    if (!trigger || !menu || trigger.dataset.menuBound === "true") return;

    trigger.dataset.menuBound = "true";

    const toggleMenu = (event: Event) => {
      event.preventDefault();
      menu.hidden = !menu.hidden;
      trigger.setAttribute("aria-expanded", String(!menu.hidden));
    };

    trigger.addEventListener("click", toggleMenu);

    return () => {
      trigger.removeEventListener("click", toggleMenu);
      delete trigger.dataset.menuBound;
    };
  }, []);

  return null;
}
