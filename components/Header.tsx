"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Search from "./Search";
import MobileHeader from "./MobileHeader";
import MobileDrawer from "./MobileDrawer";
import { site } from "../data/site";

interface HeaderProps {
  activeCategory?: string;
}

export default function Header({
  activeCategory,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

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
        className={`sticky top-0 z-50 border-b border-neutral-200 bg-[#FAF8F3] transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-5">

          <MobileHeader
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />

          <div className="hidden items-center justify-between lg:flex">

            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-[32px] font-semibold tracking-[-0.04em] text-neutral-900 transition hover:opacity-80">
                  {site.name}
                </h1>
              </Link>

              <p className="mt-1 text-sm text-neutral-600">
                {site.tagline}
              </p>
            </div>

            <nav>
              <ul className="flex items-center gap-8 text-[15px] font-medium">
                {site.navigation.map((item) => {
                  const href = `/${item.toLowerCase()}`;

                  const isActive =
                    pathname.startsWith(href) ||
                    activeCategory === item;

                  return (
                    <li key={item}>
                      <Link
                        href={href}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "font-semibold text-black"
                            : "text-neutral-700 hover:text-black"
                        }`}
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Search compact={false} />

          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}