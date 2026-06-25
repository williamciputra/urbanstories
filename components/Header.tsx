"use client";

import { useEffect, useState } from "react";
import Search from "./Search";
import { site } from "../data/site";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-neutral-200 bg-[#FAF8F3]/95 backdrop-blur-md transition-all duration-300`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 transition-all duration-300 ${
          isScrolled ? "py-5" : "py-8"
        }`}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1
              className={`font-semibold tracking-[-0.05em] text-neutral-900 transition-all duration-300 ${
                isScrolled
                  ? "text-4xl md:text-5xl"
                  : "text-6xl md:text-7xl"
              }`}
            >
              {site.name}
            </h1>

            <p
              className={`overflow-hidden text-neutral-600 transition-all duration-300 ${
                isScrolled
                  ? "mt-0 max-h-0 opacity-0"
                  : "mt-4 max-h-20 text-lg opacity-100"
              }`}
            >
              {site.tagline}
            </p>
          </div>

          <Search compact={isScrolled} />
        </div>

        <nav
          className={`transition-all duration-300 ${
            isScrolled ? "mt-6" : "mt-12"
          }`}
        >
          <ul className="flex flex-wrap gap-8 text-sm uppercase tracking-[0.18em] text-neutral-700">
            {site.navigation.map((item) => (
              <li
                key={item}
                className="cursor-pointer transition hover:text-black"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}