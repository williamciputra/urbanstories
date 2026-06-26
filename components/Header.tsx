"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import MobileHeader from "./MobileHeader";
import MobileDrawer from "./MobileDrawer";
import { site } from "../data/site";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-neutral-200 bg-[#FAF8F3]/95 transition-all duration-300"
      >
        <div
          className={`mx-auto max-w-7xl px-6 transition-all duration-300 ${isScrolled ? "py-5" : "py-8"
            }`}
        >
          <MobileHeader
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />

          <div className="hidden lg:flex lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <Link href="/" className="inline-block">
                <h1
                  className={`font-semibold tracking-[-0.05em] text-neutral-900 transition-all duration-300 hover:opacity-80 ${isScrolled
                      ? "text-4xl md:text-5xl"
                      : "text-6xl md:text-7xl"
                    }`}
                >
                  {site.name}
                </h1>
              </Link>

              <p
                className={`overflow-hidden text-neutral-600 transition-all duration-300 ${isScrolled
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
            className={`hidden lg:block transition-all duration-300 ${isScrolled ? "mt-6" : "mt-12"
              }`}
          >
            <ul className="flex flex-wrap gap-8 text-sm uppercase tracking-[0.18em] text-neutral-700">
              {site.navigation.map((item) => (
                <li key={item}>
                  <Link
                    href={`/category/${item.toLowerCase()}`}
                    className="transition hover:text-black"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}