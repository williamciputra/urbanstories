"use client";

import { useEffect } from "react";

export default function V3ChromeBehavior() {
  useEffect(() => {
    const trigger = document.querySelector<HTMLElement>(
      "[data-urbanstories-menu-toggle]",
    );
    const menu = document.getElementById("urbanstories-mobile-nav");

    const toggleMenu = (event: Event) => {
      event.preventDefault();
      if (!trigger || !menu) return;
      menu.hidden = !menu.hidden;
      trigger.setAttribute("aria-expanded", String(!menu.hidden));
    };

    if (trigger && menu && trigger.dataset.menuBound !== "true") {
      trigger.dataset.menuBound = "true";
      trigger.addEventListener("click", toggleMenu);
    }

    const controls = document.createElement("div");
    controls.dataset.urbanstoriesGlobalControls = "true";
    controls.className = "backtotop-wrap position-fixed bottom-0 end-0 z-99 m-2 vstack";
    controls.innerHTML = `
      <div class="darkmode-trigger cstack w-40px h-40px rounded-circle text-none bg-gray-100 dark:bg-gray-700 dark:text-white" data-darkmode-toggle>
        <label class="switch">
          <span class="sr-only">Dark mode toggle</span>
          <input type="checkbox" aria-label="Aktifkan dark mode">
          <span class="slider fs-5"></span>
        </label>
      </div>
      <a class="btn btn-sm bg-primary text-white w-40px h-40px rounded-circle" href="#top" data-urbanstories-back-to-top aria-label="Kembali ke atas">
        <i class="icon-2 unicon-chevron-up"></i>
      </a>
    `;

    const style = document.createElement("style");
    style.textContent = `
      [data-urbanstories-global-controls] {
        position: fixed;
        right: .5rem;
        bottom: .5rem;
        z-index: 9999;
      }
      [data-urbanstories-back-to-top] {
        display: none;
        align-items: center;
        justify-content: center;
      }
      [data-urbanstories-global-controls].uc-active [data-urbanstories-back-to-top] {
        display: flex;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(controls);

    const checkbox = controls.querySelector<HTMLInputElement>(
      "[data-darkmode-toggle] input",
    );
    const backToTop = controls.querySelector<HTMLAnchorElement>(
      "[data-urbanstories-back-to-top]",
    );

    const setDarkMode = (enabled: boolean) => {
      document.documentElement.classList.toggle("dark", enabled);
      document.body.classList.toggle("dark", enabled);
      if (checkbox) checkbox.checked = enabled;
      try {
        localStorage.setItem("darkMode", enabled ? "1" : "0");
      } catch {}
    };

    let savedMode: string | null = null;
    try {
      savedMode = localStorage.getItem("darkMode");
    } catch {}

    const darkModeEnabled = savedMode === "1";
    document.documentElement.classList.toggle("dark", darkModeEnabled);
    document.body.classList.toggle("dark", darkModeEnabled);
    if (checkbox) checkbox.checked = darkModeEnabled;

    const onThemeChange = () => setDarkMode(Boolean(checkbox?.checked));
    const onBackToTop = (event: Event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const onScroll = () => {
      controls.classList.toggle("uc-active", window.scrollY > 200);
    };

    checkbox?.addEventListener("change", onThemeChange);
    backToTop?.addEventListener("click", onBackToTop);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (trigger && menu && trigger.dataset.menuBound === "true") {
        trigger.removeEventListener("click", toggleMenu);
        delete trigger.dataset.menuBound;
      }
      checkbox?.removeEventListener("change", onThemeChange);
      backToTop?.removeEventListener("click", onBackToTop);
      window.removeEventListener("scroll", onScroll);
      controls.remove();
      style.remove();
    };
  }, []);

  return null;
}
